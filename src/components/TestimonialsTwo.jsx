import React from 'react'

const TestimonialsTwo = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        Testimonials
      </h2>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <div className="bg-gray-200 rounded-lg p-8 relative">
          
          {/* Quote Icon */}
          <span className="text-5xl text-gray-400 absolute top-4 left-6">
            “
          </span>

          {/* Text */}
          <p className="text-gray-700 leading-relaxed mt-6">
            I don't have words to thank this man, I'm really grateful to have
            this channel and website in my daily routine. If you're a mere
            beginner, then you can trust this guy and can put your time into his
            content. I can assure you that it'll be worth it.
          </p>

          {/* User */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900">
              Mohit Kumar
            </h4>
            <p className="text-sm text-gray-600">
              Web Developer
            </p>
          </div>

        </div>

        {/* Card 2 */}
        <div className="bg-gray-200 rounded-lg p-8 relative">
          
          {/* Quote Icon */}
          <span className="text-5xl text-gray-400 absolute top-4 left-6">
            “
          </span>

          {/* Text */}
          <p className="text-gray-700 leading-relaxed mt-6">
            For everyone who wants to level up their #Coding and #Dev skills -
            seriously, this channel is for you! Both basic and advanced stacks
            are covered on this channel, and one can learn according to their
            skill levels. And the icing on the cake is, most of the content is
            available for free.
          </p>

          {/* User */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900">
              Rakesh Shetty
            </h4>
            <p className="text-sm text-gray-600">
              Web Developer
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default TestimonialsTwo
