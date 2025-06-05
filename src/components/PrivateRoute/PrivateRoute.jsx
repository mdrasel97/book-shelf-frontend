import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { pathname } = useLocation();
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (!user || !user?.email) {
    return <Navigate state={{ from: pathname }} to={"/login"}></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
