import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { Link } from "react-router";
import { FaPenFancy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const MyBooks = () => {
  const { user, loading } = useContext(AuthContext);
  const [listingLoading, setListingLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const email = user?.email;
    if (!email) return;
    // setLoading(true);
    setListingLoading(true);

    fetch(`http://localhost:3000/my-books/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        // setLoading(false);
        setListingLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        // setLoading(false);
        setListingLoading(false);
      });
  }, [user, setListingLoading]);
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 w-11/12 mx-auto">My Books</h2>
      {listingLoading && <Loading />}
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : listings.length === 0 ? (
        <p className="w-full min-h-screen mx-auto text-center">
          No Books found.
        </p>
      ) : (
        <div className="w-10/12 mx-auto overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Availability</th>
                <th>Book Page</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item, index) => (
                // <div className="overflow-x-auto">
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.cover_photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.book_title}</div>
                        <div className="text-sm opacity-50">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <span className="badge badge-ghost badge-sm">
                      {item.reading_status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xl font-semibold">
                      {" "}
                      {item.total_page}
                    </span>
                  </td>
                  <th className="space-x-2 flex">
                    <Link
                      to={`/updatedRoommate/${item._id}`}
                      className="btn btn-primary"
                    >
                      <FaPenFancy size={25} />
                    </Link>
                    <button
                      // onClick={() => handleDelete(item._id)}
                      className="btn btn-primary"
                    >
                      <MdDelete size={25} />
                    </button>
                  </th>
                </tr>
                // </div>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
