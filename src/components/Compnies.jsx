import React from "react";

const companies = [
  { name: "Microsoft", logo: "https://lms-gs.vercel.app/assets/microsoft_logo-CJCILJpU.svg" },
  { name: "Walmart", logo: "https://www.codewithharry.com/logos/dell.png" },
  { name: "Accenture", logo: "https://lms-gs.vercel.app/assets/accenture_logo-C2wm6fZ5.svg" },
  { name: "PayPal", logo: "https://lms-gs.vercel.app/assets/paypal_logo-Y0aMXISO.svg" },
  { name: "Amazon", logo: "https://www.codewithharry.com/logos/amazon.png" },
  { name: "Google", logo: "https://www.codewithharry.com/logos/google.png" },
  { name: "Goldman Sachs", logo: "https://www.codewithharry.com/logos/goldman.png" },
  { name: "Samsung", logo: "https://www.codewithharry.com/logos/samsung.png" },
  { name: "IBM", logo: "https://www.codewithharry.com/logos/ibm.png" },
  { name: "EY", logo: "https://www.codewithharry.com/logos/ey.png" },
  { name: "Hitachi", logo: "https://www.codewithharry.com/logos/hitachi.png" },
  { name: "JP Morgan", logo: "https://www.codewithharry.com/logos/jpmorgan.png" },
];

const Companies = () => {
  return (
    <div className="py-16 px-4 bg-gray-100">
      
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
        Helped students achieve their dream job at
      </h2>

      {/* Logos */}
      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex items-center justify-center p-6"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-10 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-6">
        + many more companies
      </p>
    </div>
  );
};

export default Companies;