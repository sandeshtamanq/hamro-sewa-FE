import { useCallback, useEffect, useState } from "react";
import LoadingButton from "../../../components/loading-button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  useAddCouponCodeMutation,
  useUpdateCouponCodeMutation,
} from "../../../hooks/useCouponCode";

export default function CouponAddEdit({ formMode, defaultValue }) {
  const [couponDetails, setCouponDetails] = useState({
    couponCode: "",
    discountPrice: "",
    validFor: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar(
      `Coupon code ${formMode === "Add" ? "add" : "update"} successful`,
      { variant: "success" }
    );
    navigate("/dashboard/coupon-codes");
  }, [enqueueSnackbar, navigate, formMode]);

  const onError = useCallback(
    (error) => {
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: addCoupon, isLoading } = useAddCouponCodeMutation(
    onSuccess,
    onError
  );

  const { mutate: updateCoupon, isLoading: updating } =
    useUpdateCouponCodeMutation(onSuccess, onError);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (formMode === "Add") {
        addCoupon(couponDetails);
      } else {
        updateCoupon(couponDetails, defaultValue.id);
      }
    },
    [formMode, addCoupon, couponDetails, updateCoupon, defaultValue]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCouponDetails((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    if (formMode === "Add") return;
    setCouponDetails(defaultValue);
  }, [formMode, defaultValue]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Coupon Code
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={couponDetails.couponCode}
          name="couponCode"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Discount Amount
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={couponDetails.discountPrice}
          name="discountPrice"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Valid For(days)
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={couponDetails.validFor}
          name="validFor"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <LoadingButton
        isLoading={isLoading || updating}
        type="submit"
        style="btn btn-primary w-100 mt-3"
      >
        {formMode === "Add" ? "Add Coupon" : "Update Coupon"}
      </LoadingButton>
    </form>
  );
}
