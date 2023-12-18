import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../assets/images/Galaxy Luxury Hotel Logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success!", "Logged out successfully!", "success");
        navigate("/");
      })
      .catch((err) => {
        Swal.fire("Failed", err.message, "error");
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-[#AA8453]" : "")}
          style={{ fontWeight: "600", fontSize: "18px" }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) => (isActive ? "text-[#AA8453]" : "")}
          style={{ fontWeight: "600", fontSize: "18px" }}
        >
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "text-[#AA8453]" : "")}
          style={{ fontWeight: "600", fontSize: "18px" }}
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        {user ? (
          <NavLink
            to="/my-rooms"
            className={({ isActive }) =>
              isActive ? "text-[#AA8453] text-xl font-semibold" : ""
            }
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            My Rooms
          </NavLink>
        ) : (
          ""
        )}
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar container mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link to="/">
              <img className="w-[110px]" src={logo} alt="" />
            </Link>
            <div className="flex-none hidden lg:block">
              <ul className="flex gap-5">
                {/* Navbar menu content here */}
                {navItems}
              </ul>
            </div>
            {user ? (
              <div className="navbar-end">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img referrerPolicy="no-referrer" src={user.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="
                    z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>{user.displayName}</a>
                    </li>
                    <button onClick={handleLogOut}>
                      <li>
                        <a>Logout</a>
                      </li>
                    </button>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="navbar-end">
                <Link
                  to="/login"
                  className="btn border-none bg-[#AA8453] text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Page content here */}
          <div className="bg-base=200 container mx-auto px-8 md:px-16 lg:px-24">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className=" p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {navItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
