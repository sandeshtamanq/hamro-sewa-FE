import api from "./api";

export const createReview = (reviewDetail) => {
  return api.post("reviews", reviewDetail);
};

export const fetchReviews = (userType = "") => {
  return api.get(`reviews/?userType=${userType}`);
};
