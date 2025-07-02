// // pages/CategoryBooks.jsx
// import { useLoaderData, useParams } from "react-router";

// const CategoryBook = () => {
//   const category = useLoaderData();
//   console.log(category);
//   const { categoryName } = useParams();
//   //   const [books, setBooks] = useState([]);

//   //   useEffect(() => {
//   //     axios
//   //       .get(
//   //         `https://book-shelf-server-phi.vercel.app/books/books-summary/${categoryName}`
//   //       )
//   //       .then((res) => setBooks(res.data))
//   //       .catch((err) => toast.error(err));
//   //   }, [categoryName]);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Books in "categoryName"</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* {books.map((book, index) => (
//           <div key={index} className="shadow-lg rounded-xl p-4 bg-white">
//             <img
//               src={book.cover_photo}
//               alt={book.book_title}
//               className="w-full h-52 object-cover rounded-md"
//             />
//             <h3 className="text-lg font-semibold mt-3">{book.book_title}</h3>
//             <p className="text-gray-500 text-sm italic">{book.book_author}</p>
//             <p className="text-sm mt-2">{book.book_overview}</p>
//           </div>
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default CategoryBook;
