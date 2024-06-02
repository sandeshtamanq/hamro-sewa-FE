import { useAuthContext } from "../hooks/useAuthContext";
import { useDropdownContext } from "../hooks/useDropdownContext";

const DropDown = ({ children }) => {
  const { user } = useAuthContext();

  const { dispatch, open } = useDropdownContext();

  const handleClick = () => {
    dispatch({ type: "OPEN" });
  };

  return (
    <div>
      {open && (
        <div
          style={{
            height: "100vh",
            width: "99.98%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onClick={handleClick}
        ></div>
      )}
      <div
        className="position-relative d-flex align-items-center justify-content-between cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={
            user.profileImageUrl ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          }
          style={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
          }}
          className="rounded-circle border"
          alt="Userphoto"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "30px", cursor: "pointer" }}
          className={open ? "rotate" : "reverse-rotate"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default DropDown;
