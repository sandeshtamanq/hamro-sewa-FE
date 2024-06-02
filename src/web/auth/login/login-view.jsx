import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
import { useLoginMutation } from "../../../hooks/useAuth";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingButton from "../../../components/loading-button";
import Iconify from "../../../components/iconify";

export default function LoginView() {
  const [viewPassword, setViewPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(
    (data) => {
      enqueueSnackbar("User logged in successfully", { variant: "success" });

      dispatch({ type: "LOGIN", payload: data.data });

      navigate("/dashboard/profile");
    },
    [dispatch, enqueueSnackbar, navigate]
  );

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

  const { mutate: loginMutation, isLoading } = useLoginMutation(
    onSuccess,
    onError
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      loginMutation(loginCredential);
    },
    [loginCredential, loginMutation]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginCredential((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/login%2Flogin.png?alt=media&token=25cd877a-b6b9-47c6-957a-63b6cd157713"
            style={{ height: "auto", maxWidth: "100%" }}
            alt="Login Image"
          />
        </div>
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="bg-white p-5">
            {searchParams.get("signedUp") && (
              <div className="py-2">
                Thank you for signing up with us. Please check your email to
                verify your account.
              </div>
            )}
            <br />
            <h3 className="fs-4 fw-bold mb-4">Login Now!</h3>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                onChange={handleChange}
                value={loginCredential.email}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="input-group mb-3">
                <input
                  onChange={handleChange}
                  value={loginCredential.password}
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div
                  onClick={() => setViewPassword((prevVal) => !prevVal)}
                  style={{ cursor: "pointer" }}
                  className="input-group-prepend"
                >
                  <span className="input-group-text p-0" id="basic-addon1">
                    {viewPassword ? (
                      <Iconify icon="iconoir:eye-solid" padding="10px" />
                    ) : (
                      <Iconify
                        icon="teenyicons:eye-closed-outline"
                        padding="10px"
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <LoadingButton
              isLoading={isLoading}
              type="submit"
              style="btn btn-primary w-100 mt-3"
            >
              Login
            </LoadingButton>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/forgot-password" className="link ms-3">
                Forgot Password?
              </Link>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <p>Don’t have an account? </p>
              <Link to="/register" className="link ms-3">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
