import { useCallback } from "react";
import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  useDeleteBookingMutation,
  useFetchBookingQuery,
  useUpdateBookingMutation,
} from "../../../hooks/useBooking";
import { useFetchProfessionalQuery } from "../../../hooks/useUser";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

export default function BookServicesView() {
  const { user } = useAuthContext();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Booking delete successfully", { variant: "success" });
    queryClient.invalidateQueries("bookings");
  }, [enqueueSnackbar, queryClient]);

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

  const { data: bookings, isLoading } = useFetchBookingQuery(user.role);
  const { data: professionals, isLoading: fetching } =
    useFetchProfessionalQuery();
  const { mutate: deleteBooking } = useDeleteBookingMutation(
    onSuccess,
    onError
  );

  const { mutate: updateBookingMutation } = useUpdateBookingMutation();

  const updateBooking = useCallback(
    (e, booking) => {
      updateBookingMutation({
        ...booking,
        professionalId: +e.target.value,
      });
    },
    [updateBookingMutation]
  );

  const handleDelete = useCallback(
    (id) => {
      deleteBooking(id);
    },
    [deleteBooking]
  );

  if (isLoading || fetching) return <Loader />;
  return (
    <div className="mt-4 rounded shadow p-4">
      <h3 className="">Book Services</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Service</th>
            <th scope="col">Total Services</th>
            <th scope="col">Status</th>
            <th scope="col">Payment Mode</th>
            <th>Booking Date</th>
            {user.role === "Admin" && <th>Booked By</th>}
            <th scope="col">Assigned User</th>
            <th>Total Amount</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.data.map((booking, index) => (
            <TableRow
              id={booking.id}
              key={index}
              edit={false}
              handleDelete={handleDelete}
            >
              <th scope="row">{index + 1}</th>
              <td>
                {booking.bookingItems.map((item, index) => (
                  <div key={item.id}>
                    {item?.product?.productName}{" "}
                    {booking.bookingItems.length !== index + 1 && ","}
                  </div>
                ))}
              </td>
              <td>{booking?.bookingItems.length}</td>
              <td>{booking?.bookingStatus}</td>
              <td>{booking?.payment?.paymentMode ?? "Cash on Delivery"}</td>
              <td>{booking.bookingDate}</td>
              {user.role === "Admin" && (
                <td>{`${booking.user?.firstName ?? ""} ${
                  booking.user?.lastName ?? ""
                }`}</td>
              )}
              <td>
                {user.role === "Admin" ? (
                  <select
                    defaultValue={booking?.professional?.user?.firstName}
                    defaultChecked
                    onChange={(e) => updateBooking(e, booking)}
                    id=""
                  >
                    <option>
                      {booking?.professional?.user?.fullName ??
                        "Select Professional"}
                    </option>
                    {professionals.data.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {`${professional?.user?.firstName} ${
                          professional?.user?.middleName ?? ""
                        } ${professional?.user?.lastName} (${
                          professional?.category?.categoryName ?? ""
                        })`}
                      </option>
                    ))}
                  </select>
                ) : (
                  booking?.professional?.user.fullName ?? "-"
                )}
              </td>
              <td>{booking.subTotal}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
