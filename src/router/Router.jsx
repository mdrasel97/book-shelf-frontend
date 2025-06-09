import { createBrowserRouter } from "react-router";
import RootLayOut from "../rootLayOut/RootLayOut";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import Error from "../components/error/Error";
import SignUp from "../pages/auth/SignUp";
import BookShelf from "../pages/bookShelf/BookShelf";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AddBook from "../pages/addBook/AddBook";
import MyBooks from "../pages/myBooks/MyBooks";
import Profile from "../pages/profile/Profile";
import BookDetails from "../pages/bookShelf/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () => fetch("http://localhost:3000/popular-books"),
      },
      {
        path: "bookShelf",
        Component: BookShelf,
        loader: () => fetch("http://localhost:3000/books"),
      },
      {
        path: "bookDetails/:id",
        Component: BookDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/books/${params.id}`),
      },
      {
        path: "addBook",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "myBooks",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
