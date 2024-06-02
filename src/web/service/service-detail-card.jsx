import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useAddCartItemMutation } from "../../hooks/useCartItem";
import { useQueryClient } from "react-query";
import ReviewModal from "../../components/rating-modal";
import Iconify from "../../components/iconify";

export default function ServiceDetailCard({ product, cartItems }) {
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { user, isLoggedIn } = useAuthContext();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries("cart-item");
  }, [queryClient]);

  const onError = useCallback(
    (error) => {
      error;
      enqueueSnackbar(
        error?.response?.data?.message ?? "Something went wrong",
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: addToCart } = useAddCartItemMutation(onSuccess, onError);

  const handleAddToCart = useCallback(
    (quantity) => {
      addToCart({
        productId: product.id,
        quantity,
      });
    },
    [addToCart, product]
  );

  useEffect(() => {
    if (!isLoggedIn) {
      setAmount(0);
      return;
    }
    const quantity = cartItems?.data?.cartItems?.find(
      (cartItem) => cartItem.productId === product.id
    )?.quantity;
    setAmount(quantity ?? 0);
  }, [cartItems, product.id, isLoggedIn]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const onDelete = useCallback(() => {}, []);

  return (
    <>
      <div className="">
        <div className="mt-3">
          <div className="d-flex mb-1 justify-content-between">
            <div>
              <p className="fw-bold fs-5">{product.productName}</p>
              <div className="d-flex align-items-center">
                <i className="ph ph-star"></i>
                <p className="d-flex align-items-center">
                  <Iconify
                    marginRight="5px"
                    padding="0"
                    icon="fluent-emoji-flat:star"
                  />
                  <div>
                    {product.rating ?? 0}({product.bookings} Bookings)
                  </div>
                </p>
              </div>
              <p className="text-danger fw-bold">
                Starts at Rs.{product.productPrice}
              </p>
              <p className=""> {product.productDescription}</p>
            </div>
            <img
              className="d-block mb-3"
              src={product.productImageUrl}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="d-flex justify-content-between">
            <div
              style={{ cursor: "pointer" }}
              onClick={handleShow}
              className="ratebutton mb-3"
              role="link"
            >
              Rate
            </div>
            <div style={{ width: "140px" }}>
              <div
                className="d-flex align-items-center  justify-content-center"
                style={{ width: "100px" }}
              >
                <div
                  className="mr-4 d-flex align-items-center justify-content-between"
                  style={{ marginRight: "10px" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/login");
                        enqueueSnackbar("Please login first", {
                          variant: "error",
                        });
                        return;
                      }
                      if (amount <= 0) {
                        enqueueSnackbar("Cannot be less than 0", {
                          variant: "error",
                        });
                        return;
                      }
                      setAmount((preVal) => preVal - 1);
                      handleAddToCart(amount - 1);
                    }}
                  >
                    -
                  </div>
                  <div
                    className="border border-secondary rounded"
                    style={{ margin: "0 10px", padding: "1px 10px" }}
                  >
                    {amount}
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/login");
                        enqueueSnackbar("Please login first", {
                          variant: "error",
                        });
                        return;
                      }
                      if (amount >= 3) {
                        enqueueSnackbar("Cannot add more", {
                          variant: "error",
                        });
                        return;
                      }
                      if (user.role === "Admin") {
                        enqueueSnackbar("Forbidden resource", {
                          variant: "error",
                        });
                        return;
                      }

                      setAmount((preVal) => preVal + 1);
                      handleAddToCart(amount + 1);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        productId={product.id}
        handleClose={handleClose}
        showModal={showModal}
        onDelete={onDelete}
      />
    </>
  );
}
