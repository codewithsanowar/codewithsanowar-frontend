import React from 'react'
import { TypeAnimation } from "react-type-animation";
import TestimonialsSection from '../components/TestimonialsSection';
import TestimonialsTwo from '../components/TestimonialsTwo';
import Companies from '../components/Compnies';
import StyleBox from '../components/StyleBox';
import CallToAction from '../components/CallToAction';
import assets from "../assets/sano.jpg"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <div className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <img
        src={assets}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6">
        {/* Top Tag */}
        <div className="inline-block px-6 py-1 font-semibold mt-23 bg-gray-200 rounded-full text-sm text-black mb-4">
          Learn coding the right way
        </div>

        {/* Heading */}
        <h1 className="pt-16 text-4xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight">
          Welcome to CodeWithSanowar
        </h1>

        {/* Typing Text */}
        <div className="text-2xl md:text-4xl font-bold text-black-900 mt-3">
          <TypeAnimation
            sequence={[
              "Learn Data Science",
              2000,
              "Learn Web Devlopment",
              2000,
              "Learn c++",
              2000,
              "Learn Machine Learning",
              2000,
              "Learn C Programing",
              2000,
              "Learn Python",
              2000,
              "Learn Java",
              2000,
              "Learn DSA",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Description */}
        <p className="mt-12 text-lg md:text-1xl text-gray-900 font-semibold leading-relaxed max-w-2xl mx-auto">
          Confused about which course to take? We've got you covered! Browse
          courses and discover the best option for you. It's free!
          <span className="font-bold text-black"> CodeWithSanowar </span>is my
          effort to teach the basics and coding techniques in a short time that
          took years to master.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <Link to={"/courses"}
           className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition">
            Explore Courses
          </Link>

          <Link to={"/about"} className="w-full sm:w-auto bg-gray-200 px-6 py-3 rounded-md hover:bg-gray-300 transition font-semibold">
            About
          </Link>
        </div>

        {/* Stats Card */}
        <div className="mt-20 mb-2 flex justify-center">
          <div className="bg-white/55 h-25 backdrop-blur-md rounded-xl shadow-lg px-8 py-5 flex gap-8">
            <div>
              <h3 className="text-2xl w-20 font-bold">100+</h3>
              <p className="text-sm text-gray-600">Courses</p>
            </div>

            <div>
              <h3 className="text-2xl w-20 font-bold">500K+</h3>
              <p className="text-sm text-gray-600">Students</p>
            </div>

            <div>
              <h3 className="text-2xl w-20 font-bold">5.0</h3>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TestimonialsSection/>
    <Companies/>
    <StyleBox/>
    <TestimonialsTwo/>
    <CallToAction/>
    </>
  )
}

export default Home
