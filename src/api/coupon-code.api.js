import api from "./api";

export const checkCode = (couponCode) => {
  return api.post(
    `coupon-codes/check`,
    { couponCode },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const addCoupon = (couponCodeDetails) => {
  return api.post(`coupon-codes`, couponCodeDetails, {
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchCoupons = () => {
  return api.get("coupon-codes");
};

export const updateCouponCode = (couponCodeDetails) => {
  return api.patch(`coupon-codes/${couponCodeDetails.id}`, couponCodeDetails);
};

export function getCouponCodeDetail(id) {
  return api.get(`coupon-codes/${id}`);
}

export const deleteCouponCode = (id) => {
  return api.delete(`coupon-codes/${id}`);
};
