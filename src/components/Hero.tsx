import { ChevronDown, Check, Sparkles, Zap, Lock } from 'lucide-react';
import { Navbar } from './Navbar';
import { SIGNUP_COUNT, TOTAL_SPOTS } from '../lib/dummyData';

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const progressPercentage = (SIGNUP_COUNT / TOTAL_SPOTS) * 100;

  return (
    <section className="min-h-screen bg-atmosphere-gradient relative overflow-hidden pt-24">
      <Navbar onOpenModal={onOpenModal} />

      {/* Decorative blur circles */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-teal/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sage-mint/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-16">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="glass-card inline-flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium text-deep-teal">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span>FOUNDING 200 PROGRAM</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-deep-teal leading-tight mb-6">
          Know How It Lands.
          <br />
          <span className="text-gradient-current">Before You Hit Send.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl text-body-gray text-center max-w-2xl mx-auto mb-8">
          Join the first 200 members shaping p42ern.ai. See how your message will be received, by whom, and why, before it ever leaves your draft.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <button onClick={onOpenModal} className="btn-primary text-lg px-8 py-4">
            Claim My Spot
          </button>
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-body-gray mb-8">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald" />
            <span>Free for Founding Members</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald" />
            <span>Early Access to All Engines</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald" />
            <span>Limited to 200 Members</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-current-gradient rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-center text-sm text-body-gray mt-2">
            {SIGNUP_COUNT} / {TOTAL_SPOTS} founders already joined
          </p>
        </div>

        {/* Scoring Preview Widget */}
        <div className="glass-card max-w-lg mx-auto rounded-2xl p-6 hover-lift">
          <div className="flex items-start gap-4">
            {/* Sample Message */}
            <div className="flex-1">
              <div className="text-xs text-body-gray mb-2 uppercase tracking-wide">Sample Message</div>
              <p className="text-deep-teal text-sm leading-relaxed">
                "I wanted to follow up on our discussion from last week. I think we're aligned on the key points, but I wanted to double-check before we move forward with the implementation."
              </p>
            </div>

            {/* Score Preview */}
            <div className="flex-shrink-0 text-right">
              <div className="text-xs text-body-gray mb-1 uppercase tracking-wide">Tone Score</div>
              <div className="text-3xl font-bold text-emerald">87%</div>
              <div className="text-xs text-body-gray">Professional</div>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border-mist">
            <div className="text-center">
              <Zap className="w-4 h-4 text-teal-accent mx-auto mb-1" />
              <div className="text-xs text-body-gray">Clarity</div>
              <div className="text-sm font-semibold text-deep-teal">High</div>
            </div>
            <div className="text-center">
              <Sparkles className="w-4 h-4 text-teal-accent mx-auto mb-1" />
              <div className="text-xs text-body-gray">Reaction</div>
              <div className="text-sm font-semibold text-deep-teal">Positive</div>
            </div>
            <div className="text-center">
              <Check className="w-4 h-4 text-teal-accent mx-auto mb-1" />
              <div className="text-xs text-body-gray">Confidence</div>
              <div className="text-sm font-semibold text-deep-teal">Send</div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="flex flex-col items-center mt-12 text-body-gray animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-2">Learn More</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
