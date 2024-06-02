import { Link } from "react-router-dom";
import {
  useDeleteCouponCodeMutation,
  useFetchCouponCodeQuery,
} from "../../../hooks/useCouponCode";
import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

export default function CouponCodeView() {
  const { data: couponCodes, isLoading } = useFetchCouponCodeQuery();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Coupon delete successfully", { variant: "success" });
    queryClient.invalidateQueries("coupon-codes");
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

  const { mutate: deleteCoupon } = useDeleteCouponCodeMutation(
    onSuccess,
    onError
  );

  const handleDelete = useCallback(
    (id) => {
      deleteCoupon(id);
    },
    [deleteCoupon]
  );
  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 shadow rounded p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="">Coupon Codes</h3>
        <Link to="add-coupon" className="btn d-inline btn-primary">
          Add Coupon
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Coupon Code</th>
            <th scope="col">Valid For(days)</th>
            <th scope="col">Discount Amount(Rs.)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {couponCodes?.data.map((couponCode, index) => (
            <TableRow
              hideDelete={false}
              path={`edit/${couponCode.id}`}
              edit={true}
              id={couponCode.id}
              key={index}
              handleDelete={handleDelete}
            >
              <th scope="row">{index + 1}</th>
              <td>{couponCode?.couponCode}</td>
              <td>{couponCode?.validFor}</td>
              <td>{couponCode?.discountPrice}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
