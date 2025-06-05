import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <div className="w-full max-w-md p-8 mx-auto my-5 space-y-3 rounded-xl border border-primary mt-20">
      <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
      <form
        // onSubmit={handleSignIn}
        className="space-y-6"
      >
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
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border focus:dark:border-primary"
          />
          <div className="flex justify-end text-xs mt-3 dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-primary">
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          // onClick={handleGoogleSignIn}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
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
