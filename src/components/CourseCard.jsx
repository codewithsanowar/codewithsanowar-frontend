import React from "react";
import { server } from "../main.jsx";
import { UserData } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../context/CourseContext.jsx";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <img
          src={`${server}/${course.image}`}
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold leading-snug mb-2 break-words">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5 line-clamp-2 font-medium break-words">
          {course.description}
        </p>

        {/* Author + Category */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3 mt-2">
          <span className="border border-gray-300 rounded-md px-2 py-[2px] font-medium whitespace-nowrap">
            👨‍🏫 {course.createdBy}
          </span>
          <span className="border border-gray-300 rounded-md px-2 py-[2px] font-medium whitespace-nowrap">
            🔎 {course.category}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mb-6">
          <span className="border border-gray-300 rounded-md px-2 py-[2px] font-medium">
            ⏱ {course.duration} weeks
          </span>
          <span className="border border-gray-300 rounded-md px-2 py-[2px] font-medium">
            📚 {course.lessons} lessons
          </span>
          <span className="border border-gray-300 rounded-md px-2 py-[2px] font-medium">
            🌐 {course.language}
          </span>
        </div>

        {/* 🔥 Bottom Section (push to bottom) */}
        <div className="mt-auto">
          {/* Price */}
          <div className="mb-3 sm:mb-4">
            <span className="text-base sm:text-lg font-bold mr-2">
              ₹{course.price}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 line-through font-semibold">
              ₹{course.oldprice}
            </span>
          </div>

          {/* Buttons */}
          {isAuth ? (
            <>
              {user && user.role !== "admin" ? (
                <>
                  {user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full bg-gray-200 hover:bg-gray-300 py-2.5 rounded-md text-lg sm:text-sm font-semibold transition"
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full bg-gray-200 hover:bg-gray-300 py-2.5 rounded-md text-lg sm:text-sm font-semibold transition"
                    >
                      View Course
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate(`/lectures/${course._id}`)}
                  className="w-full bg-gray-200 hover:bg-gray-300 py-2.5 rounded-md text-xs sm:text-sm font-medium transition"
                >
                  Study
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gray-200 hover:bg-gray-300 py-2.5 rounded-md text-xs sm:text-sm font-medium transition"
            >
              View Course
            </button>
          )}

          {/* Admin Delete */}
          {user && user.role === "admin" && (
            <button
              onClick={() => deleteHandler(course._id)}
              className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-red-600 py-2.5 rounded-md text-xs sm:text-sm font-medium transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
