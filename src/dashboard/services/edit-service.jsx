import { useParams } from "react-router-dom";
import AddEditService from "./form/service-add-edit-form";
import { useGetServiceDetailMutation } from "../../hooks/useService";
import Loader from "../../components/loader";

export default function EditService() {
  const param = useParams();
  const { data: serviceDetail, isLoading } = useGetServiceDetailMutation(
    param.id
  );
  if (isLoading) return <Loader />;
  return <AddEditService formMode="Edit" defaultValue={serviceDetail.data} />;
}
