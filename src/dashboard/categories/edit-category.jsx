import { useParams } from "react-router-dom";
import CategoryAddEditForm from "./form/add-edit-form";
import { useFetchCategoryDetailQuery } from "../../hooks/useCategory";
import Loader from "../../components/loader";

export default function EditCategory() {
  const param = useParams();
  const { data: category, isLoading } = useFetchCategoryDetailQuery(param.id);
  if (isLoading) return <Loader />;
  return (
    <div className="shadow rounded mt-4 p-4">
      <CategoryAddEditForm defaultValue={category.data} />
    </div>
  );
}
