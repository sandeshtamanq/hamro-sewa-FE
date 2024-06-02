import { Link } from "react-router-dom";
import Iconify from "../../components/iconify";

export default function CartDetails({ cartItems }) {
  return (
    <div className="shadow rounded bg-white p-3">
      <p className="fw-bold fs-2 m-0">Cart</p>
      <div></div>
      {cartItems?.data?.cartItems?.length > 0 ? (
        <div>
          <div className="fw-bold d-flex align-items-center justify-content-between mb-2">
            <div style={{ flex: 1 }}>name</div>
            <div style={{ flex: 1, textAlign: "center" }}>quantity</div>
            <div style={{ flex: 1, textAlign: "center" }}>price</div>
          </div>
          <div>
            {cartItems?.data?.cartItems?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="fw-bold" style={{ flex: 1 }}>
                    {product?.product?.productName}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {product?.quantity}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    Rs.{+product?.product?.productPrice * product?.quantity}
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/checkout" className="btn btn-primary w-100 mt-3">
            Proceed to checkout
          </Link>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center ">
            <Iconify icon="bi:cart" width={50} />
          </div>
          <p className="fw-bold text-center">No Items In Your Cart </p>
        </>
      )}
    </div>
  );
}
