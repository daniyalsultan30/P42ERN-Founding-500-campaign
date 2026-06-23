import { FileText, Compass, Waves } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'You Write',
    description: 'Paste or write the message you\'re about to send: an email, a text, a tough piece of feedback.',
  },
  {
    icon: Compass,
    number: '02',
    title: 'We Read the Room',
    description: 'Tell us who\'s receiving it and what outcome you want. We score tone, clarity, and likely reaction.',
  },
  {
    icon: Waves,
    number: '03',
    title: 'You Send With Confidence',
    description: 'Refine with suggested variants, or run the Simulator to see how it plays out over the next few days.',
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-off-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="pill-badge bg-border-mist text-deep-teal">
            HOW IT WORKS
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-deep-teal mb-4">
          One Message. Six Signals. No Guessing.
        </h2>

        <p className="text-lg text-body-gray text-center max-w-2xl mx-auto mb-16">
          p42ern.ai reads a draft the way your audience will, then shows you what to change before it's too late to take back.
        </p>

        {/* Steps with Connecting Line */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-border-mist" />
          <div
            className="hidden lg:block absolute top-16 left-1/6 h-0.5 bg-current-gradient transition-all duration-1000"
            style={{ width: isVisible ? '66%' : '0%' }}
          />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`glass-card rounded-2xl p-6 hover-lift ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sage-mint/30 mb-4">
                  <step.icon className="w-6 h-6 text-teal-accent" />
                </div>

                {/* Mobile Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -bottom-8 w-0.5 h-8 bg-border-mist transform -translate-x-1/2" />
                )}

                {/* Number & Title */}
                <div className="text-sm font-semibold text-teal-accent mb-2">
                  {step.number} · {step.title}
                </div>

                {/* Description */}
                <p className="text-body-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {/* NOTE: This 68% stat is a placeholder - needs real citation or removal before public launch */}
          <div className="stat-dark-card">
            <div className="text-5xl font-bold text-sky-teal mb-3">68%</div>
            <p className="text-sm text-white/80 leading-relaxed">
              of people say they've sent a message they later regretted the tone of
            </p>
          </div>

          <div className="stat-dark-card">
            <div className="text-5xl font-bold text-emerald mb-3">500</div>
            <p className="text-sm text-white/80 leading-relaxed">
              founding members, open enrollment
            </p>
          </div>

          <div className="stat-dark-card">
            <div className="text-5xl font-bold text-emerald mb-3">6</div>
            <p className="text-sm text-white/80 leading-relaxed">
              scoring dimensions analyzed per message
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
