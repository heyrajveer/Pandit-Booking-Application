import API from "./axios";

// create booking
export const createBooking = (data) =>
  API.post("/booking/create", data);

// user/pandit bookings
export const getMyBookings =()=>
  API.get("/booking/my-bookings");
// user/pandit bookings
export const panditBookingRequests =()=>
  API.get("/booking/my-bookings");

