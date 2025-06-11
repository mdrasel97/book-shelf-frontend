import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 Profile Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 mb-4"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Bookshelf Summary */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">📚 Bookshelf Summary</h3>
          <p className="mb-2">
            Total Books:{" "}
            <span className="font-bold">{/* {bookshelf.totalBooks} */}</span>
          </p>
          {/* <ul className="list-disc list-inside space-y-1">
            {bookshelf.booksByCategory.map((cat, index) => (
              <li key={index}>
                {cat._id}: <span className="font-bold">{cat.count}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow mt-8 p-6">
        <h3 className="text-lg font-semibold mb-4">📊 Books by Category</h3>
        <div className="flex justify-center">
          <PieChart width={350} height={350}>
            <Pie
              // data={bookshelf.booksByCategory}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {/* {bookshelf.booksByCategory.map((entry, index) => ( */}
              <Cell key={`cell-`} fill={COLORS[COLORS.length]} />
              {/* ))} */}
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
