import React from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.init";

const EditProfile = () => {
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("✅ Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("❌ Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={auth.currentUser?.displayName || ""}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Photo URL</label>
          <input
            type="text"
            name="photo"
            required
            defaultValue={auth.currentUser?.photoURL || ""}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
