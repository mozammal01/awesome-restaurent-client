import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import Theme from "../../../Theme";
import { ShoppingCart } from "lucide-react";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {

  const { user, logOut } = useAuth();

  const [isAdmin] = useAdmin();

  const [cart] = useCart();

  // 
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(err => {
        console.error(err);
      })
  }

  const NavLinks = <>
    <div className="gap-5 flex items-center justify-end">
      <NavLink to="/"><li>Home</li></NavLink>
      <NavLink to="/contuctUs"><li>Contuct Us</li></NavLink>
      <NavLink to="/order/dessert"><li>Order</li></NavLink>
      <NavLink to="/menu"><li>Our Menu</li></NavLink>
      {/* {
        user ? isAdmin ? <NavLink to="/dashboard/adminHome"><li>Dashboard</li></NavLink> :
          <NavLink to="/dashboard/userHome"><li>Dashboard</li></NavLink> : ''
      } */}

      {
        user && isAdmin && <NavLink to="/dashboard/adminHome"><li>Dashboard</li></NavLink>
      }
      {
        user && !isAdmin && <NavLink to="/dashboard/userHome"><li>Dashboard</li></NavLink>
      }

      <NavLink to="/dashboard/cart"><li><button className="btn btn-outline text-white">
        <ShoppingCart />
        <div className="badge badge-secondary">+{cart?.length || 0}</div>
      </button></li></NavLink>

    </div>
  </>
  return (
    <div className="navbar max-w-screen-xl bg-black bg-opacity-50 text-white fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold">
            {NavLinks}
          </ul>
        </div>
        <Link to='/' className="ml-8">
          <span>
            <p className="font-semibold text-lg">Awesome</p>
            <p className="text-lg my-[-8px]">Restaurant</p>
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold">
          {NavLinks}
        </ul>
        <div className="gap-6 flex items-center">
          {/* <Theme></Theme> */}
          {
            user ?
              <>
                <p>{user?.displayName}</p>
                <button onClick={handleLogOut} className="btn">Log Out</button>
              </> :
              <Link to='/login'><p className="btn">Login</p></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;