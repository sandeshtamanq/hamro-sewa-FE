import { useMutation, useQuery } from "react-query";
import { createReview, fetchReviews } from "../api/review.api";

export const useAddReviewMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: createReview, onError, onSuccess });
};

export const useFetchBookingQuery = (userType) => {
  return useQuery("reviews", () => fetchReviews(userType), {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
