import { SIGNUP_COUNT, TOTAL_SPOTS } from '../lib/dummyData';

export function Why500() {
  const progressPercentage = (SIGNUP_COUNT / TOTAL_SPOTS) * 100;

  return (
    <section className="py-20 sm:py-28 bg-deep-teal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="pill-badge bg-teal-accent/20 text-sky-teal">
            WHY ONLY 500
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
          Built With Our First Community
        </h2>

        <p className="text-lg text-sage-mint/80 text-center max-w-2xl mx-auto mb-12">
          We're intentionally capping this at 500 members so feedback stays close and personal, and the benchmark corpus grows on real, considered use, not noise. Your input shapes what we build next.
        </p>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-teal-accent/10 rounded-2xl p-6 border border-teal-accent/20">
            <div className="text-5xl font-bold text-emerald mb-3">500</div>
            <div className="text-sm font-semibold text-white mb-1">Total Spots</div>
            <div className="text-sm text-white/65">No exceptions</div>
          </div>

          <div className="bg-teal-accent/10 rounded-2xl p-6 border border-teal-accent/20">
            <div className="text-5xl font-bold text-sky-teal mb-3">0 to 1</div>
            <div className="text-sm font-semibold text-white mb-1">Early Access Status</div>
            <div className="text-sm text-white/65">Before public launch</div>
          </div>

          <div className="bg-teal-accent/10 rounded-2xl p-6 border border-teal-accent/20">
            <div className="text-5xl font-bold text-emerald mb-3">Direct</div>
            <div className="text-sm font-semibold text-white mb-1">Product Input</div>
            <div className="text-sm text-white/65">Your voice, our roadmap</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-current-gradient rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-center text-sm text-sage-mint/60 mt-2">
            {SIGNUP_COUNT} members already secured their spot
          </p>
        </div>
      </div>
    </section>
  );
}
