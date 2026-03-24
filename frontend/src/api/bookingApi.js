import API from "./axios";

// create booking
export const createBooking = (data) =>
  API.post("/booking", data);

// user bookings
export const getMyBookings = () =>
  API.get("/booking/my");

// pandit bookings
export const getPanditBookings = () =>
  API.get("/booking/pandit");