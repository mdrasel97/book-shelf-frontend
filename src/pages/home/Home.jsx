import React from "react";
import Banner from "./Banner";
import ReadingStates from "./ReadingStates";
import BookClub from "./BookClub";
import { Link, useLoaderData } from "react-router";
import BookCard from "../BookCard";
import { FaArrowRightLong } from "react-icons/fa6";
import ExploreCategory from "./ExploreCategory";

const Home = () => {
  const books = useLoaderData();
  // console.log(data);
  return (
    <div>
      <Banner />
      <div className="my-10">
        <h2 className="text-3xl text-center font-semibold">Popular Books</h2>
        <p className="text-center mb-5 text-sx">
          Discover what our community is reading
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto">
          {books.map((book) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </div>
        <div className="text-center mt-12 flex items-center justify-center">
          <button className="btn btn-primary flex ">
            <Link to="/bookShelf">View All Books</Link>
            <FaArrowRightLong className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      <ReadingStates />
      <ExploreCategory></ExploreCategory>
      <BookClub />
    </div>
  );
};

export default Home;
