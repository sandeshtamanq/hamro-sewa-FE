import { useFetchCategoryQuery } from "../../../hooks/useCategory";
import ProductList from "../product-list";

export default function HomeView() {
  const { data: categories } = useFetchCategoryQuery();

  return (
    <main>
      <div className="container-fluid bg-primary">
        <div className="row">
          <div className="col-lg-6 col-m-12 align-self-center">
            <div className="">
              <h1 className="text-white fw-bold fs-3 mb-3">
                {`'Bringing Services to Your Fingertips:`}
                <h1 className="text-white fw-bold fs-3 mb-3">
                  {`Your Comfort,Our Commitment!'`}
                </h1>
              </h1>
              {/* <input
                className="form-control mb-3"
                type="text"
                placeholder="Search"
              />
              <div className="d-flex align-items-center flex-wrap ">
                <p className="text-white me-3">Most Searched:</p>
                <a href="">
                  <p className="border border-white text-white py-1 px-2 me-5">
                    Pest Control
                  </p>
                </a>
                <a href="">
                  <p className="border border-white text-white py-1 px-2 me-5">
                    Pest Control
                  </p>
                </a>
                <a href="">
                  <p className="border border-white text-white py-1 px-2 me-3">
                    Pest Control
                  </p>
                </a>
              </div> */}
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2Fslogan.png?alt=media&token=2d866f94-58a8-453b-9462-15302053b764"
              }
              className="w-50 float-end"
            />
          </div>
        </div>
      </div>
      <p className="text-center mt-3 fs-1 fw-bold">Our Service To Explore</p>

      <div className="row mt-4">
        <div className="col-md-3 text-center mb-3 mb-md-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2Fcleaning.png?alt=media&token=5c9dbe4b-8a1a-4324-a350-43e2d8702fdc"
            className="img-fluid"
            alt="Cleaning"
          />
          <p>Cleaning</p>
        </div>
        <div className="col-md-3 text-center mb-3 mb-md-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2Felectrician.png?alt=media&token=56644391-40b6-4b13-b2b9-5dad8ca2bb95"
            className="img-fluid"
            alt="Electrician"
          />
          <p>Electrician</p>
        </div>
        <div className="col-md-3 text-center mb-3 mb-md-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2FFlooring.png?alt=media&token=37c7eb2e-9815-4704-98d2-ba1203951f48"
            className="img-fluid"
            alt="Flooring"
          />
          <p>Flooring</p>
        </div>
        <div className="col-md-3 text-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2FPlumbing.png?alt=media&token=9e8812b7-f31d-4055-80ac-0e3e4912aae3"
            className="img-fluid"
            alt="Plumbing"
          />
          <p>Plumbing</p>
        </div>
      </div>

      {categories?.data.map((category, index) => (
        <ProductList
          key={index}
          home
          serviceName={category?.categoryName}
          data={category?.products}
        />
      ))}

      {/* <ProductList home serviceName={"Cleaning"} data={cleaningDate.Cleaning} />

      <ProductList home serviceName={"Plumbing"} data={cleaningDate.Plumbing} />

      <ProductList
        serviceName={"Electrician"}
        data={cleaningDate.Electrician}
        home
      />

      <ProductList home serviceName={"Flooring"} data={cleaningDate.Plumbing} /> */}

      <div className="container-fluid mt-4">
        <img className="w-100" src="/images/offer.png" alt="" />
      </div>

      <div className="row mt-4">
        <div className="col-md-6 bg-white px-md-5">
          <p className="mt-4 fs-1 fw-bold text-center">Why Hamro Sewa?</p>

          <div className="d-flex align-items-center mb-3">
            <div className="w-25 me-2">
              <img src="/images/why1.png" alt="" className="img-fluid" />
            </div>
            <div>
              <p className="fw-bold">Transparent Pricing </p>
              <p>Check the fixed price before making a reservation.</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <div className="w-25 me-2">
              <img src="/images/why2.png" alt="" className="img-fluid" />
            </div>
            <div>
              <p className="fw-bold">Quality Services </p>
              <p>Providing top-notch services with customer satisfaction.</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <div className="w-25 me-2">
              <img src="/images/why3.png" alt="" className="img-fluid" />
            </div>
            <div>
              <p className="fw-bold">Professional Staff </p>
              <p>Experienced and trained professionals for your service.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            className="w-100 h-auto"
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/home%2F2.png?alt=media&token=77ee758e-6ca3-48f7-b7db-a3fc4736cd25"
            alt="Hamro Sewa"
          />
        </div>
      </div>

      <p className="text-center fw-bold fs-1 mt-4">What Our Clients Say?</p>

      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="mt-4 d-flex mt-3 ">
              <div className="review-profile-pic">
                <img src="/images/client1.png" alt="" />
              </div>
              <div className="client">
                <p className="fw-bold">Rajeesha Shrestha</p>
                <p className="text-secondary">Norvic Hospital</p>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph ph-star"></i>
                <i className="ph ph-star"></i>
              </div>
            </div>
            <p className="mt-3 fs-3">
              I am overjoyed with the wonderful wall painting service! My
              expectations were exceeded by the precision and attention to
              detail. a skilled crew that completely finished my space
              transformation. Strongly advised for excellent quality and
              dependable service!
            </p>
          </div>
          <div className="carousel-item ">
            <div className="mt-4 d-flex mt-3">
              <div className="review-profile-pic">
                <img src="/images/" alt="" />
              </div>
              <div className="client">
                <p className="fw-bold">Himal Thapa</p>
                <p className="text-secondary">CEO of Cerave</p>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph ph-star"></i>
              </div>
            </div>
            <p className="mt-3 fs-3">
              {`"I am really happy with the exceptional service that HamroSewa
              offered. The crew was professional and meticulous from beginning
              to end, leaving my house immaculate. I heartily urge everyone
              looking for excellent house cleaning solutions to use their
              services."`}
            </p>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-around mt-4">
        <div className="border-right box mb-3 mb-md-0">
          <p className="fw-bold fs-1 text-primary">100+</p>
          <p className="fs-1 text-dark">Bookings</p>
        </div>

        <div className="border-right box2 mb-3 mb-md-0">
          <p className="fw-bold fs-1 text-primary">30+</p>
          <p className="fs-1 text-dark">Experts</p>
        </div>

        <div className="border-right box3">
          <p className="fw-bold fs-1 text-primary">5+</p>
          <p className="fs-1 text-dark">Services</p>
        </div>
      </div>
    </main>
  );
}
