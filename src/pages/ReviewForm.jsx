import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ReviewForm = ({ bookId }) => {
  // console.log(bookId);
  const { user } = useContext(AuthContext);
  const [existingReview, setExistingReview] = useState(null);

  const handleReview = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { ...restData } = Object.fromEntries(formData.entries());
    // console.log(restData);
    const bookReview = {
      ...restData,
      book_id: bookId,
      user_email: user?.email,
      user_name: user?.displayName,
      createdAt: new Date(),
    };

    // review data for mongodb
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExistingReview(bookReview);
        // Reset form
        form.reset();
      });
  };

  if (!user)
    return <p className="text-red-500">Please login to write a review.</p>;

  return (
    <form onSubmit={handleReview} className="mt-8">
      <h3 className="text-xl font-bold mb-2">
        {existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>

      {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}

      <div className="mb-2">
        <label className="block mb-1">Rating:</label>
        <select
          name="rating"
          // defaultValue={rating}
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
          // defaultValue={comment}
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
