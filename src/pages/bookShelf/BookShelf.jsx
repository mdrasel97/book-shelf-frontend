import React from "react";
import { useLoaderData } from "react-router";
import BookCard from "../BookCard";

const BookShelf = () => {
  const books = useLoaderData();
  // console.log(books);
  return (
    <div>
      {/* <div>
      <h2></h2>
      <p></p>
    </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-11/12 mx-auto">
        {books.map((book) => (
          <BookCard key={book._id} book={book}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
