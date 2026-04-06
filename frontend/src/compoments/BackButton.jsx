import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page, but DO show on auth page
  if (location.pathname === '/') {
    return null;
  }

  const handleGoBack = () => {
    // Extract 'from' query parameter if on auth page
    const params = new URLSearchParams(location.search);
    const fromParam = params.get('from');

    // If there's a 'from' query parameter (redirected from protected page), use that
    if (fromParam) {
      navigate(fromParam);
    }
    // If there's a 'from' state (fallback, for direct auth page visits), use that
    else if (location.state?.from) {
      navigate(location.state.from);
    }
    // Otherwise use browser back
    else if (window.history.length > 1) {
      navigate(-1); // Go back to previous page
    } else {
      navigate('/'); // Fallback to home if no history
    }
  };

  return (
    <button
      className="back-button"
      onClick={handleGoBack}
      title="Go back"
      aria-label="Go back to previous page"
    >
      <span className="back-arrow">←</span>
    </button>
  );
};

export default BackButton;