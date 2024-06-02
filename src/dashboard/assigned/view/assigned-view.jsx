import { useCallback } from "react";
import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import {
  useFetchAssignedBookingQuery,
  useUpdateBookingStatusMutation,
} from "../../../hooks/useBooking";
import { useSnackbar } from "notistack";

export default function AssignedView() {
  const { data: assignedBookings, isLoading } = useFetchAssignedBookingQuery();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Status changed successfully", { variant: "success" });
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

  const { mutate: updateBookingMutation } = useUpdateBookingStatusMutation(
    onSuccess,
    onError
  );

  const updateBooking = useCallback(
    (e, booking) => {
      updateBookingMutation({
        id: booking.id,
        bookingStatus: e.target.value,
      });
    },
    [updateBookingMutation]
  );

  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 rounded shadow p-4">
      <h3 className="">Assigned Works</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Booked Services</th>
            <th scope="col">Booked By</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Email</th>
            <th>Booking Date</th>
            <th scope="col">Sub Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assignedBookings?.data.map((assignedBooking, index) => (
            <TableRow
              hideDelete
              hideAction
              id={assignedBooking.id}
              key={index}
              edit={false}
            >
              <th scope="row">{index + 1}</th>
              <td>
                {assignedBooking.bookingItems.map((item, index) => (
                  <div key={item.id}>
                    {item?.product?.productName}{" "}
                    {assignedBooking.bookingItems.length !== index + 1 && ","}
                  </div>
                ))}
              </td>
              <td>{assignedBooking?.user.firstName}</td>

              <td>{assignedBooking?.user.contactNumber}</td>
              <td>{assignedBooking?.user.email}</td>

              <td>{assignedBooking.bookingDate}</td>
              <td>{assignedBooking.subTotal}</td>
              <td>
                <select
                  onChange={(e) => updateBooking(e, assignedBooking)}
                  id=""
                >
                  <option>{assignedBooking.bookingStatus}</option>

                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
