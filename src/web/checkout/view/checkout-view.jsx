import { useCallback, useState } from "react";
import Loader from "../../../components/loader";
import LoadingButton from "../../../components/loading-button";
import { useFetchCartItemQuery } from "../../../hooks/useCartItem";
import { useBookingMutation } from "../../../hooks/useBooking";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCheckCouponCodeMutation } from "../../../hooks/useCouponCode";

export default function CheckoutView() {
  const [bookingDate, setBookingDate] = useState();
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: cartItems, isLoading } = useFetchCartItemQuery();

  const onCheckSuccess = useCallback(
    (data) => {
      const discountPrice = +data.data.discountPrice;
      setDiscount(discountPrice);
      enqueueSnackbar("Discount successful", { variant: "success" });
    },
    [enqueueSnackbar]
  );

  const onCheckError = useCallback(
    (error) => {
      error;
      enqueueSnackbar(
        error?.response?.data?.message ?? "Something went wrong",
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: checkCouponCodeMutation } = useCheckCouponCodeMutation(
    onCheckSuccess,
    onCheckError
  );

  const onSuccess = useCallback(
    (data) => {
      if (paymentMode === "Online") {
        window.open(data.data.payment_url);
        return;
      }

      enqueueSnackbar("Service add successful", { variant: "success" });
      navigate("/dashboard/book-services");
    },
    [enqueueSnackbar, navigate, paymentMode]
  );

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

  const { mutate: addBooking, isLoading: booking } = useBookingMutation(
    onSuccess,
    onError
  );

  const handleBooking = useCallback(() => {
    const bookingItems = cartItems?.data?.cartItems?.map((item) => ({
      quantity: item.quantity,
      price: item.totalPrice,
      productId: item.product.id,
    }));
    addBooking({
      subTotal: cartItems.data.subTotal - discount,
      bookingDate,
      bookingItems,
      paymentMode,
    });
  }, [addBooking, cartItems, bookingDate, paymentMode, discount]);

  const applyCoupon = useCallback(() => {
    checkCouponCodeMutation(couponCode);
  }, [checkCouponCodeMutation, couponCode]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mt-4">
      <p className="fw-bold fs-2 text-center">Checkout</p>
      <div className="row">
        <div className="col-md-8">
          <h3>Summary</h3>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.data?.cartItems?.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product?.product?.productName}</td>
                  <td>{product.quantity}</td>
                  <td>Rs. {product.product.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row">
            <div className="col-md-8 bill mt-4 p-4">
              <p className="fw-bold">Payment Summary</p>
              <div className="d-flex justify-content-between">
                <div className="">
                  <p>Item Total</p>
                </div>
                <p>Rs. {cartItems.data.subTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-3">
                  <input
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    value={couponCode}
                    placeholder="Coupon code"
                    type="text"
                    name="couponCode"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div
                  onClick={applyCoupon}
                  style={{ cursor: "pointer" }}
                  className="bg-primary text-white p-2 rounded"
                >
                  Apply Coupon
                </div>
              </div>

              <div className="d-flex justify-content-between total">
                <div className="">
                  <p>Total Discount</p>
                </div>
                <p>- Rs. {discount}</p>
              </div>
              <div className="d-flex justify-content-between mt-3 ">
                <div className="">
                  <p>Grand Total</p>
                </div>
                <p>Rs. {cartItems.data.subTotal - discount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-4 p-4">
          <p className="fs-4 text-center">Book Your Date</p>
          <div
            htmlFor="bookingDate"
            className="d-flex direction justify-content-center"
          >
            <input
              onChange={(e) => setBookingDate(e.target.value)}
              value={bookingDate}
              type="date"
              name="bookingDate"
            />
          </div>
          <p className="fs-4 text-center mt-4">Payment Mode</p>
          <div className="d-flex direction justify-content-center ">
            <select
              onChange={(e) => setPaymentMode(e.target.value)}
              name="paymentMode"
              id=""
            >
              <option value="">Select One</option>
              <option value="Online">Khalti</option>
              <option value="Cash on Delivery">Cash on delivery</option>
            </select>
          </div>
          <div className="mt-4">
            <LoadingButton
              isLoading={booking}
              onClick={handleBooking}
              style="btn btn-primary w-100 mt-3"
            >
              Book Now
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
