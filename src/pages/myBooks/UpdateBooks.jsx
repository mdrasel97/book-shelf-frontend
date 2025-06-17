import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateBooks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
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

  const token = user.accessToken;
  // console.log(token);

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { ...restUpdate } = Object.fromEntries(formData.entries());
    // console.log(restUpdate);
    fetch(`https://book-shelf-server-phi.vercel.app/books/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restUpdate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update listing");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Book Has Been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate(`${location.state ? location.state : "/myBooks"}`);
      });
  };
  return (
    <div className="min-h-screen p-6 flex items-center justify-center mt-16">
      <title>update book || bookShelf</title>
      <div className="max-w-4xl w-full border border-primary rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-primary text-center">
          Update a Book
        </h2>
        <form onSubmit={handleUpdateBook} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="book_title" className="mb-1 text-sm">
                Book Title
              </label>
              <input
                type="text"
                id="book_title"
                name="book_title"
                className="p-3 rounded border border-primary"
                defaultValue={book_title}
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
                className="p-3 rounded border border-primary"
                defaultValue={cover_photo}
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
                className="p-3 rounded border border-primary"
                defaultValue={total_page}
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
                className="p-3 rounded border border-primary"
                defaultValue={book_author}
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
                className="p-3 rounded border border-primary bg-background text-foreground"
                defaultValue={book_category}
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
                className="p-3 rounded border border-primary bg-background text-foreground"
                defaultValue={reading_status}
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
                className="p-3 rounded border border-primary"
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
                className="p-3 rounded border border-primary"
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
              rows="4"
              className="p-3 rounded border border-primary"
              defaultValue={book_overview}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-green-700"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooks;
