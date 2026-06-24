import { Badge, Infinity, Key, Star } from 'lucide-react';

const benefits = [
  {
    icon: Badge,
    title: 'Permanent Founding Badge',
    description: 'Founding Member status, visible on your profile, forever.',
  },
  {
    icon: Infinity,
    title: 'Unlimited Analyses, For Life',
    description: 'Standard members get a monthly cap. Founding members don\'t.',
  },
  {
    icon: Key,
    title: 'Early Access to Every Engine',
    description: 'First access to new scoring engines and the Simulator as they ship.',
  },
  {
    icon: Star,
    title: 'Direct Product Input',
    description: 'Founding members get a direct line to shape the roadmap.',
  },
];

export function Benefits() {
  return (
    <section className="py-20 sm:py-28 bg-off-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="pill-badge bg-border-mist text-deep-teal">
            WHY JOIN NOW
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-deep-teal mb-4">
          Founding Member Benefits
        </h2>

        <p className="text-lg text-body-gray text-center max-w-2xl mx-auto mb-12">
          Be one of the first 200 voices shaping p42ern.ai. Get real access, real input, and never pay for what comes later.
        </p>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10 mb-4">
                <benefit.icon className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-lg font-semibold text-deep-teal mb-2">
                {benefit.title}
              </h3>
              <p className="text-body-gray">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
