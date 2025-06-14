import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
// import logoImg from "../../assets/logo.png";
import { ModeToggle } from "../ui/mode-toggle";
import { BookOpen } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"bookShelf"}>Book shelf </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"addBook"}>Add Book </NavLink>
          </li>
          <li>
            <NavLink to={"myBooks"}>My Books </NavLink>
          </li>
          <li>
            <NavLink to={"profile"}>Profile </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-black shadow z-50 lg:container mx-auto">
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* <img className="w-10" src={logoImg} alt="" /> */}
            <div>
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <Typewriter
                  words={["Book Shelf", "Virtual Bookshelf"]}
                  loop={0}
                  // cursor
                  // cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-3">
          <ModeToggle />
          {user ? (
            <button onClick={handleSignOut} className="btn">
              Log Out
            </button>
          ) : (
            <>
              <Link to={"/signIn"} className="btn border border-primary">
                Sign In
              </Link>
              <Link to={"/signUp"} className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
