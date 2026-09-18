import React from "react";
import { Zap } from "lucide-react";
import { GrCode } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-[#0b1a2b] text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-1">
            <GrCode className="h-8 w-10 text-white" />
            <h1 className="text-xl font-bold text-white">CodeWithSanowar</h1>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact us</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex">
            {/* <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md bg-[#1b2a3d] text-white outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
              Subscribe
            </button> */}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        Made with ❤️ and ☕ in India
      </div>
    </footer>
  );
};

export default Footer;
