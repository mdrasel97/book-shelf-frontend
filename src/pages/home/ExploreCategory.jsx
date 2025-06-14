import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExploreCategory = () => {
  const [summary, setSummary] = useState({
    totalBooks: 0,
    booksByCategory: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/books-summary")
      .then((res) => {
        console.log("Summary data:", res.data); // ✅ Debug
        setSummary(res.data);
      })
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00C49F",
    "#ff6384",
    "#36a2eb",
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        Total Books: {summary.totalBooks}
      </h2>

      <h3 className="text-xl font-semibold mb-4">Books by Category</h3>

      {summary.booksByCategory.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={summary.booksByCategory}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
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
      ) : (
        <p>Loading or no category data found.</p>
      )}
    </div>
  );
};

export default ExploreCategory;
