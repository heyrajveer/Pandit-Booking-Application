/**
 * Date utility helper for MERN booking application
 * Handles local timezone date comparisons without UTC conversion issues
 */

/**
 * Get today's date in YYYY-MM-DD format using local timezone
 * @returns {string} Today's date in YYYY-MM-DD format
 * 
 * WHY THIS IS NEEDED:
 * new Date().toISOString() converts to UTC timezone, which can cause date mismatch
 * Example: If it's 11 PM on May 6 in India (UTC+5:30), toISOString() gives May 6 UTC
 * But if it's 1 AM on May 7 UTC, comparison fails even though it's still May 6 locally
 * 
 * SOLUTION: Use local timezone methods instead of UTC
 */
export const getTodayLocalDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if a booking can be marked as completed
 * Rules: Status must be "confirmed" AND booking date must be today or past
 * @param {string} bookingDate - Booking date in YYYY-MM-DD format
 * @param {string} status - Booking status (pending, confirmed, completed, cancelled)
 * @returns {object} { canMark: boolean, reason: string, debug: object }
 */
export const canMarkBookingCompleted = (bookingDate, status) => {
  const today = getTodayLocalDate();
  
  // Debug information for console logging
  const debug = {
    bookingDate,
    today,
    status,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  // Check if status is confirmed
  if (status !== 'confirmed') {
    return {
      canMark: false,
      reason: `Cannot mark ${status} booking as completed. Only 'confirmed' bookings can be completed.`,
      debug
    };
  }

  // Check if booking date is today or in the past
  if (bookingDate > today) {
    return {
      canMark: false,
      reason: `Booking is scheduled for future date (${bookingDate}). Can only mark completed on or after booking date.`,
      debug
    };
  }

  return {
    canMark: true,
    reason: 'Ready to mark as completed',
    debug
  };
};

/**
 * Format date for display with timezone info
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatBookingDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Check if booking date has passed
 * @param {string} bookingDate - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isBookingDatePassed = (bookingDate) => {
  const today = getTodayLocalDate();
  return bookingDate < today;
};

/**
 * Get days remaining until booking
 * @param {string} bookingDate - Date in YYYY-MM-DD format
 * @returns {number} Days remaining (negative if past date)
 */
export const getDaysUntilBooking = (bookingDate) => {
  const today = getTodayLocalDate();
  const bookingDateObj = new Date(bookingDate);
  const todayDateObj = new Date(today);
  
  const diffTime = bookingDateObj - todayDateObj;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
