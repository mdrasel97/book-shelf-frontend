// components/ReviewList.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ReviewList = ({ reviews, setReviews }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://book-shelf-server-phi.vercel.app/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remaining = reviews.filter((r) => r._id !== id);
              setReviews(remaining);
              Swal.fire("Deleted!", "Your review has been deleted.", "success");
            }
          });
      }
    });
  };

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
            By: {review.user_name || "Anonymous"}
          </p>
          {user?.email === review.user_email && (
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
