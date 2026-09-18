import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { UserData } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineDashboard } from "react-icons/md";

const Account = () => {
  // ✅ FIX: useContext
  const { user, setUser, setIsAuth } = UserData();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuth(false);
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center px-4">
      {/* Card */}
      {user && (
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center relative">
          {/* Avatar */}
          <div className="flex justify-center -mt-20">
            <img
              src="https://gravatar.com/avatar/e8497d2cc49eecbaec4201d06b0f4851?s=100&d=robohash"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 bg-black border-white shadow-lg object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mt-4 text-gray-800">My Profile</h2>

          {/* User Info */}
          <div className="mt-6 space-y-3 text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Name:</span>{" "}
              {user?.name}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Email:</span>{" "}
              {user?.email}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Role:</span>{" "}
              {user?.role}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 ">
            {user && user.role !== "admin" ? (
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                <FaTachometerAlt /> My Enrollment
              </button>
            ) : (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                <MdOutlineDashboard /> Admin Dashbord
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer border rounded-lg hover:bg-gray-100 font-bold"
            >
              <LuLogOut className="font-bold" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
