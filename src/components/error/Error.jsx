import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_qp1q7mct.json"
        style={{ height: "300px", width: "300px" }}
      />

      <h1 className="text-4xl font-bold mt-6">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-400 text-center max-w-md">
        Sorry, the page you are looking for could not be found. Please return to
        the homepage.
      </p>

      <Link
        to={"/"}
        className="mt-6 px-6 py-2 bg-primary hover:bg-green-700 text-white rounded-xl transition-all duration-300"
      >
        🔙 Return to homepage
      </Link>
    </motion.div>
  );
};

export default Error;
