import { useMutation, useQuery } from "react-query";
import {
  addCoupon,
  checkCode,
  deleteCouponCode,
  fetchCoupons,
  getCouponCodeDetail,
  updateCouponCode,
} from "../api/coupon-code.api";

export const useCheckCouponCodeMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: checkCode, onError, onSuccess });
};

export const useFetchCouponCodeQuery = () => {
  return useQuery("coupon-codes", fetchCoupons, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useAddCouponCodeMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: addCoupon, onError, onSuccess });
};

export const useGetCouponCodeDetailQuery = (id) => {
  return useQuery(["coupon-codes", id], () => getCouponCodeDetail(id), {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useUpdateCouponCodeMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: updateCouponCode, onError, onSuccess });
};

export const useDeleteCouponCodeMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: deleteCouponCode, onError, onSuccess });
};
