import { useCallback, useState } from "react";

import { useSnackbar } from "notistack";
import { useResetPasswordMutation } from "../../../hooks/useAuth";
import Iconify from "../../../components/iconify";
import LoadingButton from "../../../components/loading-button";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordView() {
  const [viewPassword, setViewPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Password update successfully", { variant: "success" });
    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setViewPassword({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

    navigate("/login");
  }, [enqueueSnackbar, navigate]);

  const onError = useCallback(
    (error) => {
      if (error?.response?.status === 400) {
        if (Array.isArray(error?.response?.data?.message)) {
          error.response.data.message;
          enqueueSnackbar(error.response.data.message[0], {
            variant: "error",
          });
        } else {
          enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
        }
      }
    },
    [enqueueSnackbar]
  );

  const { mutate: resetPasswordMutation, isLoading } = useResetPasswordMutation(
    onSuccess,
    onError
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setPasswordInfo((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        enqueueSnackbar("Password do not match", { variant: "error" });
        return;
      }

      resetPasswordMutation({
        token: searchParams.get("token"),
        ...passwordInfo,
      });
    },
    [resetPasswordMutation, passwordInfo, searchParams, enqueueSnackbar]
  );
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className=" p-4">
        <div
          className=" p-4 rounded shadow"
          style={{
            background: "white",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit} className="p-2">
            <p className="text-primary fw-bold fs-4">Change password</p>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  onChange={handleChange}
                  value={passwordInfo.newPassword}
                  name="newPassword"
                  type={viewPassword.newPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputOldPassword"
                  aria-describedby="fullnameHelp"
                />
                <div
                  onClick={() =>
                    setViewPassword((preVal) => ({
                      ...preVal,
                      newPassword: !preVal.newPassword,
                    }))
                  }
                  style={{ cursor: "pointer" }}
                  className="input-group-prepend"
                >
                  <span className="input-group-text p-0" id="basic-addon1">
                    {viewPassword.newPassword ? (
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
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  onChange={handleChange}
                  value={passwordInfo.confirmPassword}
                  name="confirmPassword"
                  type={viewPassword.confirmPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputOldPassword"
                  aria-describedby="fullnameHelp"
                />
                <div
                  onClick={() =>
                    setViewPassword((preVal) => ({
                      ...preVal,
                      confirmPassword: !preVal.confirmPassword,
                    }))
                  }
                  style={{ cursor: "pointer" }}
                  className="input-group-prepend"
                >
                  <span className="input-group-text p-0" id="basic-addon1">
                    {viewPassword.confirmPassword ? (
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
              Change Password
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
