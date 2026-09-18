import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/sano.jpg"

const CallToAction = () => {
  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
      style={{
        backgroundImage:
          `url(${assets})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Content */}
      <div className="relative text-center max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-black-900">
          Start Your Coding Journey
        </h1>

        <p className="mt-4 mb-5 text-gray-700 text-lg">
          Learn coding step-by-step with India's most loved programming mentor.
        </p>

        <Link to={"/courses"} className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
          Start Now
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;