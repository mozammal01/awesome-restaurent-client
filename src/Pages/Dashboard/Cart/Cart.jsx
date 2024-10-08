import { Trash } from "lucide-react";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {

  const [cart, refetch] = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  const axiosSecure = useAxiosSecure();

  const handleDelete = id => {
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
        axiosSecure.delete(`/carts/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1000
              });
            }
            console.log(res.data);
          })
      }
    });

  }

  return (
    <div>
      <div className="flex justify-evenly my-10 items-center">
        <h2 className="text-5xl">Items: {cart.length}</h2>
        <h2 className="text-5xl">Total Price: {totalPrice}</h2>
        <button disabled={!cart.length} className="btn bg-orange-400 px-8 font-bold">
          <Link to='/dashboard/payment'>Pay</Link>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item, i) => <tr key={item._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.email}</div>
                  </div>
                </td>
                <td>${item.price}</td>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 p-2 rounded-xl text-white"><Trash></Trash></button>
                </th>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;