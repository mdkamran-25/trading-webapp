import React from "react";
import { colors } from "../../utils/colors";

const MarketingSection = () => {
  return (
    <>
      {/* Platform Statistics Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-8 text-3xl font-bold text-center"
        >
          Why Choose InvestPro?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Stat Card 1 */}
          <div
            className="p-6 text-center rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-2 text-4xl font-bold"
            >
              10K+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 font-semibold"
            >
              Active Users
            </p>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Join our growing investment community
            </p>
          </div>

          {/* Stat Card 2 */}
          <div
            className="p-6 text-center rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-2 text-4xl font-bold"
            >
              ₹500Cr+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 font-semibold"
            >
              Total Invested
            </p>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Trust from thousands of investors
            </p>
          </div>

          {/* Stat Card 3 */}
          <div
            className="p-6 text-center rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <p
              style={{ color: colors.lightPurple }}
              className="mb-2 text-4xl font-bold"
            >
              15%+
            </p>
            <p
              style={{ color: colors.darkPurple }}
              className="mb-1 font-semibold"
            >
              Average Returns
            </p>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Maximize your wealth growth potential
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-8 text-3xl font-bold text-center"
        >
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Feature 1 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>🔒</span>
            </div>
            <h3 style={{ color: colors.darkPurple }} className="mb-2 font-bold">
              100% Secure
            </h3>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Bank-level encryption and security protocols to protect your
              investments
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>⚡</span>
            </div>
            <h3 style={{ color: colors.darkPurple }} className="mb-2 font-bold">
              Easy to Use
            </h3>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Simple and intuitive interface for both beginners and experienced
              investors
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>👥</span>
            </div>
            <h3 style={{ color: colors.darkPurple }} className="mb-2 font-bold">
              Expert Support
            </h3>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              24/7 customer support and expert guidance from real estate
              professionals
            </p>
          </div>

          {/* Feature 4 */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.lightBgCard,
              border: `1px solid ${colors.lightPurpleOverlay50}`,
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg"
              style={{ backgroundColor: colors.lightPurple }}
            >
              <span style={{ color: colors.darkPurple }}>📈</span>
            </div>
            <h3 style={{ color: colors.darkPurple }} className="mb-2 font-bold">
              Track Progress
            </h3>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              Real-time portfolio tracking and detailed investment analytics
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2
          style={{ color: colors.darkPurple }}
          className="mb-8 text-3xl font-bold text-center"
        >
          What Our Investors Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Testimonial 1 */}
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
                RK
              </div>
              <div className="ml-3">
                <p
                  style={{ color: colors.darkPurple }}
                  className="text-sm font-bold"
                >
                  Rajesh Kumar
                </p>
                <p style={{ color: colors.mediumPurple }} className="text-xs">
                  Mumbai, India
                </p>
              </div>
            </div>
            <p style={{ color: colors.mediumPurple }} className="mb-3 text-sm">
              "InvestPro made real estate investing so easy! I've earned great
              returns and the support team is amazing."
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
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
      <div className="max-w-4xl mx-auto mb-16">
        <div
          className="p-12 text-center rounded-lg"
          style={{
            backgroundColor: colors.lightPurple,
            border: `2px solid ${colors.mediumPurple}`,
          }}
        >
          <h2
            style={{ color: colors.darkPurple }}
            className="mb-4 text-3xl font-bold"
          >
            Ready to Start Your Investment Journey?
          </h2>
          <p
            style={{ color: colors.darkPurple }}
            className="mb-8 text-lg opacity-90"
          >
            Join thousands of investors building wealth with InvestPro
          </p>
          <button
            onClick={() => (window.location.href = "/register")}
            className="px-8 py-3 font-bold transition-all duration-300 bg-white rounded-lg hover:shadow-lg"
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
