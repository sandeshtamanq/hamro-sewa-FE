import { useCallback, useState } from "react";
import CustomModal from "./modal";
import Iconify from "./iconify";
import { Link } from "react-router-dom";

export default function TableRow({
  id,
  children,
  handleDelete,
  edit,
  path,
  hideDelete,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const onDelete = useCallback(() => {
    handleDelete(id);
  }, [id, handleDelete]);
  return (
    <>
      <tr>
        {children}
        <td className="d-flex">
          {edit && (
            <Link
              to={path}
              className="text-secondary"
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              <Iconify icon="ph:pencil" />
            </Link>
          )}
          {!hideDelete && (
            <div
              onClick={handleShow}
              data-target="#exampleModalCenter"
              data-toggle="modal"
              style={{ cursor: "pointer" }}
            >
              <Iconify icon="ph:trash" />
            </div>
          )}
        </td>
      </tr>
      <CustomModal
        handleClose={handleClose}
        showModal={showModal}
        onDelete={onDelete}
      />
    </>
  );
}
