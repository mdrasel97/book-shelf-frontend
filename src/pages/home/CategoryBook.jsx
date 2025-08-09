import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/books/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{categoryName} Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <img
              src={book.cover_photo}
              alt={book.book_title}
              className="mb-2 w-full h-60 object-cover"
            />
            <h2 className="font-bold">{book.book_title}</h2>
            <p>{book.book_author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
