import { useState } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { BeyondDraft } from './components/BeyondDraft';
import { Benefits } from './components/Benefits';
import { Why500 } from './components/Why500';
import { FounderNote } from './components/FounderNote';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';

interface LandingPageProps {
  onSignupSuccess: () => void;
}

export function LandingPage({ onSignupSuccess }: LandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSignupSuccess = () => {
    onSignupSuccess();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <Hero onOpenModal={handleOpenModal} />
      <HowItWorks />
      <BeyondDraft />
      <Benefits />
      <Why500 />
      <FounderNote />
      <FinalCTA onOpenModal={handleOpenModal} />
      <Footer />

      <SignupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSignupSuccess}
      />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="glass-card rounded-xl px-6 py-4 shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-deep-teal">Welcome to the Founding 500!</p>
              <p className="text-sm text-body-gray">We'll be in touch soon.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
