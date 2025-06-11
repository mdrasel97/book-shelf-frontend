import { useEffect, useState } from "react";

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (bookId) {
      fetch(`http://localhost:3000/reviews/${bookId}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error("Failed to load reviews:", err));
    }
  }, [bookId]);

  // const handleDelete = async (id) => {
  //   await axios.delete(`/api/reviews/${id}`);
  //   fetchReviews();
  // };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((review) => (
        <div key={review._id} className="border p-4 rounded mb-4">
          <p>
            <strong>Rating:</strong> {review.rating} ★
          </p>
          <p>
            <strong>Comment:</strong> {review.comment}
          </p>
          <p className="text-sm text-gray-500">
            By: {review.user?.displayName || "Anonymous"}
          </p>
          {/* {currentUser?.id === review.user?._id && (
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-2 text-sm text-red-600"
            >
              Delete
            </button>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
