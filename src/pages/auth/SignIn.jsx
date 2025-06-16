import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "../../components/ui/button";

const SignIn = () => {
  const { signInUser, googleLogIn, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);

    // firebase Auth
    // signInUser(email, password)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log(user);
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Your work has been saved",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate(`${location?.state ? location?.state : "/"}`);
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });

    signInUser(email, password)
      .then((result) => {
        setLoading(false);
        const user = result.user;
        toast.success("Sign In success");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setLoading(false);

        const errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          toast.error(
            "No account found with this email. Please register first."
          );
        } else if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "google signIn successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="w-full max-w-md p-10 mx-auto my-5 space-y-3 rounded-xl border border-primary mt-16 ">
      <title>Login page</title>
      <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jon@duo.com"
            className="w-full px-4 py-3 rounded-md border border-primary focus:border-primary"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-primary"
          />
          <div className="flex justify-end text-xs mt-3">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm bg-primary text-white "
          variant={"outline"}
        >
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm ">Login with social accounts</p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoogleSignIn}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
          type="button"
        >
          <FcGoogle size={25} />
        </button>
        <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
          <FaGithub size={25} />
        </button>
      </div>
      <p className="text-xs text-center sm:px-6">
        Don't have an account?
        <Link to={"/signUp"} className="underline hover:text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
