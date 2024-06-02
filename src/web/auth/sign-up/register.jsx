import { useCallback, useState } from "react";
import LoadingButton from "../../../components/loading-button";
import { useSignUpMutation } from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useFetchCategoryQuery } from "../../../hooks/useCategory";
import Iconify from "../../../components/iconify";

export default function RegisterView() {
  const [userType, setUserType] = useState("User");
  const [viewPassword, setViewPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    address: "",
    profession: 0,
  });

  const { data: categories } = useFetchCategoryQuery();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(
    (data) => {
      if (data.status === 201) {
        enqueueSnackbar("User registered successfully!");
        navigate("/login/?signedUp=true");
      }
    },
    [enqueueSnackbar, navigate]
  );

  const onError = useCallback(
    (data) => {
      if (data?.response?.status === 400) {
        if (Array.isArray(data?.response?.data?.message)) {
          data.response.data.message;
          enqueueSnackbar(data.response.data.message[0], {
            variant: "error",
          });
        } else {
          enqueueSnackbar(data?.response?.data?.message, { variant: "error" });
        }
      }
    },
    [enqueueSnackbar]
  );

  const { mutate: signUpMutation, isLoading } = useSignUpMutation(
    onSuccess,
    onError
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (userType === "Professional") {
        if (userCredentials.profession === 0) {
          enqueueSnackbar("Please select a profession", { variant: "error" });
          return;
        }
      }
      signUpMutation({ ...userCredentials, role: userType });
    },
    [signUpMutation, userType, enqueueSnackbar, userCredentials]
  );

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img
            src={
              userType === "User"
                ? "https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/register%2Flogin.png?alt=media&token=6e98f461-14bd-4e3f-b5e0-09e7a65e12d8"
                : "https://firebasestorage.googleapis.com/v0/b/shop-a6a23.appspot.com/o/register%2Fprofessionals.png?alt=media&token=3adec4f7-f8c4-47a6-88bb-54636ac9b255"
            }
            style={{ height: "auto", maxWidth: "100%" }}
            alt="User Type Image"
          />
        </div>
        <div className="col-lg-6">
          <h5 className="text-center">Select User Type</h5>
          <div className="d-flex p-2 justify-content-center align-items-center">
            <div
              onClick={() => setUserType("Professional")}
              className={`m-2 user-type ${
                userType === "Professional"
                  ? "bg-primary text-white"
                  : "bg-white"
              }  px-5 py-3 rounded cursor-pointer`}
            >
              Professional
            </div>
            <div
              onClick={() => setUserType("User")}
              className={`user-type ${
                userType === "User" ? "bg-primary text-white" : "bg-white"
              }  px-5 py-3 rounded cursor-pointer`}
            >
              User
            </div>
          </div>
          <form className="rounded shadow p-5" onSubmit={handleSubmit}>
            <h3 className="fs-4 fw-bold mb-4">
              Join Hamro Sewa to change your Life
            </h3>

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
              <label htmlFor="address" className="form-label">
                Address*
              </label>
              <input
                type="text"
                value={userCredentials.address}
                onChange={handleChange}
                className="form-control"
                id="address"
                name="address"
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

            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <div className="input-group mb-3">
              <input
                type={viewPassword ? "text" : "password"}
                value={userCredentials.password}
                onChange={handleChange}
                className="form-control"
                id="password"
                name="password"
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

            {userType === "Professional" && (
              <div className="mb-3">
                <label htmlFor="profession" className="form-label">
                  Services
                </label>
                <select
                  onChange={handleChange}
                  name="profession"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Select One</option>
                  {categories?.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <LoadingButton
              isLoading={isLoading}
              type="submit"
              style="btn btn-primary w-100 mt-3"
            >
              Register
            </LoadingButton>
            <div className="d-flex justify-content-center mt-3">
              <p>Already Have an account?</p>
              <Link to="/login" className="link ms-3">
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
