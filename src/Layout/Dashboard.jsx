import { Book, CalendarCheck, CalendarRange, Contact, HomeIcon, House, Menu, MessageCircleHeart, ShoppingBag, ShoppingCart, User, Utensils, Wallet } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [cart] = useCart();

  const { user, loading } = useAuth();

  const [isAdmin] = useAdmin({ enabled: !loading && !!user?.email, user });

  return (
    <div className="flex">

      {/* Dashboard Side bar */}
      <div className="w-60 min-h-screen bg-orange-400">

        <ul className="menu space-y-2 w-11/12 mx-auto font-bold mt-20">

          {
            isAdmin ?
              <>
                <li>
                  <NavLink to='/dashboard/adminHome'>
                    <House strokeWidth={2.75} />
                    Admin Home</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/addItems'>
                    <Utensils />
                    Add Items</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/manageItems'>
                    <Menu strokeWidth={2.75} />
                    Manage Items</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/bookings'>
                    <Book></Book>
                    Manage Bookings</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/users'>
                    <User></User>
                    All Users</NavLink>
                </li>

              </>
              :
              <>
                <li>
                  <NavLink to='/dashboard/userHome'>
                    <House strokeWidth={2.75} />
                    User Home</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/reservation'>
                    <CalendarRange strokeWidth={2.50} />
                    Reservation</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/paymentHistory'>
                    <Wallet strokeWidth={2.75}></Wallet>
                    Payment History</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/cart'>
                    <ShoppingCart strokeWidth={2.75}></ShoppingCart>
                    My Cart ({cart.length})</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/addReview'>
                    <MessageCircleHeart strokeWidth={2.75} />
                    Add Review</NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/myBooking'>
                    <CalendarCheck strokeWidth={2.75} />
                    My Booking</NavLink>
                </li></>
          }

          {/* Shared Items */}
          {/* Divider */}
          <div className="divider divider-neutral"></div>

          <li>
            <NavLink to='/'>
              <HomeIcon></HomeIcon>
              Home</NavLink>
          </li>

          <li>
            <NavLink to='/menu'>
              <Menu></Menu>
              Menu</NavLink>
          </li>

          <li>
            <NavLink to='/order'>
              <ShoppingBag></ShoppingBag>
              Shop</NavLink>
          </li>

          <li>
            <NavLink to='/contact'>
              <Contact></Contact>
              Contact Us</NavLink>
          </li>
        </ul>

      </div>

      {/* Dashboard Element */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default Dashboard;