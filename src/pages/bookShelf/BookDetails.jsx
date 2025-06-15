import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";
import ReadingTracker from "../../components/ReadingTracker";
import ReviewSection from "../../components/ReviewSection";

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
    user_email,
  } = useLoaderData();
  //   console.log(data);

  const [upvote, setUpvote] = useState(0);
  // handleUpvote
  const handleUpvote = async () => {
    try {
      const res = await fetch(
        `https://book-shelf-server-phi.vercel.app/books/${_id}/upvote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await res.json();

      if (res.ok) {
        setUpvote(result.upvote);
      } else {
        toast.error(result.error || "Failed to upvote");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetch(`https://book-shelf-server-phi.vercel.app/books/${_id}`)
      .then((res) => res.json())
      .then((data) => setUpvote(data.upvoteCount))
      .catch((err) => toast.error("Error fetching upvote:", err));
  }, [_id]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 border border-blue-500 rounded-2xl shadow-lg mt-20 mb-5">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div>
            <img
              src={cover_photo}
              alt={book_title}
              className="w-full md:w-64 rounded-xl shadow-md"
            />
            {/* Like Count Display */}
            <h2 className="text-xl font-semibold mb-4">
              {upvote} interested in people
            </h2>
          </div>
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
              <p className="">Name: {user?.displayName}</p>
              <p className="">Email: {user?.email}</p>
            </div>
            <div className="mt-6">
              <ReadingTracker
                bookId={_id}
                initialStatus={reading_status}
                userEmail={user?.email}
                ownerEmail={user_email}
              />

              <button
                onClick={handleUpvote}
                //   disabled={isUpvoting}
                className={`px-4 py-2 rounded text-white ${
                  user?.email === user_email
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-red-500 cursor-pointer"
                }`}
                disabled={user?.email === user_email}
              >
                👍 Upvote
                {/* ({currentUpvotes}) */}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 border border-blue-500 rounded-2xl shadow-lg mt-5 mb-5">
        {/* ✅ Review Section */}
        <ReviewSection bookId={_id} />
      </div>
    </>
  );
};

export default BookDetails;
