export default function AboutUs() {
  return (
    <>
      <div className="mt-4 fw-bold fs-1 text-center "> About Us</div>
      <p className="mt-4 fs-5 p-4">
        {`At “Hamro Sewa", we take great delight in providing our valued customers
        with excellent home-based services that raise their standard of living.
        as a committed team, we recognize the value of having a tidy and
        well-kept house, and it is our goal to provide you with unmatched
        service to make this a reality. we combine a range of skills with a
        dedication to customer satisfaction, all with an eye toward perfection.
        our array of offerings, encompassing entire house cleaning and upkeep,
        is crafted to meet your expectations. our love for designing functional,
        healthy environments is the foundation of our strategy, and we're here
        to transform your house into a tidy, smoothly comfort."`}
      </p>
      <p className="fs-5 p-4">
        {`We separate ourselves in the home services industry by combining
        professional with a personal touch. our team of highly qualified experts
        is committed to giving our clients a flawless and stress-free service.To
        protect the health of your house and the environment, we place a high
        priority on transparency, reliability, and the use of eco-friendly
        goods. hamro Sewa is your go-to partner for creating a clean, cozy, and
        service-oriented home, whether you need regular maintenance or a
        one-time deep clean."`}
      </p>

      <div className="d-flex align-items-center justify-content-around mt-4 ">
        <div className="border-right box ">
          <p className="fw-bold fs-1 text-primary">100+</p>
          <p className="fs-1 text-dark">Bookings</p>
        </div>

        <div className="border-right box2">
          <p className="fw-bold fs-1 text-primary">30+</p>
          <p className="fs-1 text-dark">Experts</p>
        </div>

        <div className="border-right box3">
          <p className="fw-bold fs-1 text-primary">5+</p>
          <p className="fs-1 text-dark">Services</p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row g-2 mt-4">
          <div className="col-lg-6 bg-white px-4">
            <p className="text-center text-primary fw-bold fs-2 mt-3">
              Our Mission
            </p>
            <p className="fs-4 ">
              {`Our Mission is to turn home into safe places by offering the best
              cleaning and upkeep services. Our goal is to improve our clients'
              quality of life by providing them with careful attention to
              detail, expertise, and a dedication to sustainable techniques.`}
            </p>
          </div>

          <div className="col-lg-6 px-4 vision">
            <p className="text-center text-white fw-bold fs-2 mt-3">
              Our Vision
            </p>
            <p className="fs-4 text-white">
              {`Our Goal is to be the go-to option for home-based services,
              leading the way in environmental responsibility and customer
              satisfaction. With our careful attention to detail and creative
              design, we hope to create offers that inspire happiness and
              wellbeing."`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
