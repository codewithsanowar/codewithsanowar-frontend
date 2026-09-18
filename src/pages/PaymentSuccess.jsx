import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 max-w-md w-full text-center animate-fadeIn">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-4">
          Your course subscription has been activated successfully.
        </p>

        {/* Reference ID */}
        <div className="bg-gray-100 rounded-lg p-3 mb-6">
          <p className="text-sm text-gray-500">Reference ID</p>
          <p className="text-gray-800 font-semibold break-all">{params.id}</p>
        </div>

        {/* Button */}
        <Link
          to={`/${user._id}/dashboard`}
          className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Go to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;
