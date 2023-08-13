import Link from "next/link";
import { User } from "type";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }: UserListProps) => {
  console.log(users)
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>نام</th>
            <th>ایمیل</th>
            <th>شماره تلفن</th>
            <th>تاریخ عضویت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cellphone}</td>
              <td>{user.created_at}</td>
              <td>
                <div className="d-flex">
                  <Link
                    href={`users/${user.id}`}
                    className="btn btn-sm btn-outline-dark me-2"
                  >
                    نمایش
                  </Link>
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="btn btn-sm btn-dark"
                  >
                    ویرایش
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
