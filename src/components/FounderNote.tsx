import { Quote } from 'lucide-react';

export function FounderNote() {
  return (
    <section className="py-20 sm:py-28 bg-atmosphere-gradient relative overflow-hidden">
      {/* Decorative blur circle */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-sage-mint/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8 border-l-4 border-emerald">
          {/* Avatar and Header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar Placeholder */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald/20 flex items-center justify-center">
              <span className="text-lg font-semibold text-emerald">ZR</span>
            </div>

            <div className="flex-1">
              <div className="text-emerald mb-2">
                <Quote className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-deep-teal">
                A Note From the Founder
              </h3>
            </div>
          </div>

          {/* Body Copy - exact text as specified */}
          <div className="text-body-gray leading-relaxed space-y-4">
            <p>
              I've watched too many good messages get misread, not because the idea was wrong, but because the tone landed somewhere nobody intended. A piece of feedback came across as cold. A check-in came across as pressure. By the time you find out, it's already sent.
            </p>

            <p>
              So I built p42ern.ai around one idea: you should know how something will land before it leaves your hands, not after. Not a grammar check, a landing check.
            </p>

            <p>
              I'm starting with 500 people, on purpose. Not because we can't scale faster, but because I want the first 500 people using this to actually shape what "landing well" means across very different kinds of messages and audiences. If that's you, you're not just trying it early. You're the reason it gets the rest of it right.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border-mist mt-6 pt-4">
            <p className="font-semibold text-deep-teal">Zoe Roytenberg</p>
            <p className="text-sm text-body-gray">Founder, p42ern.ai</p>
          </div>
        </div>
      </div>
    </section>
  );
}
