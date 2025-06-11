import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const { createUser, googleLogIn } = useContext(AuthContext);
  // const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const { email, password, ...restData } = Object.fromEntries(
  //     formData.entries()
  //   );
  //   // console.log(restData);

  //   // Password validation
  //   // if (password.length < 6) {
  //   //   setPasswordError("Password must be at least 6 characters long");
  //   //   return;
  //   // }
  //   // if (!/[A-Z]/.test(password)) {
  //   //   setPasswordError("Password must contain at least one uppercase letter");
  //   //   return;
  //   // }
  //   // if (!/[a-z]/.test(password)) {
  //   //   setPasswordError("Password must contain at least one lowercase letter");
  //   //   return;
  //   // }

  //   createUser(email, password)
  //     .then((result) => {
  //       // console.log(result);
  //       const user = result.user;
  //       const userProfile = {
  //         ...restData,
  //         email,
  //         creationTime: user?.metadata?.creationTime,
  //         lastSignInTime: user?.metadata?.lastSignInTime,
  //       };

  //       // save to my database
  //       fetch("http://localhost:3000/users", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(userProfile),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Your work has been saved",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         });
  //       navigate(`${location.state ? location.state : "/"}`);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(
      formData.entries()
    );

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // Update profile here
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            // Prepare user profile for your DB
            const userProfile = {
              name,
              email,
              photo,
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
            };

            // Save userProfile to your DB
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userProfile),
            })
              .then((res) => res.json())
              .then((data) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(location.state ? location.state : "/");
              });
          })
          .catch((error) => {
            toast.error("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="w-full max-w-md p-8 mx-auto my-5 space-y-3 rounded-xl border border-primary mt-20">
      <h1 className="text-2xl font-bold text-center">Create an Account</h1>
      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            className="w-full px-4 py-3 rounded-md border focus:border-primary"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jon@duo.com"
            className="w-full px-4 py-3 rounded-md border focus:border-primary"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="photo" className="block">
            Photo URL
          </label>
          <input
            type="text"
            name="photo"
            id="photo"
            placeholder="Photo URL"
            className="w-full px-4 py-3 rounded-md border focus:border-primary"
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
            className="w-full px-4 py-3 rounded-md border focus:border-primary"
          />
        </div>
        {/* {passwordError && (
          <div className="text-red-500 text-sm">{passwordError}</div>
        )} */}

        <div className="text-xs text-gray-600">
          Password must contain at least 6 characters, including one uppercase
          and one lowercase letter and one number.
        </div>
        <button className="block w-full p-3 text-center rounded-sm bg-primary text-white ">
          Sign Up
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="">
        <button
          onClick={handleGoogleSignUp}
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-primary"
        >
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>
        <button
          aria-label="Log in with Twitter"
          className="p-3 rounded-sm"
        ></button>
        <button
          aria-label="Log in with GitHub"
          className="p-3 rounded-sm"
        ></button>
      </div>
      <p className="text-xs text-center sm:px-6">
        Already have an account?
        <Link to={"/signIn"} className="underline hover:text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
