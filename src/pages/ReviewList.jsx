import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [existingReview, setExistingReview] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (bookId) {
      fetch(`https://book-shelf-server-phi.vercel.app/reviews/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          const found = data.find(
            (review) => review.user_email === user?.email
          );
          if (found) {
            setExistingReview(found); // এটা true বা review object হবে
          }
        })
        .catch((err) => console.error("Failed to load reviews:", err));
    }
  }, [bookId, user?.email]);

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
            console.log(data);
            if (data.deletedCount) {
              // Assuming setReviews is your state for reviews
              const remaining = reviews.filter((review) => review._id !== id);
              setReviews(remaining);

              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
              });
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
              className="mt-2 text-sm text-red-600"
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
