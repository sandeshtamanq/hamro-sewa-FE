import CategoryAddEditForm from "./form/add-edit-form";

export default function AddCategory() {
  return (
    <div className="shadow rounded mt-4 p-4">
      <CategoryAddEditForm formMode={"Add"} />
    </div>
  );
}
