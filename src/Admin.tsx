import { useState, useEffect } from 'react';
import { RefreshCw, Download, LogOut, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Wordmark } from './components/Wordmark';
import { dummySignups } from './lib/dummyData';
import { WaitlistSignup } from './lib/supabase';
import { supabase } from './lib/supabase';

// Simple password for demo - in production this would be proper auth
const ADMIN_PASSWORD = 'founding500admin';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'created_at' | 'email'>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadSignups();
    }
  }, [isAuthenticated]);

  const loadSignups = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('waitlist_signups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setSignups(data);
      } else {
        // Use dummy data if no real data
        setSignups(dummySignups);
      }
    } catch {
      // Fallback to dummy data
      setSignups(dummySignups);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid password');
    }
  };

  const handleExport = () => {
    const csv = [
      'Email,Referral Intent,Focus Area,Use Cases,Blockers,Joined',
      ...filteredSignups.map((s) =>
        [
          s.email,
          s.referral_intent || '',
          s.message_type_focus || '',
          `"${(s.use_case_tags || []).join(', ')}"`,
          `"${(s.blockers || []).join(', ')}"`,
          new Date(s.created_at).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'p42ern-waitlist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSort = (field: 'created_at' | 'email') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredSignups = signups
    .filter(
      (s) =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.message_type_focus || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.use_case_tags || []).some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else {
        comparison =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Stats calculations
  const totalSignups = signups.length;
  const spotsLeft = Math.max(0, 500 - totalSignups);
  const surveyCompleted = signups.filter((s) => s.referral_intent).length;
  const surveyRate = totalSignups > 0
    ? Math.round((surveyCompleted / totalSignups) * 100)
    : 0;
  const referralYes = signups.filter((s) => s.referral_intent === 'Yes').length;
  const referralYesRate = totalSignups > 0
    ? Math.round((referralYes / totalSignups) * 100)
    : 0;

  // Find top use case
  const useCaseCounts: Record<string, number> = {};
  signups.forEach((s) => {
    (s.use_case_tags || []).forEach((tag) => {
      useCaseCounts[tag] = (useCaseCounts[tag] || 0) + 1;
    });
  });
  const topUseCase =
    Object.entries(useCaseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-atmosphere-gradient flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 w-full max-w-md text-center">
          <Wordmark size="lg" className="block mb-2" />
          <span className="text-sm text-emerald font-medium">Admin</span>
          <h1 className="text-2xl font-bold text-deep-teal mt-4 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-body-gray mb-6">
            Enter your password to continue
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-border-mist bg-white/80 text-deep-teal placeholder-body-gray focus:outline-none focus:border-teal-accent mb-4"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="sticky top-0 bg-teal-accent z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
<Wordmark size="md" />
              <span className="text-sm text-off-white font-medium border border-teal-accent/30 px-3 py-1 rounded-pill">
                Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadSignups}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-pill text-sm text-off-white hover:bg-teal-accent/10 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-pill text-sm text-off-white hover:bg-teal-accent/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-pill text-sm text-off-white hover:bg-teal-accent/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="text-sm text-body-gray mb-1">Total Signups</div>
            <div className="text-3xl font-bold text-deep-teal">{totalSignups}</div>
            <div className="text-sm text-teal-accent">{spotsLeft} spots left</div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="text-sm text-body-gray mb-1">Survey Completed</div>
            <div className="text-3xl font-bold text-deep-teal">{surveyRate}%</div>
            <div className="text-sm text-body-gray">{surveyCompleted} of {totalSignups}</div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="text-sm text-body-gray mb-1">Referral Interest: Yes</div>
            <div className="text-3xl font-bold text-emerald">{referralYes}</div>
            <div className="text-sm text-body-gray">{referralYesRate}% of respondents</div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="text-sm text-body-gray mb-1">Top Use-Case Focus</div>
            <div className="text-xl font-bold text-deep-teal">{topUseCase}</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-body-gray" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email, focus, or use cases..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-mist bg-white text-deep-teal placeholder-body-gray focus:outline-none focus:border-teal-accent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="glass-card-fallback rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-border-mist/50">
                <tr>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold text-deep-teal cursor-pointer hover:bg-border-mist transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      Email
                      {sortField === 'email' &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-deep-teal">
                    Referral
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-deep-teal">
                    Focus Area
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-deep-teal">
                    Use-Case Tags
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-deep-teal">
                    Blockers
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold text-deep-teal cursor-pointer hover:bg-border-mist transition-colors whitespace-nowrap"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-2">
                      Joined
                      {sortField === 'created_at' &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSignups.map((signup) => (
                  <tr
                    key={signup.id}
                    className="border-t border-border-mist hover:bg-sky-teal/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-deep-teal">
                      {signup.email}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-pill text-xs font-medium ${
                          signup.referral_intent === 'Yes'
                            ? 'bg-emerald/10 text-emerald'
                            : signup.referral_intent === 'Maybe'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-border-mist text-body-gray'
                        }`}
                      >
                        {signup.referral_intent || '-'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-body-gray">
                      {(signup as any).message_type_focus || (
                        <span className="text-border-mist">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(signup.use_case_tags || []).slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-sage-mint/30 text-teal-accent"
                          >
                            {tag}
                          </span>
                        ))}
                        {(signup.use_case_tags || []).length > 2 && (
                          <span className="text-xs text-body-gray">
                            +{(signup.use_case_tags || []).length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(signup.blockers || []).slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-sky-teal/20 text-deep-teal truncate max-w-32"
                            title={tag}
                          >
                            {tag.length > 20 ? tag.slice(0, 17) + '...' : tag}
                          </span>
                        ))}
                        {(signup.blockers || []).length > 2 && (
                          <span className="text-xs text-body-gray">
                            +{(signup.blockers || []).length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-body-gray whitespace-nowrap">
                      {new Date(signup.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-body-gray">
          {filteredSignups.length} of {signups.length} signups
        </div>
      </main>
    </div>
  );
}
