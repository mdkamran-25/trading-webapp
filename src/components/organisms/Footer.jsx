import React from "react";
import { colors } from "../../utils/colors";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="relative mt-10 sm:mt-16 md:mt-20"
      style={{
        background: `linear-gradient(135deg, ${colors.lightPurple} 0%, ${colors.mediumPurple} 50%, ${colors.darkPurple} 100%)`,
      }}
    >
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 sm:h-10 md:h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block w-full h-8 sm:h-10 md:h-12 fill-white"
          />
        </svg>
      </div>

      <div className="pt-12 pb-6 sm:pt-14 sm:pb-7 md:pt-16 md:pb-8">
        <div className="w-full px-4 mx-auto sm:px-6 md:px-8 lg:pl-32 lg:pr-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:gap-8 sm:mb-10 md:grid-cols-2 lg:grid-cols-4 md:mb-12">
            {/* Company Info */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/MainLogo.svg"
                  alt="InvestPro"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                />
                <h3 className="text-xl font-bold text-white sm:text-xl md:text-2xl">
                  InvestPro
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                Your trusted partner in real estate investment. Building wealth
                through strategic property investments with transparency and
                security.
              </p>

              {/* Social Media */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-lg hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <Facebook size={18} className="text-white sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-lg hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <Twitter size={18} className="text-white sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-lg hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <Instagram size={18} className="text-white sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-lg hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <Linkedin size={18} className="text-white sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h4 className="text-base font-semibold text-white sm:text-lg">
                Quick Links
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Invest", href: "/invest" },
                  { name: "Portfolio", href: "/orders" },
                  { name: "Account", href: "/account" },
                  { name: "Support", href: "/support" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-xs transition-all duration-200 sm:text-sm text-white/80 hover:text-white hover:translate-x-1 sm:hover:translate-x-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h4 className="text-base font-semibold text-white sm:text-lg">
                Our Services
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  "Property Investment",
                  "Portfolio Management",
                  "Market Analysis",
                  "Investment Consulting",
                  "Risk Assessment",
                ].map((service) => (
                  <div
                    key={service}
                    className="text-xs transition-colors duration-200 sm:text-sm text-white/80 hover:text-white"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h4 className="text-base font-semibold text-white sm:text-lg">
                Contact Us
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin
                    size={16}
                    className="flex-shrink-0 mt-1 text-white/80 sm:w-[18px] sm:h-[18px]"
                  />
                  <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                    123 Investment Street,
                    <br />
                    Financial District,
                    <br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone
                    size={16}
                    className="flex-shrink-0 text-white/80 sm:w-[18px] sm:h-[18px]"
                  />
                  <a
                    href="tel:+919876543210"
                    className="text-xs transition-colors sm:text-sm text-white/80 hover:text-white"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail
                    size={16}
                    className="flex-shrink-0 text-white/80 sm:w-[18px] sm:h-[18px]"
                  />
                  <a
                    href="mailto:support@investpro.in"
                    className="text-xs transition-colors sm:text-sm text-white/80 hover:text-white"
                  >
                    support@investpro.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-6 border-t sm:pt-7 md:pt-8 border-white/20">
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
              <div className="text-xs text-center text-white/60 sm:text-sm md:text-left">
                © 2026 InvestPro. All rights reserved. | Built with ❤️ for
                investors
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <button className="text-xs transition-colors sm:text-sm text-white/60 hover:text-white">
                  Privacy Policy
                </button>
                <button className="text-xs transition-colors sm:text-sm text-white/60 hover:text-white">
                  Terms of Service
                </button>
                <button className="text-xs transition-colors sm:text-sm text-white/60 hover:text-white">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div
        className="absolute hidden w-3 h-3 rounded-full sm:block sm:w-4 sm:h-4 top-20 left-4 sm:left-10 bg-white/10 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute hidden w-2 h-2 rounded-full sm:block sm:w-3 sm:h-3 top-32 right-8 sm:right-20 bg-white/10 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute hidden w-2 h-2 rounded-full sm:block bottom-20 left-8 sm:left-20 bg-white/10 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "3.5s" }}
      />
      <div
        className="absolute hidden w-3 h-3 rounded-full sm:block sm:w-5 sm:h-5 bottom-32 right-4 sm:right-10 bg-white/5 animate-pulse"
        style={{ animationDuration: "2s" }}
      />
    </footer>
  );
};

export default Footer;
