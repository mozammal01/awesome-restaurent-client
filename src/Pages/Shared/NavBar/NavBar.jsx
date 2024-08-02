import { Link, NavLink } from "react-router-dom";
import App from "../../../App";

const NavBar = () => {
  const NavLinks = <>
    <NavLink to="/"><li><a>Home</a></li></NavLink>
    <NavLink to="/contuctUs"><li><a>Contuct Us</a></li></NavLink>
    <NavLink to="/order"><li><a>Order</a></li></NavLink>
    <NavLink to="/menu"><li><a>Our Menu</a></li></NavLink>
    <NavLink to="/ourShop"><li><a>Our Shop</a></li></NavLink>

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
          <App></App>
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;