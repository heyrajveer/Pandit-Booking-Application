import API from "./axios";

export const getPanditReviews = (panditId) =>
  API.get(`/review/pandit/${panditId}`);

export const getReviewEligibility = (panditId) =>
  API.get(`/review/eligibility/${panditId}`);

export const createReview = (data) =>
  API.post(`/review`, data);

export const updateReview = (id, data) =>
  API.patch(`/review/${id}`, data);

export const getBookingReview = (bookingId) =>
  API.get(`/review/booking/${bookingId}`);

export const reportReview = (id) =>
  API.post(`/review/${id}/report`);
