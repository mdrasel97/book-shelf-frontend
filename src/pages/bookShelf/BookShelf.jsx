import React, { useState } from "react";
import { useLoaderData } from "react-router";
import BookCard from "../BookCard";

const BookShelf = () => {
  const books = useLoaderData();

  // State for search text
  const [searchText, setSearchText] = useState("");

  // State for reading status filter
  const [statusFilter, setStatusFilter] = useState("");

  // Filter books based on searchText and statusFilter
  const filteredBooks = books.filter((book) => {
    // Check if book_title or book_author matches search text (case-insensitive)
    const matchesSearch =
      book.book_title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.book_author.toLowerCase().includes(searchText.toLowerCase());

    // Check if reading_status matches status filter or if no filter is applied
    const matchesStatus =
      statusFilter === "" || book.reading_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-11/12 mx-auto mt-16 pt-6">
      <title>All Books</title>
      <h2 className="text-2xl font-bold my-5 text-center">
        All Books This page{" "}
      </h2>
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-primary rounded px-3 py-2 flex-grow"
        />

        {/* Reading Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 bg-background text-foreground"
        >
          <option value="">All statuses</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

      {/* Book cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))
        ) : (
          <p className="text-center col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookShelf;
