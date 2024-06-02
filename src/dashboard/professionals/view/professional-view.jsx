import Loader from "../../../components/loader";
import TableRow from "../../../components/table-row";
import { useFetchUsersQuery } from "../../../hooks/useUser";

export default function ProfessionalView() {
  const { data: users, isLoading } = useFetchUsersQuery("Professional");

  if (isLoading) return <Loader />;
  return (
    <div className="mt-4 rounded shadow p-4">
      <h3 className="">Professionals</h3>

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
              // handleDelete={deleteCategory}
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
