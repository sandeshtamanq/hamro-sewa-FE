import { Link } from "react-router-dom";

import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import {
  useDeleteServiceMutation,
  useFetchServiceQuery,
} from "../../../hooks/useService";
import CustomModal from "../../../components/modal";
import TableRow from "../../../components/table-row";
import Loader from "../../../components/loader";

export default function ServicesView() {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Service delete successfully", { variant: "success" });
    queryClient.invalidateQueries("services");
  }, [queryClient, enqueueSnackbar]);

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

  const { mutate: deleteService } = useDeleteServiceMutation(
    onSuccess,
    onError
  );

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  const { data: services, isLoading } = useFetchServiceQuery();
  services;
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="mt-4 shadow rounded p-4 ">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="">Services</h3>
          <Link to="add-service" className="btn d-inline btn-primary">
            Add service
          </Link>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.data?.map((service, index) => (
              <TableRow
                hideDelete={true}
                path={`edit/${service.id}`}
                edit={true}
                id={service.id}
                key={index}
                showModal={showModal}
                handleShow={handleShow}
                handleClose={handleClose}
                handleDelete={deleteService}
              >
                <th scope="row">{index + 1}</th>
                <td>{service?.productName}</td>
                <td>{service.category?.categoryName}</td>
                <td>{service.productPrice}</td>
                <td>
                  <img
                    src={service.productImageUrl}
                    style={{ height: "40px", width: "40px", flexGrow: "1" }}
                  />
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal />
    </>
  );
}
