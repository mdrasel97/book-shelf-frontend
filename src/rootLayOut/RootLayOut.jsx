import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../components/footer/Footer";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const RootLayOut = () => {
  const { loading } = useContext(AuthContext);

  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="md:min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayOut;
