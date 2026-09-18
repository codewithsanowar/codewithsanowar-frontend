import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaBookOpen,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GrCode } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";



const Navbar = ({ isAuth }) => {
  const { user} = UserData();
 
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();
  // Close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout

  return (
    <div className="w-full bg-[#f5f7fb] py-3 px-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <GrCode className="h-8 w-8" />
        <h1 className="text-lg md:text-xl font-bold">CodeWithSanowar</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 font-semibold">
        <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
          <FaHome /> Home
        </Link>
        <Link
          to="/courses"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <FaBookOpen /> Courses
        </Link>
        <Link
          to="/about"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <FaInfoCircle /> About
        </Link>
        {/* <Link
          to="/faculty"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <FaUsers /> Faculty
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <FaPhoneAlt /> Contact
        </Link> */}
        {/* <button
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <FaLayerGroup /> My Courses
        </button> */}
      </div>

      {/* Desktop Profile */}
      <div className="hidden md:flex items-center">
        {isAuth ? (
          <div className="relative" ref={profileRef}>
            <img
              onClick={() => setProfileOpen((prev) => !prev)}
              src="https://gravatar.com/avatar/e8497d2cc49eecbaec4201d06b0f4851?s=100&d=robohash"
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 bg-black"
              alt="Profile"
            />

            {profileOpen && (
              <div className="absolute right-0 top-12 mt-2 w-90 bg-white shadow-2xl rounded-md border border-gray-200 overflow-hidden z-[100]">
                {/* User */}
                <div className="flex items-center gap-3 p-4">
                  <img
                    src="https://gravatar.com/avatar/e8497d2cc49eecbaec4201d06b0f4851?s=100&d=robohash"
                    className="w-12 h-12 rounded-full bg-black"
                    alt="Profile"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold">{user?.name}</h3>

                    <p className="text-sm text-gray-500 truncate">
                     {user?.email}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 p-4 border-t border-gray-200">
                  <Link
                    to="/account"
                    onClick={() => setProfileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100"
                  >
                    <CiSettings />
                    My account
                  </Link>
                </div>

                {/* Footer */}
                <div className="text-center text-sm py-3 bg-gray-100 border-t">
                  Secured by{" "}
                  <span className="font-semibold">CodeWithSanowar</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Create Account
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-2xl" onClick={() => setOpen(true)}>
        <FaBars />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%]   max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">CodeWithSanowar</h2>
          <FaTimes onClick={() => setOpen(false)} />
        </div>

        {/* Profile Section */}
        {isAuth && (
          <div className="flex items-center gap-3 p-4  border-gray-300">
            <img
              src="https://gravatar.com/avatar/e8497d2cc49eecbaec4201d06b0f4851?s=100&d=robohash"
              className="w-12 h-12 rounded-full bg-black"
              alt=""
            />
            <div>
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex flex-col gap-5 p-5 text-lg">
          <Link to="/" onClick={() => setOpen(false)} className="flex gap-3">
            <FaHome /> Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setOpen(false)}
            className="flex gap-3"
          >
            <FaBookOpen /> Courses
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="flex gap-3"
          >
            <FaInfoCircle /> About
          </Link>
          {/* <Link
            to="/faculty"
            onClick={() => setOpen(false)}
            className="flex gap-3"
          >
            <FaUsers /> Faculty
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex gap-3"
          >
            <FaPhoneAlt /> Contact
          </Link> */}
        
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-4 border-t border-gray-300">
          {isAuth ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border p-2 rounded-lg  border-gray-300"
              >
                <CiSettings /> My account
              </Link>

              {/* <button
                onClick={handleLogout}
                className="flex items-center gap-2 border p-2 rounded-lg  border-gray-300"
              >
                <LuLogOut /> Sign out
              </button> */}
            </div>
          ) : (
            <Link
              to="/register"
              className="block text-center bg-blue-600 text-white py-2 rounded-lg"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
