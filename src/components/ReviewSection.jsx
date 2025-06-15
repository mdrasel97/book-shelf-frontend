import { useEffect, useState } from "react";
import ReviewForm from "../pages/ReviewForm";
import ReviewList from "../pages/ReviewList";

const ReviewSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (bookId) {
      fetch(`https://book-shelf-server-phi.vercel.app/reviews/${bookId}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error("Failed to load reviews:", err));
    }
  }, [bookId]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ReviewForm bookId={bookId} reviews={reviews} setReviews={setReviews} />
      <ReviewList reviews={reviews} setReviews={setReviews} bookId={bookId} />
    </div>
  );
};

export default ReviewSection;
