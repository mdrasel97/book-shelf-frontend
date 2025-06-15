import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ReviewForm = ({ bookId }) => {
  const { user } = useContext(AuthContext);
  const [existingReview, setExistingReview] = useState(null);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const token = user?.accessToken;
    if (user && bookId) {
      fetch(
        `https://book-shelf-server-phi.vercel.app/my-review/${bookId}?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data._id) {
            setExistingReview(data);
            setRating(data.rating?.toString() || "5");
            setComment(data.comment || "");
          }
        });
    }
  }, [user, bookId]);

  const handleReview = async (e) => {
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
      // Update existing review
      fetch(
        `https://book-shelf-server-phi.vercel.app/reviews/${existingReview._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookReview),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Review updated:", data);
          // setExistingReview({ ...existingReview, ...bookReview });
          setExistingReview({ ...bookReview, _id: existingReview._id });
        });
    } else {
      // Create new review
      fetch("https://book-shelf-server-phi.vercel.app/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...bookReview, createdAt: new Date() }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Review created:", data);
          // setExistingReview(data);
          setExistingReview({ ...bookReview, _id: data.insertedId });
          toast.success("Review submitted!");
        });
    }

    // Reset form state
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
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded p-2"
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
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {existingReview ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
