import API from "./axios";

// ✅ create booking
export const createBooking = (data) =>
  API.post("/booking/create", data);

// ✅ user bookings
export const getMyBookings = () =>
  API.get("/booking/my-bookings");

// ✅ pandit booking requests
export const panditBookingRequests = () =>
  API.get("/booking/pandit-requests");

// ✅ update booking status (accept/reject)
export const updateBookingStatus = (id, status) =>
  API.patch(`/booking/${id}/status`, { status });

// ✅ cancel booking (user side)
export const cancelBookingApi = (id) =>
  API.patch(`/booking/${id}/cancel`, { status: "cancelled" });