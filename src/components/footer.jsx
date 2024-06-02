export default function Footer() {
  return (
    <footer style={{ marginTop: "50px" }}>
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-3">
            <h6 className="fw-bold">More About Us</h6>
            <p>Home</p>
            <p>Service</p>
            <p>AboutUs</p>
            <p>Blogs</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Services </h6>
            <p>Flooring</p>
            <p>Plumbing</p>
            <p>Cleaning</p>
            <p>Electrician</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Locations</h6>
            <p>Kathmandu</p>
            <p>Pokhara</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Contact Number</h6>
            <p>9840580123</p>
            <p>014283240</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Email Address</h6>
            <p>Hamrosewa@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
