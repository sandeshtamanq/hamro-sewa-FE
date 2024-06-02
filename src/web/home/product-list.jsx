import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ProductList({ id, serviceName, data, home }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mt-4 ">
        <div className="fs-1 fw-bold ms-4">{serviceName}</div>
        {!home && (
          <Link to={`/service/${id}`} className="me-4">
            View All
          </Link>
        )}
      </div>

      <div className="container-fluid mt-3">
        <div className="row mt-4">
          {home ? (
            data
              ?.slice(0, 4)
              ?.map((data, index) => (
                <ProductCard
                  css={"col-lg-3"}
                  key={index}
                  description={data.productDescription}
                  image={data.productImageUrl}
                  name={data.productName}
                  price={data.productPrice}
                  home={home}
                />
              ))
          ) : (
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              spaceBetween={30}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {data?.map((data, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    description={data.productDescription}
                    image={data.productImageUrl}
                    name={data.productName}
                    price={data.productPrice}
                    home={home}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
