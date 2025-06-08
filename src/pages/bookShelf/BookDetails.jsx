import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    book_title,
    book_overview,
    cover_photo,
    total_page,
    book_author,
    book_category,
    reading_status,
  } = useLoaderData();
  //   console.log(data);
  return (
    <div className="max-w-4xl mx-auto p-6 border border-blue-500 rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={cover_photo}
          alt={book_title}
          className="w-full md:w-64 rounded-xl shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{book_title}</h2>
          <p className="text-lg  mb-2">
            <span className="font-semibold">Author:</span> {book_author}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Total Pages:</span> {total_page}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {book_category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Reading Status:</span>{" "}
            {reading_status}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-1">Overview:</h3>
            <p className="">{book_overview}</p>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold">Reader Info:</h4>
            <p className="">Name: {user.displayName}</p>
            <p className="">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
