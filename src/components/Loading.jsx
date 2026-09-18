import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      
      {/* Logo / Brand */}
      <div className="text-3xl font-bold mb-6 animate-pulse">
        CodeWithSanowar
      </div>

      {/* Spinner */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 text-lg animate-pulse">
        Loading, please wait...
      </p>

      {/* Dots Animation */}
      <div className="flex gap-2 mt-4">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;