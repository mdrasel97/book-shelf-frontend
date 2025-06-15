import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [summary, setSummary] = useState({
    totalBooks: 0,
    booksByCategory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await user.getIdToken(); // Firebase Token
        const res = await axios.get(
          `https://book-shelf-server-phi.vercel.app/profile-summary/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    if (user?.email) fetchData();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!summary)
    return <div className="text-center mt-10 text-red-500">No data found</div>;

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">👤 Profile Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="border border-blue-600 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 mb-4 shadow"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="">{user.email}</p>

          <Link className="btn btn-primary mt-2" to={"/editProfile"}>
            Edit Profile
          </Link>
        </div>

        {/*  Bookshelf Summary */}
        <div className="border border-blue-600 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📚 Bookshelf Summary</h3>
          <p className="mb-2">
            Total Books:{" "}
            <span className="font-bold text-indigo-600">
              {summary.totalBooks}
            </span>
          </p>
          <ul className="list-disc list-inside space-y-1">
            {summary.booksByCategory.map(({ category, count }) => (
              <li key={category}>
                {category}:{" "}
                <span className="font-bold text-green-600">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-10 mb-5 border border-blue-500 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          📊 Category Distribution
        </h3>
        <div className="flex justify-center">
          <PieChart width={350} height={350}>
            <Pie
              data={summary.booksByCategory}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {summary.booksByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Profile;
