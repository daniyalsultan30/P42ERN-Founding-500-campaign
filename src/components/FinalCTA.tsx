import { CreditCard, XCircle, Lock } from 'lucide-react';

interface FinalCTAProps {
  onOpenModal: () => void;
}

export function FinalCTA({ onOpenModal }: FinalCTAProps) {
  return (
    <section className="py-20 sm:py-24 bg-off-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-deep-teal mb-4">
          Say What You Mean.
          <br />
          <span className="text-gradient-current">Land How You Intend.</span>
        </h2>

        {/* Subhead */}
        <p className="text-lg text-body-gray mb-8">
          Join the Founding 500 and help shape how p42ern.ai understands communication.
        </p>

        {/* CTA Button */}
        <button onClick={onOpenModal} className="btn-primary text-lg px-8 py-4 mb-8">
          Create My Profile
        </button>

        {/* Trust Row */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-body-gray">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-body-gray" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-body-gray" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-body-gray" />
            <span>Private by default</span>
          </div>
        </div>
      </div>
    </section>
  );
}
