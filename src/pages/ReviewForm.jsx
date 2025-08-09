// components/ReviewForm.jsx

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ReviewForm = ({ bookId, reviews, setReviews }) => {
  const { user } = useContext(AuthContext);
  const existingReview = reviews.find(
    (r) => r.user_email === user?.email && r.book_id === bookId
  );

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating?.toString() || "5");
      setComment(existingReview.comment || "");
    } else {
      setRating("5");
      setComment("");
    }
  }, [existingReview]);

  const handleReview = (e) => {
    e.preventDefault();

    const bookReview = {
      rating,
      comment,
      book_id: bookId,
      user_email: user?.email,
      user_name: user?.displayName,
      updatedAt: new Date(),
    };

    if (existingReview) {
      fetch(`http://localhost:5000/reviews/${existingReview._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookReview),
      })
        .then((res) => res.json())
        .then(() => {
          const updated = reviews.map((r) =>
            r._id === existingReview._id ? { ...r, ...bookReview } : r
          );
          setReviews(updated);
          toast.success("Review updated!");
        });
    } else {
      fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...bookReview, createdAt: new Date() }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newReview = { ...bookReview, _id: data.insertedId };
          setReviews([newReview, ...reviews]);
          toast.success("Review submitted!");
        });
    }

    // Reset fields
    setRating("5");
    setComment("");
  };

  if (!user)
    return <p className="text-red-500">Please login to write a review.</p>;

  return (
    <form onSubmit={handleReview} className="mt-8">
      <h3 className="text-xl font-bold mb-2">
        {existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>

      <div className="mb-2">
        <label className="block mb-1">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded p-2 bg-background text-foreground"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-primary rounded p-2"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {existingReview ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
