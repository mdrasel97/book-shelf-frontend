import React, { useState } from "react";
import { toast } from "react-toastify";

const readingSteps = ["Want-to-Read", "Reading", "Read"];

const ReadingTracker = ({ bookId, initialStatus, userEmail, ownerEmail }) => {
  const [status, setStatus] = useState(initialStatus);

  const currentIndex = readingSteps.indexOf(status);
  const nextStatus = readingSteps[currentIndex + 1];

  const handleStatusUpdate = async () => {
    if (!nextStatus) return;

    const prevStatus = status;
    setStatus(nextStatus); // Optimistic update

    try {
      const res = await fetch(
        `https://book-shelf-server-phi.vercel.app/books/${bookId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newStatus: nextStatus,
            userEmail,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        setStatus(prevStatus); // rollback on failure
        toast.error(result.error || "Status update failed");
      } else {
        toast.success("Reading status updated!");
      }
    } catch (error) {
      setStatus(prevStatus);
      toast.error(error);
    }
  };

  return (
    <div className="mt-4">
      <p className="mb-2">
        <span className="font-semibold">Reading Status:</span>{" "}
        <span className="text-blue-600">{status}</span>
      </p>

      {userEmail === ownerEmail && nextStatus && (
        <button
          onClick={handleStatusUpdate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Mark as: {nextStatus}
        </button>
      )}
    </div>
  );
};

export default ReadingTracker;
