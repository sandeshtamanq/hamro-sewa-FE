import { useEffect } from "react";
import Iconify from "./iconify";

const CustomModal = ({ onDelete, showModal, handleClose }) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed", // Change to fixed
            zIndex: 1,
            left: 0,
            top: 0,
            backgroundColor: "rgba(64, 61, 61,.5)",
            overflowY: "auto", // Add overflowY: 'auto'
          }}
          onClick={handleClose}
        >
          <div className="modal-overlay rounded bg-white p-4 shadow">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="d-flex justify-content-end">
                <span
                  style={{ cursor: "pointer", borderRadius: "30px" }}
                  className="close-button bg-primary p-1"
                  onClick={handleClose}
                >
                  <Iconify
                    style={{ color: "white" }}
                    icon="icomoon-free:cross"
                    padding="0"
                    marginRight="0"
                    width="15px"
                  />
                </span>
              </div>
              <h6>Delete</h6>
              <p>Are you sure you want to delete</p>
              <div className="modal-actions d-flex justify-content-between">
                <button
                  className="close-modal-button btn btn-primary"
                  onClick={() => {
                    onDelete();
                    handleClose();
                  }}
                >
                  Yes
                </button>
                <button
                  className="save-changes-button btn btn-danger"
                  onClick={handleClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
