import { Link } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

export default function PageNotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-between"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <div className="d-flex px-4 align-items-center justify-content-between">
        <div>
          <h1>
            <span className="text-primary"> Sorry!,</span>this page isn’t
            available
          </h1>
          <h2 className="mt-4">
            Go back to <Link to={"/"}>home</Link>{" "}
          </h2>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/hamro-sewa-b7400.appspot.com/o/404-image%2F404notfound.png?alt=media&token=bc34cfa6-6bd9-4dc8-9348-0eb5d3412bf2"
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
}
