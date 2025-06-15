import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const token = user.accessToken;
  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { ...restBookData } = Object.fromEntries(formData.entries());
    // console.log(data);

    // const BooksInfo = {
    // bookData,
    //
    // };
    const userProfile = {
      email: user?.email,
      name: user?.displayName,
      ...restBookData,
    };

    // mongodb add book
    fetch("https://book-shelf-server-phi.vercel.app/books", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate(`${location.state ? location.state : "/bookShelf"}`);
      });
  };
  return (
    <div className="min-h-screen p-6 flex items-center justify-center mt-16">
      <div className="max-w-4xl w-full border border-blue-500 rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">
          Add a Book
        </h2>
        <form onSubmit={handleAddBook} className="">
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
                className="p-3 rounded border border-blue-500"
                required
              />
            </div>

            {/* category  */}
            <div className="flex flex-col">
              <label htmlFor="book_category" className="mb-1 text-sm">
                Book Category
              </label>
              <select
                id="book_category"
                name="book_category"
                className="p-3 rounded border border-blue-500 bg-background text-foreground"
                required
              >
                <option value="">Select Book Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>

            {/* reading status  */}
            <div className="flex flex-col">
              <label htmlFor="reading_status" className="mb-1 text-sm">
                Reading Status
              </label>
              <select
                id="reading_status"
                name="reading_status"
                className="p-3 rounded border border-blue-500 bg-background text-foreground"
                required
              >
                <option value="">Select Reading Status</option>
                <option value="Read">Read</option>
                <option value="Reading">Reading</option>
                <option value="Want-to-Read">Want to Read</option>
              </select>
            </div>

            {/* User email (Read-only) */}
            <div className="flex flex-col">
              <label htmlFor="user_email" className="mb-1 text-sm">
                Your Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                className="p-3 rounded border border-blue-500"
                defaultValue={user?.email}
                readOnly
              />
            </div>

            {/* User name (Read-only) */}
            <div className="flex flex-col">
              <label htmlFor="user_name" className="mb-1 text-sm">
                Your Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="p-3 rounded border border-blue-500"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col my-5">
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
    </div>
  );
};

export default AddBook;
