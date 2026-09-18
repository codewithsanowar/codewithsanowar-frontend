import React, { useRef, useState, } from "react";
import { UserData } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // ✅ FIXED
  const { btnLoading, verifyOtp } = UserData();

  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join(""); // ✅ FIXED

    if (code.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    await verifyOtp(code, navigate); // ✅ FIXED
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>

        <p className="text-gray-600 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            disabled={btnLoading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
          >
            {btnLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Have a great journey!
        </p>
      </div>
    </div>
  );
};

export default Verify;