import axios from "axios";
import React, { useEffect, useState } from "react";

const ExploreCategory = () => {
  const [categoryBooks, setCategoryBooks] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all_category");
        setCategoryBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="p-4 space-y-10">
      {Object.entries(categoryBooks).map(([category, books]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category} Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book._id} className="border rounded-lg p-4 shadow-md">
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h3 className="text-xl font-semibold">{book.book_title}</h3>
                <p className="text-sm text-gray-600">
                  Author: {book.book_author}
                </p>
                <p className="text-sm text-gray-500">
                  Pages: {book.total_page}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreCategory;
