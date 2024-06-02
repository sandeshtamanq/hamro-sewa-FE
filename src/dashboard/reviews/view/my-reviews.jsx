import { useCallback, useState } from "react";
import Iconify from "../../../components/iconify";
import Loader from "../../../components/loader";
import ReviewModal from "../../../components/rating-modal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFetchBookingQuery } from "../../../hooks/useReview";

export default function MyReviewsView() {
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuthContext();

  const { data: reviews, isLoading } = useFetchBookingQuery(user.role);

  const handleClose = () => {
    setShowModal(false);
  };

  // const handleShow = () => {
  //   setShowModal(true);
  // };

  const onDelete = useCallback(() => {}, []);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="mt-4 shadow rounded p-4">
        <p className="fw-bold fs-3 p-2">My Reviews</p>
        {reviews.data.map((review) => (
          <>
            <div key={review.id} className="boxx p-4">
              <div className="greyshawdow p-2 container-fluid">
                <p className="fw-bold ">{review.product.productName}</p>
                <img
                  className=""
                  src={review.product.productImageUrl}
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div className="mt-3 d-flex justify-content-between ">
                <div className="d-flex justify-content-start align-items-center">
                  {[1, 2, 3, 4, 5].map((item) =>
                    item > review.rating ? (
                      <div key={item}>
                        <Iconify icon="iconoir:star" />
                      </div>
                    ) : (
                      <div key={item}>
                        <Iconify icon="fluent-emoji-flat:star" />
                      </div>
                    )
                  )}
                </div>
                {/* <button
                  onClick={handleShow}
                  type="submit"
                  className="btn edit text-white"
                >
                  Edit
                </button> */}
              </div>
              <p>{review.review}</p>
            </div>
            <ReviewModal
              productId={review?.product?.id}
              handleClose={handleClose}
              showModal={showModal}
              onDelete={onDelete}
            />
          </>
        ))}
      </div>
    </>
  );
}
