import { useParams } from "react-router-dom";
import CouponAddEdit from "./form/add-edit-form";
import { useGetCouponCodeDetailQuery } from "../../hooks/useCouponCode";
import Loader from "../../components/loader";

export default function EditCoupon() {
  const param = useParams();
  const { data: couponCode, isLoading } = useGetCouponCodeDetailQuery(param.id);
  if (isLoading) return <Loader />;

  return (
    <div className="shadow rounded mt-4 p-4">
      <CouponAddEdit formMode={"Edit"} defaultValue={couponCode.data} />
    </div>
  );
}
