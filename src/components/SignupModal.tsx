import { useState, useEffect } from 'react';
import { X, Waves, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SignupModal({ isOpen, onClose, onSuccess }: SignupModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState({
    messageTypeFocus: '',
    referralIntent: '',
    useCaseTags: [] as string[],
    blockers: [] as string[],
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail('');
      setError(null);
      setSurveyData({
        messageTypeFocus: '',
        referralIntent: '',
        useCaseTags: [],
        blockers: [],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('waitlist_signups')
        .insert([{ email }]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist');
        } else {
          setError('Something went wrong. Please try again.');
        }
        return;
      }

      setStep(2);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (field: 'useCaseTags' | 'blockers', value: string) => {
    setSurveyData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((t) => t !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSurveySubmit = async () => {
    setIsSubmitting(true);

    try {
      await supabase
        .from('waitlist_signups')
        .update({
          message_type_focus: surveyData.messageTypeFocus || null,
          referral_intent: surveyData.referralIntent || null,
          use_case_tags: surveyData.useCaseTags,
          blockers: surveyData.blockers,
        })
        .eq('email', email);

      onSuccess();
      onClose();
    } catch {
      // Silently fail - they're already signed up
      onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-teal/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card rounded-2xl w-full max-w-md p-6 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-border-mist rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-body-gray" />
        </button>

        {step === 1 ? (
          <>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 text-sm text-body-gray mb-6">
              <span className="font-semibold text-teal-accent">①</span>
              <span>Email</span>
              <span className="text-border-mist">/</span>
              <span>② Survey</span>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-current-gradient flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-2xl font-bold text-center text-deep-teal mb-2">
              Claim Your Spot
            </h3>

            <p className="text-center text-body-gray mb-6">
              Join the Founding 500. Limited spots, open to everyone.
            </p>

            {/* Form */}
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-border-mist bg-white/80 text-deep-teal placeholder-body-gray focus:outline-none focus:border-teal-accent mb-4"
              />

              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-center disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Get My Founding Access'}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 text-sm text-body-gray mb-6">
              <span className="font-semibold text-emerald">
                <Check className="w-4 h-4 inline" /> Email
              </span>
              <span className="text-border-mist">/</span>
              <span className="font-semibold text-teal-accent">②</span>
              <span>Survey</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl font-bold text-center text-deep-teal mb-2">
              Quick Questions
            </h3>

            <p className="text-center text-body-gray mb-6">
              Help us shape p42ern.ai. Takes under 60 seconds.
            </p>

            <div className="space-y-6 max-h-80 overflow-y-auto scrollbar-hide pr-2">
              {/* Q1: Message Type Focus */}
              <div>
                <p className="text-sm font-medium text-deep-teal mb-2">
                  What kind of messages do you want help with most?
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Work', 'Personal', 'Both equally', 'Not sure yet'].map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setSurveyData((prev) => ({
                            ...prev,
                            messageTypeFocus: option,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-pill text-sm border transition-all ${
                          surveyData.messageTypeFocus === option
                            ? 'bg-current-gradient text-white border-transparent'
                            : 'border-body-gray/50 text-deep-teal bg-white/50 hover:border-teal-accent hover:bg-sage-mint/10'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Q2: Referral Intent */}
              <div>
                <p className="text-sm font-medium text-deep-teal mb-2">
                  Would you invite a colleague or friend to join with you?
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Yes', 'No', 'Maybe'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSurveyData((prev) => ({
                          ...prev,
                          referralIntent: option,
                        }))
                      }
                      className={`px-3 py-1.5 rounded-pill text-sm border transition-all ${
                        surveyData.referralIntent === option
                          ? 'bg-current-gradient text-white border-transparent'
                          : 'border-body-gray/50 text-deep-teal bg-white/50 hover:border-teal-accent hover:bg-sage-mint/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3: Use Case Tags (multi-select) */}
              <div>
                <p className="text-sm font-medium text-deep-teal mb-2">
                  Which message types matter most to you?
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Difficult feedback',
                    'Sales or pitch messages',
                    'Dating or personal messages',
                    'Team or leadership comms',
                    'Customer support replies',
                    'Other',
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag('useCaseTags', tag)}
                      className={`px-3 py-1.5 rounded-pill text-sm border transition-all ${
                        surveyData.useCaseTags.includes(tag)
                          ? 'bg-current-gradient text-white border-transparent'
                          : 'border-body-gray/50 text-deep-teal bg-white/50 hover:border-teal-accent hover:bg-sage-mint/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4: Blockers (multi-select) */}
              <div>
                <p className="text-sm font-medium text-deep-teal mb-2">
                  What's stopping you from communicating the way you want to right now?
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Don't know how it'll be received",
                    'Tone always comes out wrong',
                    'Takes too long to get right',
                    'Anxious about sending it',
                    'Other',
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag('blockers', tag)}
                      className={`px-3 py-1.5 rounded-pill text-sm border transition-all ${
                        surveyData.blockers.includes(tag)
                          ? 'bg-current-gradient text-white border-transparent'
                          : 'border-body-gray/50 text-deep-teal bg-white/50 hover:border-teal-accent hover:bg-sage-mint/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 btn-secondary py-3"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleSurveySubmit}
                disabled={isSubmitting}
                className="flex-1 btn-primary py-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
