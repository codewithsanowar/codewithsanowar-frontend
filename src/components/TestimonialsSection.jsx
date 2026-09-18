import React from 'react'

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Code Smarter with Real-World Practice
        </h2>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          At CodeWithHarry, you don't just learn code, you engage in practical
          exercises that reflect real-world scenarios. From beginner-friendly
          lessons to advanced courses trusted by professionals, we prepare you
          for real-world projects.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-9xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
        
        {/* Card 1 */}
        <div className="bg-white  rounded-xl shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0"
            alt="Web Development"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Web Development
            </h3>
            <p className="text-gray-600">
              Learn HTML, CSS, JavaScript and modern frameworks to build
              responsive websites and web applications.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Data Science"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Data Science & AI
            </h3>
            <p className="text-gray-600">
              Master Python, data analysis, machine learning and artificial
              intelligence with hands-on projects.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            alt="DSA"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Data Structures & Algorithms
            </h3>
            <p className="text-gray-600">
              Learn DSA and crack interviews at top companies like Google and
              Microsoft.
            </p>
          </div>
        </div>

      </div>

      {/* 🔥 NEW STATS SECTION */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            Empowering Aspiring Developers to Build Their Future in Tech!
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Stat 1 */}
            <div>
              <p className="text-gray-500 mb-2">
                Students land their first developer job in
              </p>
              <h3 className="text-4xl font-bold text-black">
                6 months
              </h3>
              <p className="text-gray-600 font-medium">
                on average
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <p className="text-gray-500 mb-2">Over</p>
              <h3 className="text-4xl font-bold text-black">
                7,000,000+
              </h3>
              <p className="text-gray-600 font-medium">
                students trained
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <p className="text-gray-500 mb-2">
                Total YouTube Views
              </p>
              <h3 className="text-4xl font-bold text-black">
                1 Billion+
              </h3>
              <p className="text-gray-600 font-medium">
                views and counting
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default TestimonialsSection
