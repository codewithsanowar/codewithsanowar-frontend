import React from "react";

const About = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-[#4d683d] text-white py-20 px-4 md:px-10 text-center">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          About CodeWithSanowar
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg">
          Learn coding the right way with practical projects, real-world skills,
          and industry-ready courses.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* ABOUT TEXT */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
            CodeWithSanowar is an online learning platform focused on helping
            students and developers build real-world coding skills. Our mission
            is to make high-quality education accessible, practical, and
            affordable for everyone.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">🚀 Practical Learning</h3>
            <p className="text-gray-600">
              Learn by building real-world projects instead of just theory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">📚 Structured Courses</h3>
            <p className="text-gray-600">
              Step-by-step courses designed for beginners to advanced learners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">💼 Job Ready Skills</h3>
            <p className="text-gray-600">
              Gain skills that help you get internships and jobs in tech.
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">

          <div>
            <h3 className="text-2xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600">Students</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-600">50+</h3>
            <p className="text-gray-600">Courses</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-600">Hours Content</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>

          <button
            onClick={() => window.location.href = "/courses"}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Browse Courses
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;