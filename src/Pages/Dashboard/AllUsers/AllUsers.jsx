import { Trash, User } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  // const [users, setUsers] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data;
    }
  })

  // Update User
  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Admin now`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  }

  // Delete User
  const handleDeleteUser = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            refetch()
          })
      }
    });
  }

  return (
    <div>
      <div className="flex justify-evenly my-5 ">
        <h2 className="text-4xl">All users</h2>
        <h2 className="text-4xl">Total users: {users?.length}</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-orange-400 text-white">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {
                    user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="bg-orange-400 p-2 rounded-xl text-white"><User></User></button>
                  }
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="bg-red-500 p-2 rounded-xl text-white"><Trash></Trash></button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;