import { useCallback, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  useUpdateUserMutation,
  useUploadUserImageMutation,
} from "../../../hooks/useUser";
import LoadingButton from "../../../components/loading-button";
import { useSnackbar } from "notistack";
import CircularLoader from "../../../components/circular-loader";
import ChangePassword from "../change-password";

export default function ProfileView() {
  const { user, dispatch } = useAuthContext();
  const [userCredentials, setUserCredentials] = useState(user);
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = useCallback(
    (data) => {
      enqueueSnackbar("User updated successfully", { variant: "success" });

      dispatch({ type: "UPDATE", payload: data.data });
    },
    [dispatch, enqueueSnackbar]
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

  const { mutate: updateUserMutation, isLoading } = useUpdateUserMutation(
    onSuccess,
    onError
  );

  const onUploadSuccess = useCallback(
    (data) => {
      enqueueSnackbar("Profile image uploaded successfully", {
        variant: "success",
      });

      dispatch({ type: "UPDATE", payload: data.data });
    },
    [dispatch, enqueueSnackbar]
  );

  const onUploadError = useCallback(
    (error) => {
      error;
      enqueueSnackbar(
        error?.response?.data?.message ?? "Something went wrong",
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: uploadImageMutation, isLoading: uploading } =
    useUploadUserImageMutation(onUploadSuccess, onUploadError);

  const uploadImage = (e) => {
    const formData = new FormData();

    const image = e.target.files[0];

    formData.append("profileImageUrl", image);
    uploadImageMutation({ id: user.id, profileImageUrl: formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      updateUserMutation(userCredentials);
    },
    [updateUserMutation, userCredentials]
  );
  return (
    <div className="rounded mt-4 shadow p-4">
      <div className="d-flex align-items-center userdiv py-4">
        {uploading ? (
          <div
            className="d-flex justify-content-center align-items-center rounded-circle border"
            style={{
              height: "100px",
              width: "100px",
              marginRight: "20px",
            }}
          >
            <CircularLoader />
          </div>
        ) : (
          <label className="p-4" htmlFor="profileImage">
            <img
              src={
                user.profileImageUrl ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
              }
              style={{
                height: "100px",
                width: "100px",
                marginLeft: "13px",
                cursor: "pointer",
              }}
              className="rounded-circle border"
              alt="Userphoto"
            />
            <div
              className="bg-primary text-white p-1 mt-2 rounded"
              style={{ cursor: "pointer" }}
            >
              Change Image
            </div>
          </label>
        )}
        <input onChange={uploadImage} type="file" id="profileImage" hidden />
        <div className="userdetails ml-4 mt-3">
          <p className="fw-bold">{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-secondary">{user?.email}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mt-2 p-2">
          <form className="p-2" onSubmit={handleSubmit}>
            <p className="text-primary fw-bold fs-4">User Details</p>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name*
              </label>
              <input
                type="firstName"
                value={userCredentials.firstName}
                onChange={handleChange}
                className="form-control"
                id="firstName"
                name="firstName"
                aria-describedby="nameHelp"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name*
              </label>
              <input
                type="name"
                value={userCredentials.lastName}
                onChange={handleChange}
                className="form-control"
                id="lastName"
                name="lastName"
                aria-describedby="nameHelp"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number*
              </label>
              <input
                type="text"
                value={userCredentials.contactNumber}
                onChange={handleChange}
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                aria-describedby="numberHelp"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                value={userCredentials.email}
                onChange={handleChange}
                className="form-control"
                id="email"
                name="email"
                aria-describedby="addressHelp"
              />
            </div>
            <LoadingButton
              isLoading={isLoading}
              type="submit"
              style="btn btn-primary w-100 mt-3"
            >
              Update
            </LoadingButton>
          </form>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
}
