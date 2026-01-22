import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "About Realstate Property Investment",
      content: (
        <>
          <p>
            Realstate Property Investment is India’s largest online marketplace
            for all types of properties — from residential and commercial spaces
            to large buildings and even shares in factories. Headquartered in
            Mumbai, our platform offers attractive prices and reliable
            investment options across India.
          </p>
          <p>
            In less than three years, Realstate Property Investment has helped
            over 100,000 individuals own profitable properties at prices many
            times higher than their share value.
          </p>
        </>
      ),
    },
    {
      title: "Our Mission",
      content: (
        <p>
          To make buying and selling properties effortless by providing a
          secure, transparent, and nationwide property investment platform. We
          aim to empower investors to access legitimate, verified property
          opportunities through a simple and trusted system.
        </p>
      ),
    },
    {
      title: "Our Vision",
      content: (
        <>
          <p>
            To become India’s most trusted and comprehensive marketplace for
            real estate investments, uniting the unorganized market of
            non-performing and distressed assets under one digital roof.
          </p>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Core Values
          </h2>
          <p>
            Transparency, trust, growth, and customer-first approach drive
            everything we do — ensuring fair deals, verified listings, and
            secure transactions.
          </p>
        </>
      ),
    },
    {
      title: "Our Network",
      content: (
        <>
          <p>
            Our extensive property network spans cities across India, enabling
            you to choose properties by city or by auctioning banks. Whether
            you’re buying or selling, Realstate Property Investment ensures
            seamless, verified, and profitable transactions.
          </p>
          <img
            src="/logo.jpg"
            alt="Logo"
            className="object-cover w-1/5 mt-4 mb-4 rounded-lg shadow-md"
          />
        </>
      ),
    },
    {
      title: "Founded",
      content: (
        <>
          <p>Realstate Property Investment was founded in 2022.</p>
          <p className="mt-2">
            To buy or sell properties, please visit the Invest page. Thank you
            for trusting us!
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-4 overflow-x-hidden font-sans sm:px-8 md:px-12 bg-gradient-to-r from-amber-100 to-yellow-300">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4 py-4 mb-6">
        <button
          className="p-2 transition-colors rounded-lg hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={24} />
        </button>
        <h1 className="flex-1 text-2xl font-bold text-center md:text-3xl">
          About Us
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-4xl pb-8 mx-auto">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-6 mb-6 transition-all duration-500 transform shadow-2xl bg-white/90 backdrop-blur-sm rounded-xl hover:shadow-xl hover:-translate-y-1"
            style={{
              animationDelay: `${index * 150 + 200}ms`,
              animation: `fadeIn 0.7s ease-out forwards`,
            }}
          >
            <h2 className="mb-3 text-3xl font-bold text-orange-700">
              {section.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
