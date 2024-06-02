import CouponAddEdit from "./form/add-edit-form";

export default function AddCoupon() {
  return (
    <div className="shadow rounded mt-4 p-4">
      <CouponAddEdit formMode={"Add"} />
    </div>
  );
}
