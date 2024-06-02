import { useParams } from "react-router-dom";
import { useFetchCategoryDetailQuery } from "../../../hooks/useCategory";
import Loader from "../../../components/loader";
import Iconify from "../../../components/iconify";
import ServiceDetailCard from "../service-detail-card";
import CartDetails from "../cart-detail";
import { useFetchCartItemQuery } from "../../../hooks/useCartItem";

export default function ServiceDetailView() {
  const { id } = useParams();
  id;
  const { data: category, isLoading } = useFetchCategoryDetailQuery(id);
  const { data: cartItems } = useFetchCartItemQuery();

  if (isLoading) return <Loader />;

  return (
    <main>
      <div className="container-fluid">
        <div className="row mt-4 d-flex justify-content-between">
          <div className="col-md-3">
            <p className="mt-4 fw-bold fs-2">{category.data.categoryName}</p>
            <div className="d-flex align-items-center">
              <i className="ph ph-star"></i>
              <p className="fs-4 d-flex mb-0">
                <Iconify
                  marginRight="5px"
                  padding="0"
                  icon="fluent-emoji-flat:star"
                />{" "}
                {category?.data?.rating}({category.data.bookings} Bookings)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-8 col-md-12">
            <div className="bg-white shadow rounded mt-3 px-4 py-2">
              <p className="fw-bold fs-3 mt-3">Services</p>

              {category?.data?.products.map((product, index) => (
                <>
                  <ServiceDetailCard
                    cartItems={cartItems}
                    key={index}
                    product={product}
                  />
                  {category?.data?.products.length > 1 && <hr />}
                </>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mt-3 cartcolumn">
            <CartDetails cartItems={cartItems} />

            <div className="row bg-white shadow rounded mt-4">
              <div className="col-12 d-flex align-items-center cartdown">
                <div className="">
                  <Iconify icon="bitcoin-icons:verify-outline" width={40} />
                </div>
                <div>
                  <p className="fw-bold m-0">Verified Professionals</p>
                </div>
              </div>
              <div className="col-12 d-flex align-items-center cartdown">
                <div className="">
                  <Iconify icon="bitcoin-icons:verify-outline" width={40} />
                </div>
                <div>
                  <p className="fw-bold m-0">Safe Chemicals</p>
                </div>
              </div>
              <div className="col-12 d-flex align-items-center cartdown">
                <div className="">
                  <Iconify icon="bitcoin-icons:verify-outline" width={40} />
                </div>
                <div>
                  <p className="fw-bold m-0">A Flawless Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow rounded mt-4">
          <div
            className="col-12 p-3 scrollbar"
            style={{ height: "400px", overflow: "auto" }}
          >
            <p className="fw-bold fs-2 m-0">Reviews</p>
            {category?.data?.products.map((product, index) => (
              <div key={index}>
                <div>{product.productName}:</div>
                <div style={{ marginLeft: "20px" }}>
                  {product.reviews.map((review) => (
                    <div className="d-flex align-items-center" key={review.id}>
                      ({" "}
                      <Iconify
                        marginRight="5px"
                        padding="0"
                        icon="fluent-emoji-flat:star"
                      />
                      <div>{review.rating}.0</div>)<div>{review.review}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
