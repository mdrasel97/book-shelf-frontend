import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-16 mt-16"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Virtual Bookshelf
      </motion.h1>

      <motion.p className="text-lg leading-7 mb-6">
        Virtual Bookshelf is an online platform where you can easily track the
        books you have read, want to read, and are working on. We believe that
        reading is a wonderful habit - and our goal is to make this habit more
        productive and enjoyable.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-10"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div
          className="border border-primary p-6 rounded-2xl shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-primary">
            📖 Book Management
          </h2>
          <p className="">
            You can keep your read, wanted to read, and ongoing books separate
            with status.
          </p>
        </motion.div>

        <motion.div
          className="border border-primary p-6 rounded-2xl shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-primary">
            🌟 Reviews and ratings
          </h2>
          <p className="">
            You can help others by adding your reviews and ratings for each
            book.
          </p>
        </motion.div>
      </motion.div>

      <motion.p className="text-center text-sm mt-12">
        Made with ❤️ by the Virtual Bookshelf Team
      </motion.p>
    </motion.div>
  );
};

export default About;
