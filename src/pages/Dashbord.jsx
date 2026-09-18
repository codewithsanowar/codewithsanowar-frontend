import React from "react";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">
      
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex justify-center">
          My Learning Dashboard
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base flex justify-center">
          Track your enrolled courses and continue learning 
        </p>
      </div>

      {/* Courses Section */}
      {mycourse && mycourse.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mycourse.map((e) => (
            <CourseCard key={e._id} course={e} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="empty"
            className="w-40 mb-5 opacity-70"
          />
          <p className="text-gray-600 text-lg font-medium">
            No courses enrolled yet
          </p>
          <button
            onClick={() => (window.location.href = "/courses")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashbord;
