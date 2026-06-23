import { Wordmark } from './Wordmark';
import { SIGNUP_COUNT, TOTAL_SPOTS } from '../lib/dummyData';

interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-off-white/80 backdrop-blur-sm border-b border-border-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Wordmark size="lg" />
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-pill bg-sky-teal/20 text-deep-teal text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span>Founding 500</span>
              <span className="text-body-gray">·</span>
              <span>{SIGNUP_COUNT} joined</span>
            </div>

            <button onClick={onOpenModal} className="btn-primary text-sm py-2.5">
              Join the Founding 500
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
