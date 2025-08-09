import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ReviewSection from "../../components/ReviewSection";
import ReadingTracker from "../../components/ReadingTracker";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    _id,
    book_title,
    book_overview,
    cover_photo,
    total_page,
    book_author,
    book_category,
    reading_status,
    user_email,
  } = useLoaderData();

  const [upvote, setUpvote] = useState(0);
  const [status, setStatus] = useState(reading_status); // 🔄 For dynamic update after status change

  // 📌 Fetch upvote count
  useEffect(() => {
    fetch(`http://localhost:5000/books/${_id}`)
      .then((res) => res.json())
      .then((data) => setUpvote(data.upvoteCount))
      .catch((err) => toast.error("Error fetching upvote:", err.message));
  }, [_id]);

  const handleUpvote = async () => {
    const userEmail = user?.email;

    if (!userEmail) {
      toast.error("Please login to upvote.");
      navigate("/signIn");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/books/${_id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await res.json();

      if (res.ok) {
        setUpvote(result.upvote);
        toast.success("You upvoted this book!");
      } else {
        toast.error(result.error || "Failed to upvote");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 rounded-2xl border border-primary shadow-lg mt-16 pt-5 mb-5">
        <title>Book Details</title>
        <div className="flex flex-col md:flex-row items-start gap-6 mt-18">
          <div>
            <img
              src={cover_photo}
              alt={book_title}
              className="w-full md:w-64 rounded-xl shadow-md"
            />
            {/* 👍 Like Count Display */}
            <h2 className="text-xl font-semibold mt-4">
              {upvote} people are interested
            </h2>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{book_title}</h2>
            <p className="text-lg mb-2">
              <span className="font-semibold">Author:</span> {book_author}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total Pages:</span> {total_page}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Category:</span> {book_category}
            </p>

            {/* 🔄 Reading Status */}
            <div className="mb-2">
              <ReadingTracker
                bookId={_id}
                initialStatus={status}
                ownerEmail={user_email}
                onStatusChange={(newStatus) => setStatus(newStatus)}
              />
            </div>

            {/* 📖 Overview */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-1">Overview:</h3>
              <p>{book_overview}</p>
            </div>

            {/* 👤 User Info */}
            <div className="mt-6 border-t border-gray-300 pt-4">
              <h4 className="text-lg font-semibold">Reader Info:</h4>
              <p>Name: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
            </div>

            {/* 👍 Upvote Button */}
            <div className="mt-6">
              <button
                onClick={handleUpvote}
                disabled={user?.email === user_email}
                className={`px-4 py-2 rounded text-white ${
                  user?.email === user_email
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary"
                }`}
              >
                👍 Upvote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✍️ Review Section */}
      <div className="max-w-4xl mx-auto p-6 border border-primary rounded-2xl shadow-lg mt-5 mb-10">
        <ReviewSection bookId={_id} />
      </div>
    </>
  );
};

export default BookDetails;
