import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";

const RootLayOut = () => {
  return (
    <div className="md:container mx-auto">
      <Navbar />
      <div className="md:min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayOut;
