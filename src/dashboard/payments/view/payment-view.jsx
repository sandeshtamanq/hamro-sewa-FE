import { useQueryClient } from "react-query";
import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import {
  useDeletePaymentMutation,
  useFetchPaymentQuery,
} from "../../../hooks/usePayment";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

export default function PaymentView() {
  const { data: payments, isLoading } = useFetchPaymentQuery();
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onDeleteSuccess = useCallback(() => {
    enqueueSnackbar("Payment Deleted successfully");
    queryClient.invalidateQueries("payments");
  }, [queryClient, enqueueSnackbar]);

  const onDeleteError = useCallback(
    (error) => {
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: deletePayment } = useDeletePaymentMutation(
    onDeleteSuccess,
    onDeleteError
  );

  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 rounded shadow p-4">
      <h3 className="">Payments</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Payment Mode</th>
            <th scope="col">Payment Status</th>
            <th scope="col">User</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.data.map((payment, index) => (
            <TableRow
              id={payment.id}
              key={index}
              edit={false}
              handleDelete={deletePayment}
            >
              <th scope="row">{index + 1}</th>
              <td>{payment?.paymentMode}</td>
              <td>{payment?.paymentStatus}</td>
              <td>{`${payment?.user?.firstName ?? ""} ${
                payment?.user?.lastName ?? ""
              }`}</td>
              <td>{payment?.booking?.bookingDate}</td>
              <td>{+payment?.priceInCents / 100}.00</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
