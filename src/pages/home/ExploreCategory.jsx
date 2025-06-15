import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExploreCategory = () => {
  const [categories, setCategories] = useState({
    totalBooks: 0,
    booksByCategory: [],
  });

  // console.log(categories.booksByCategory);

  useEffect(() => {
    axios
      .get("https://book-shelf-server-phi.vercel.app/books-summary")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
      },
    }),
  };

  return (
    <motion.section
      className="py-16"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
          <p className="text-lg">Find your next favorite book by genre</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.booksByCategory.map((category, index) => {
            const IconComponent = category.icon || null;

            return (
              <motion.div
                key={category._id || index}
                className="group cursor-pointer"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="border border-blue-600  rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`${
                          category.color || "bg-blue-500"
                        } p-4 rounded-full`}
                      >
                        {IconComponent && (
                          <IconComponent className="h-8 w-8 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {category.category}
                    </h3>
                    <p className=" mb-4">
                      {category.description || "Explore books in this category"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {category.count?.toLocaleString() || 0} books
                      </span>
                      <span className="btn btn-primary transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ExploreCategory;
