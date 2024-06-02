import { useCallback, useState } from "react";
import LoadingButton from "../../components/loading-button";
import Iconify from "../../components/iconify";
import { useUpdatePasswordMutation } from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

export default function ChangePassword() {
  const [viewPassword, setViewPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
  }, [enqueueSnackbar]);

  const onError = useCallback(
    (error) => {
      error;
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: updatePassword, isLoading } = useUpdatePasswordMutation(
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
      updatePassword(passwordInfo);
    },
    [updatePassword, enqueueSnackbar, passwordInfo]
  );
  return (
    <div className="col-6 divpassword mt-4 p-2">
      <form onSubmit={handleSubmit} className="p-2">
        <p className="text-primary fw-bold fs-4">Change password</p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Old Password
          </label>
          <div className="input-group">
            <input
              onChange={handleChange}
              value={passwordInfo.currentPassword}
              name="currentPassword"
              type={viewPassword.currentPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputOldPassword"
              aria-describedby="fullnameHelp"
            />
            <div
              onClick={() =>
                setViewPassword((preVal) => ({
                  ...preVal,
                  currentPassword: !preVal.currentPassword,
                }))
              }
              style={{ cursor: "pointer" }}
              className="input-group-prepend"
            >
              <span className="input-group-text p-0" id="basic-addon1">
                {viewPassword.currentPassword ? (
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
  );
}
