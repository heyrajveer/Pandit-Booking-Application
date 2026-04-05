import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
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