import React from "react";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-3 sm:px-6 md:px-10">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-10">
        Premium Courses
      </h1>

      {/* Grid */}
      <div className="
        grid 
        gap-4 
        sm:gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4
      ">
        {
          courses && courses.length > 0 ? (
            courses.map((e) => (
              <CourseCard key={e._id} course={e} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 mt-10">
              No Courses Yet!
            </p>
          )
        }
      </div>
    </div>
  );
};

export default Courses;