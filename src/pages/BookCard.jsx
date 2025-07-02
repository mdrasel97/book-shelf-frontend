import { ArrowUp, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  //   console.log(book);
  const {
    _id,
    book_title,
    cover_photo,
    book_author,
    book_category,
    reading_status,
    upvoteCount,
  } = book;

  const getStatusColor = (status) => {
    switch (status) {
      case "Read":
        return "bg-green-100 text-green-800";
      case "Reading":
        return "bg-blue-100 text-blue-800";
      case "Want-to-Read":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Fiction":
        return "bg-purple-100 text-purple-800";
      case "Non-Fiction":
        return "bg-orange-100 text-orange-800";
      case "Fantasy":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="rounded-xl border border-primary my-5 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img
          src={cover_photo}
          alt={book_title}
          className="w-[98%] mx-auto rounded-lg h-58 object-content"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              book_category
            )}`}
          >
            {book_category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              reading_status
            )}`}
          >
            {reading_status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{book_title}</h3>
        <div className="flex items-center mb-4">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm">{book_author}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-primary hover:text-green-700 transition-colors">
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm font-medium">{upvoteCount}</span>
            </button>
          </div>

          <Link
            to={`/bookDetails/${_id}`}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
