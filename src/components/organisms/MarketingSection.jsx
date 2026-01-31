import React from "react";
import { colors } from "../../utils/colors";

const MarketingSection = () => {
  return (
    <>
      {/* Platform Statistics Section */}
      <div className="w-full px-4 mx-auto mb-8 sm:px-6 sm:mb-10 md:px-8 md:mb-12 lg:mb-16 max-w-6xl">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-4 text-xl font-bold text-center sm:mb-6 sm:text-2xl md:text-3xl md:mb-8"
        >
          Why Choose InvestPro?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 md:grid-cols-3 lg:gap-6">
          {/* Stat Card 1 */}
          <div
            className="p-4 text-center transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl sm:mb-2"
            >
              10K+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 text-sm font-semibold sm:text-base"
            >
              Active Users
            </p>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Join our growing investment community
            </p>
          </div>

          {/* Stat Card 2 */}
          <div
            className="p-4 text-center transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl sm:mb-2"
            >
              ₹500Cr+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 text-sm font-semibold sm:text-base"
            >
              Total Invested
            </p>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Trust from thousands of investors
            </p>
          </div>

          {/* Stat Card 3 */}
          <div
            className="p-4 text-center transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl sm:mb-2"
            >
              15%+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 text-sm font-semibold sm:text-base"
            >
              Average Returns
            </p>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Maximize your wealth growth potential
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-4 mx-auto mb-8 sm:px-6 sm:mb-10 md:px-8 md:mb-12 lg:mb-16 max-w-6xl">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-4 text-xl font-bold text-center sm:mb-6 sm:text-2xl md:text-3xl md:mb-8"
        >
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 md:grid-cols-2 lg:gap-6">
          {/* Feature 1 */}
          <div
            className="p-4 transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 mb-3 text-xl rounded-lg sm:w-12 sm:h-12 sm:mb-4 sm:text-2xl"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>🔒</span>
            </div>
            <h3
              style={{ color: colors.darkPurple }}
              className="mb-2 text-base font-bold sm:text-lg"
            >
              100% Secure
            </h3>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Bank-level encryption and security protocols to protect your
              investments
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className="p-4 transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 mb-3 text-xl rounded-lg sm:w-12 sm:h-12 sm:mb-4 sm:text-2xl"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>⚡</span>
            </div>
            <h3
              style={{ color: colors.darkPurple }}
              className="mb-2 text-base font-bold sm:text-lg"
            >
              Easy to Use
            </h3>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Simple and intuitive interface for both beginners and experienced
              investors
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className="p-4 transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 mb-3 text-xl rounded-lg sm:w-12 sm:h-12 sm:mb-4 sm:text-2xl"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>👥</span>
            </div>
            <h3
              style={{ color: colors.darkPurple }}
              className="mb-2 text-base font-bold sm:text-lg"
            >
              Expert Support
            </h3>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              24/7 customer support and expert guidance from real estate
              professionals
            </p>
          </div>

          {/* Feature 4 */}
          <div
            className="p-4 transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 mb-3 text-xl rounded-lg sm:w-12 sm:h-12 sm:mb-4 sm:text-2xl"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>📈</span>
            </div>
            <h3
              style={{ color: colors.darkPurple }}
              className="mb-2 text-base font-bold sm:text-lg"
            >
              Track Progress
            </h3>
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed sm:text-sm"
            >
              Real-time portfolio tracking and detailed investment analytics
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full px-4 mx-auto mb-8 sm:px-6 sm:mb-10 md:px-8 md:mb-12 lg:mb-16 max-w-6xl">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-4 text-xl font-bold text-center sm:mb-6 sm:text-2xl md:text-3xl md:mb-8"
        >
          What Our Investors Say
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 md:grid-cols-3 lg:gap-6">
          {/* Testimonial 1 */}
          <div
            className="p-4 transition-all rounded-lg sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <div
                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white rounded-full sm:w-12 sm:h-12"
                style={{ backgroundColor: colors.lightPurple }}
              >
                RK
              </div>
              <div className="ml-2 sm:ml-3">
                <p
                  style={{ color: colors.darkPurple }}
                  className="text-xs font-bold sm:text-sm"
                >
                  Rajesh Kumar
                </p>
                <p style={{ color: colors.mediumPurple }} className="text-xs">
                  Mumbai, India
                </p>
              </div>
            </div>
            <p
              style={{ color: colors.mediumPurple }}
              className="mb-3 text-xs leading-relaxed sm:text-sm"
            >
              "InvestPro made real estate investing so easy! I've earned great
              returns and the support team is amazing."
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">
                  ⭐
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div className="flex items-center mb-4">
              <div
                className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full"
                style={{ backgroundColor: colors.lightPurple }}
              >
                PS
              </div>
              <div className="ml-3">
                <p
                  style={{ color: colors.darkPurple }}
                  className="text-sm font-bold"
                >
                  Priya Sharma
                </p>
                <p style={{ color: colors.mediumPurple }} className="text-xs">
                  Delhi, India
                </p>
              </div>
            </div>
            <p style={{ color: colors.mediumPurple }} className="mb-3 text-sm">
              "Transparent and secure. I love how I can track my investments in
              real-time. Best decision ever!"
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>

          {/* Testimonial 3 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div className="flex items-center mb-4">
              <div
                className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full"
                style={{ backgroundColor: colors.lightPurple }}
              >
                AV
              </div>
              <div className="ml-3">
                <p
                  style={{ color: colors.darkPurple }}
                  className="text-sm font-bold"
                >
                  Amit Verma
                </p>
                <p style={{ color: colors.mediumPurple }} className="text-xs">
                  Bangalore, India
                </p>
              </div>
            </div>
            <p style={{ color: colors.mediumPurple }} className="mb-3 text-sm">
              "The platform is user-friendly and the returns have been
              consistent. Highly recommended!"
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 mx-auto mb-8 sm:px-6 sm:mb-10 md:px-8 md:mb-12 lg:mb-16 max-w-4xl">
        <div
          className="p-6 text-center rounded-lg sm:p-8 md:p-10 lg:p-12"
          style={{
            backgroundColor: colors.lightPurple,
            border: `2px solid ${colors.mediumPurple}`,
          }}
        >
          <h2
            style={{ color: colors.darkPurple }}
            className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl"
          >
            Ready to Start Your Investment Journey?
          </h2>
          <p
            style={{ color: colors.darkPurple }}
            className="mb-6 text-sm opacity-90 sm:mb-7 sm:text-base md:text-lg md:mb-8"
          >
            Join thousands of investors building wealth with InvestPro
          </p>
          <button
            onClick={() => (window.location.href = "/register")}
            className="w-full px-6 py-3 font-bold transition-all duration-300 bg-white rounded-lg sm:w-auto sm:px-8 hover:shadow-lg active:scale-95"
            style={{ color: colors.darkPurple }}
          >
            Start Investing Now
          </button>
        </div>
      </div>
    </>
  );
};

export default MarketingSection;
