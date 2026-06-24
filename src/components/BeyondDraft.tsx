import { Compass, GitBranch, Waves } from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Audience-Aware Scoring',
    description: 'Every message is scored against who\'s actually reading it, not a generic tone checker.',
  },
  {
    icon: GitBranch,
    title: 'Tone Variants On Demand',
    description: 'See two or three rewrites pitched at different outcomes, side by side.',
  },
  {
    icon: Waves,
    title: 'Multi-Day Outcome Simulation',
    description: 'Preview how a sequence of messages is likely to play out, not just the next reply.',
  },
];

export function BeyondDraft() {
  return (
    <section className="py-20 sm:py-28 bg-atmosphere-gradient relative overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-sky-teal/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="glass-card pill-badge text-deep-teal">
            BEYOND THE DRAFT
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-deep-teal mb-4">
          Communication, Without the Guesswork
        </h2>

        <p className="text-lg text-body-gray text-center max-w-2xl mx-auto mb-12">
          p42ern.ai doesn't just proofread. It predicts how a message lands and helps you steer the outcome you actually want.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sage-mint/30 mb-4">
                <feature.icon className="w-6 h-6 text-teal-accent" />
              </div>
              <h3 className="text-lg font-semibold text-deep-teal mb-2">
                {feature.title}
              </h3>
              <p className="text-body-gray">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Caption */}
        <p className="text-center text-body-gray mb-4">
          Coming to p42ern.ai in the Founding 200 era.
        </p>

        {/* NOTE: This claim is pending legal/marketing review before public launch */}
        <p className="text-center text-sm text-body-gray/70 italic max-w-xl mx-auto">
          Built on a growing benchmark corpus of real communication outcomes
        </p>
      </div>
    </section>
  );
}
