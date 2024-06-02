import { useCallback, useState } from "react";
import LoadingButton from "../../../components/loading-button";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Please check your email", { variant: "success" });
  }, [enqueueSnackbar]);

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

  const { mutate: forgotPasswordMutation, isLoading } =
    useForgotPasswordMutation(onSuccess, onError);

  const handleChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      forgotPasswordMutation(email);
    },
    [forgotPasswordMutation, email]
  );
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className=" p-4">
        <div
          className=" p-4 rounded shadow"
          style={{
            background: "white",
            width: "50%",
            margin: "auto",
          }}
        >
          <h4>Forgot your password?</h4>
          <p className="text-secondary" style={{ fontSize: "15px" }}>
            Please enter the email address associated with your account and we
            will email you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                onChange={handleChange}
                value={email}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <LoadingButton
              isLoading={isLoading}
              type="submit"
              style="btn btn-primary w-100 mt-3"
            >
              Send Request
            </LoadingButton>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/login" className="link ms-3">
                Return to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
