import React from "react";

const AddBook = () => {
  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // mongodb add book
    fetch("");
  };
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <form
        onSubmit={handleAddBook}
        className="max-w-4xl w-full border border-blue-500 rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          Add a Book
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="book_title" className="mb-1 text-sm">
              Book Title
            </label>
            <input
              type="text"
              id="book_title"
              name="book_title"
              //   value={book.book_title}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cover_photo" className="mb-1 text-sm">
              Cover Photo URL
            </label>
            <input
              type="text"
              id="cover_photo"
              name="cover_photo"
              //   value={book.cover_photo}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="total_page" className="mb-1 text-sm">
              Total Pages
            </label>
            <input
              type="number"
              id="total_page"
              name="total_page"
              //   value={book.total_page}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="book_author" className="mb-1 text-sm">
              Book Author
            </label>
            <input
              type="text"
              id="book_author"
              name="book_author"
              //   value={book.book_author}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="book_category" className="mb-1 text-sm">
              Book Category
            </label>
            <input
              type="text"
              id="book_category"
              name="book_category"
              //   value={book.book_category}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="reading_status" className="mb-1 text-sm">
              Reading Status
            </label>
            <select
              id="reading_status"
              name="reading_status"
              //   value={book.reading_status}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            >
              <option value="">Select Reading Status</option>
              <option value="Read">Read</option>
              <option value="Reading">Reading</option>
              <option value="Want-to-Read">Want to Read</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="user_email" className="mb-1 text-sm">
              Your Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              //   value={book.user_email}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="user_name" className="mb-1 text-sm">
              Your Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              //   value={book.user_name}
              //   onChange={handleChange}
              className="p-3 rounded border border-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="book_overview" className="mb-1 text-sm">
            Book Overview
          </label>
          <textarea
            id="book_overview"
            name="book_overview"
            // value={book.book_overview}
            // onChange={handleChange}
            rows="4"
            className="p-3 rounded border border-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400"
        >
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
