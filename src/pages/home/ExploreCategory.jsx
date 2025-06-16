import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const categoryImages = [
  { url: "https://i.ibb.co/TxvnwYqH/pexels-pixabay-237371.jpg" },
  {
    url: "https://i.ibb.co/W4wts2h0/682b5d8db788081a9e0a8071-dda56e97-09d0-431c-a2e5-2f7eac126b3c.jpg",
  },
  {
    url: "https://i.ibb.co/xKzSWykB/682b5d8d9aa44d3871f2a188-d0fae16e-4070-43f5-909b-515558c3a90c.jpg",
  },
];

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
          <p className="text-lg">Find your next favorite book by generate</p>
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
                <div className="border border-primary  rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={categoryImages[index % categoryImages.length].url}
                      alt={`Category ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {categories.booksByCategory.map((category, index) => {
                      const image =
                        categoryImages[index % categoryImages.length];
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
                          <div className="border border-primary rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={image.url}
                                alt={`Category ${index + 1}`}
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
                              <p className="mb-4">
                                {category.description ||
                                  "Explore books in this category"}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  {category.count?.toLocaleString() || 0} books
                                </span>
                                <span className="btn bg-primary text-white border-primary transition-colors">
                                  Explore →
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

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
                      <span className="btn bg-primary text-white border-primary transition-colors">
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
