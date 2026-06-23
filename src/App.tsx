import { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './LandingPage';
import { Admin } from './Admin';
import { SIGNUP_COUNT } from './lib/dummyData';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'admin'>('landing');
  const [signupCount, setSignupCount] = useState(SIGNUP_COUNT);

  useEffect(() => {
    // Check URL path
    if (window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }

    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      setCurrentPage(window.location.pathname === '/admin' ? 'admin' : 'landing');
    };
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToAdmin = useCallback(() => {
    window.history.pushState({}, '', '/admin');
    setCurrentPage('admin');
  }, []);

  const handleNavigateToLanding = useCallback(() => {
    window.history.pushState({}, '', '/');
    setCurrentPage('landing');
  }, []);

  const handleSignupSuccess = useCallback(() => {
    setSignupCount((prev) => prev + 1);
  }, []);

  if (currentPage === 'admin') {
    return <Admin />;
  }

  return <LandingPage onSignupSuccess={handleSignupSuccess} />;
}

export default App;
