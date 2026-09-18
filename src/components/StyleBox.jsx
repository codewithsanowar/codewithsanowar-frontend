import React from "react";
import { Code, Layers, Rocket, DollarSign, BookOpen, BarChart } from "lucide-react";

const StyleBox = () => {
  const features = [
    {
      icon: <Rocket />,
      title: "Beginner-Friendly",
      desc: "Step-by-step courses designed for absolute beginners to kickstart their coding journey.",
    },
    {
      icon: <Layers />,
      title: "Advanced Concepts",
      desc: "Deep dive into advanced topics and frameworks to level up your skills.",
    },
    {
      icon: <Code />,
      title: "Real-World Projects",
      desc: "Learn by building real-world projects and gain hands-on experience.",
    },
    {
      icon: <DollarSign />,
      title: "Affordable Pricing",
      desc: "Access premium courses at prices tailored for students and professionals.",
    },
    {
      icon: <BookOpen />,
      title: "Comprehensive Resources",
      desc: "Gain access to a variety of coding resources such as templates, documentation, and code snippets.",
    },
    {
      icon: <BarChart />,
      title: "Industry Insights",
      desc: "Stay updated with the latest trends and insights from the tech industry.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-4">

      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12">
        <p className="text-gray-500 mb-2">Courses</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Master Coding with Our Core Offerings
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-9xl mx-auto grid md:grid-cols-3 gap-8">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-xl p-8 text-center hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-white rounded-full mb-6 text-gray-700">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StyleBox;