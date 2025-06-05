import React from "react";
import { Link, NavLink } from "react-router";
// import logoImg from "../../assets/logo.png";
import { ModeToggle } from "../ui/mode-toggle";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"bookShelf"}>Book shelf </NavLink>
      </li>
    </>
  );
  return (
    <nav>
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
          <div className="flex justify-center">
            {/* <img className="w-10" src={logoImg} alt="" /> */}
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold">Book Shelf</h2>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-3">
          <ModeToggle />
          <Link to={"/signIn"} className="btn border border-primary">
            Sign In
          </Link>
          <Link className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
