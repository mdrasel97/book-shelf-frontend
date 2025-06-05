import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayOut from "../rootLayOut/RootLayOut";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import Error from "../components/error/Error";
import SignUp from "../pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "signIn",
        Component: SignIn,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
