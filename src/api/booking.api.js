import api from "./api";

export const createBooking = (booking) => {
  return api.post("bookings", booking);
};

export const fetchBookings = (userType = "") => {
  return api.get(`bookings/?userType=${userType}`);
};

export const updateBooking = (booking) => {
  return api.patch(`bookings/${booking.id}`, booking);
};

export const updateBookingStatus = (booking) => {
  return api.patch(`bookings/status/${booking.id}`, booking);
};

export const deleteBooking = (id) => {
  return api.delete(`bookings/${id}`);
};

export const fetchAssignedBooking = () => {
  return api.get("bookings/assigned");
};
