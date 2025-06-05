import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayOut from "../rootLayOut/RootLayOut";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";

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
    ],
  },
]);
