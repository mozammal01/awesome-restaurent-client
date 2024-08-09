import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {

  const { name, recipe, image, price, _id } = item;

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();


  const handleAddToCart = () => {
    if (user) {
      // Sent item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('carts', cartItem)
        .then(data => {
          console.log(data.data);
          if (data.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} Added Successfull`,
              showConfirmButton: false,
              timer: 1500
            });
            // Refetch cart to update the cart items count
            refetch();
          }
        })
    }
    else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login"
      }).then((result) => {
        if (result.isConfirmed) {
          // Send the user to the login page
          navigate('/login', { state: { from: location } })
        }
      });
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-xl text-center">
      <figure>
        <img
          src={image}
          alt="Shoes" />
      </figure>
      <p className="bg-black p-2 text-white absolute right-5 top-5 rounded-xl">${price}</p>
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p>{recipe}</p>
        <div>
          <Button
            onClick={handleAddToCart}
            className='border-orange-500 bg-slate-100 text-orange-500 hover:text-orange-500 hover:border-orange-500' btnText='Add to Cart'></Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;