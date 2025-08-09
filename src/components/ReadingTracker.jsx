import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ReadingTracker = ({
  bookId,
  initialStatus,
  ownerEmail,
  onStatusChange,
}) => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [status, setStatus] = useState(initialStatus);
  const isOwner = userEmail === ownerEmail;

  const handleStatusChange = async () => {
    if (!isOwner) return;

    let nextStatus;
    if (status === "Want-to-Read") nextStatus = "Reading";
    else if (status === "Reading") nextStatus = "Read";
    else return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `http://localhost:5000/books/${bookId}/reading-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentStatus: status }),
        }
      );

      const data = await response.json();

      if (response.ok && data.updatedStatus) {
        setStatus(data.updatedStatus);
        onStatusChange && onStatusChange(data.updatedStatus); // Optional callback
        toast.success("Reading status updated!");
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <p className="text-sm">
        <span className="font-semibold">Reading Status:</span>{" "}
        <span
          className={`font-bold ${
            status === "Want-to-Read"
              ? "text-yellow-600"
              : status === "Reading"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {status}
        </span>
      </p>

      {isOwner && status !== "Read" && (
        <button
          onClick={handleStatusChange}
          className="mt-2 px-4 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Mark as {status === "Want-to-Read" ? "Reading" : "Read"}
        </button>
      )}
    </div>
  );
};

export default ReadingTracker;
