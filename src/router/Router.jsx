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
import UpdateBooks from "../pages/myBooks/UpdateBooks";
import Loading from "../components/Loading";
import EditProfile from "../pages/profile/EditProfile";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () =>
          fetch("https://book-shelf-server-phi.vercel.app/popular-books"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "bookShelf",
        Component: BookShelf,
        loader: () => fetch("https://book-shelf-server-phi.vercel.app/books"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      // {
      //   path: "/category/:categoryName",
      //   Component: CategoryBook,
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://book-shelf-server-phi.vercel.app/books ${params.categoryName}`
      //     ),
      // },
      {
        path: "bookDetails/:id",
        Component: BookDetails,
        loader: ({ params }) =>
          fetch(`https://book-shelf-server-phi.vercel.app/books/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
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
        path: "updateBook/:id",
        element: (
          <PrivateRoute>
            <UpdateBooks></UpdateBooks>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://book-shelf-server-phi.vercel.app/books/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
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
        path: "editProfile",
        element: (
          <PrivateRoute>
            <EditProfile></EditProfile>
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
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
