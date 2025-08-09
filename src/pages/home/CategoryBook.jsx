import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    fetch(
      `https://book-shelf-server-phi.vercel.app/books/category/${categoryName}`
    )
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-16 w-11/12 mx-auto">
      <h1 className="text-2xl font-bold mb-4 pt-10">{categoryName} Books</h1>
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
