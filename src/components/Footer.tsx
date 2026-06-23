import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="py-8 bg-off-white border-t border-border-mist">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Wordmark size="sm" />

          <p className="text-sm text-body-gray">
            &copy; 2026 p42ern.ai. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-body-gray">
            <a href="#" className="hover:text-deep-teal transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-deep-teal transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
