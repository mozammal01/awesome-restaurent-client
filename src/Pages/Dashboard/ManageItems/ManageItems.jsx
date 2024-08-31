import { Edit, Trash } from "lucide-react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();

  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = item => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`)
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} deleted Successfull`,
            showConfirmButton: false,
            timer: 1500
          });
        }
        console.log(res.data);
      }
    });
  }

  return (
    <div className="px-10">
      <div className="-my-10 ">
        <SectionTitle heading="Manage all items" subHeading="Hurry Up "></SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-400 text-white rounded-xl uppercase">
            <tr>
              <th></th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              menu.map((item, i) => <tr key={item._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask h-12 w-12">
                        <img
                          src={item?.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold text-gray-400">{item?.name}</td>
                <td className="font-bold text-gray-400">${item?.price}</td>
                <th><Link to={`/dashboard/updateItem/${item._id}`}><button className="bg-orange-400 p-2 rounded-lg text-white"><Edit></Edit></button></Link></th>
                <th><button onClick={() => handleDeleteItem(item)} className="bg-red-600 p-2 rounded-lg text-white"><Trash></Trash></button></th>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;