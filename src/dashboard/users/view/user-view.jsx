import { useCallback } from "react";
import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import {
  useDeleteUserMutation,
  useFetchUsersQuery,
} from "../../../hooks/useUser";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

export default function UserView() {
  const { data: users, isLoading } = useFetchUsersQuery("user");

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("User delete successfully", { variant: "success" });
    queryClient.invalidateQueries("users");
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

  const { mutate: deleteUser } = useDeleteUserMutation(onSuccess, onError);

  const handleDelete = useCallback(
    (id) => {
      deleteUser(id);
    },
    [deleteUser]
  );

  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 rounded shadow p-4">
      <h3 className="">Users</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Full Name</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email</th>
            <th scope="col">Email Verified</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user, index) => (
            <TableRow
              id={user.id}
              key={index}
              edit={false}
              handleDelete={handleDelete}
            >
              <th scope="row">{index + 1}</th>
              <td>{`${user.firstName} ${user.middleName ?? ""} ${
                user.lastName
              }`}</td>
              <td>{user.address ?? "-"}</td>
              <td>{user.contactNumber}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`py-1  px-2 border ${
                    user.isEmailVerified ? "bg-primary" : "bg-danger"
                  } text-white`}
                  style={{
                    borderRadius: "30px",
                  }}
                >
                  {user.isEmailVerified ? "Yes" : "No"}
                </span>
              </td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
