import { Link } from "react-router-dom";
import Loader from "../../../components/loader";
import {
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../../hooks/useCategory";
import TableRow from "../../../components/table-row";
import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

export default function CategoryView() {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Category delete successfully", { variant: "success" });
    queryClient.invalidateQueries("categories");
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

  const { data: categories, isLoading } = useFetchCategoryQuery(
    onSuccess,
    onError
  );

  const { mutate: deleteCategory } = useDeleteCategoryMutation(
    onSuccess,
    onError
  );

  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 shadow rounded p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="">Categories</h3>
        <Link to="add-category" className="btn d-inline btn-primary">
          Add Category
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.data.map((category, index) => (
            <TableRow
              hideDelete={true}
              path={`edit/${category.id}`}
              edit={true}
              id={category.id}
              key={index}
              handleDelete={deleteCategory}
            >
              <th scope="row">{index + 1}</th>
              <td>{category?.categoryName}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
