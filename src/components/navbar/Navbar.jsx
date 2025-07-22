import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { BookOpen } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/bookShelf"}>Book shelf </NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About </NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/addBook"}>Add Book </NavLink>
          </li>
          <li>
            <NavLink to={"/myBooks"}>My Books </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/profile"}>Profile </NavLink>
          </li> */}
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
        navigate(`${"/"}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <nav className="fixed  dark:bg-black bg-white  border top-0 w-full shadow z-50  mx-auto">
      <div className="navbar shadow-sm mx-auto w-[98%]">
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
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-background text-foreground space-y-3"
            >
              {links}
              {user ? (
                <></>
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
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* <img className="w-10" src={logoImg} alt="" /> */}
            <div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-md md:text-2xl font-bold">
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
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-12 w-12 border-2 border-primary rounded-full">
                    {" "}
                    {/* default size is usually h-10 w-10 */}
                    <AvatarImage
                      src={user?.photoURL || ""}
                      alt="User"
                      className="h-16 w-16 object-cover"
                    />
                    <AvatarFallback className="text-xl">
                      {user?.displayName?.slice(0, 1).toUpperCase() || "NA"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      onClick={handleSignOut}
                      className="btn hidden md:flex"
                    >
                      Log Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <button onClick={handleSignOut} className="btn hidden md:flex">
                Log Out
              </button> */}
            </>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link to={"/signIn"} className="btn border border-primary">
                Sign In
              </Link>
              <Link
                to={"/signUp"}
                className="btn bg-primary border-primary text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
