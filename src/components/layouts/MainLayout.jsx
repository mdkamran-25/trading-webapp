import React from "react";
import { colors } from "../../utils/colors";
import { SidebarProvider } from "../../context/SidebarContext";
import { MobileBottomNav, Sidebar, Navbar, Footer } from "../index";

/**
 * MainLayout Component
 * Common layout wrapper for all authenticated pages
 * Includes: Sidebar (desktop), Navbar (all), Footer (all), MobileBottomNav (mobile)
 */
const MainLayout = ({
  children,
  hideFooter = false,
  hideMobileNav = false,
}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile devices */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: colors.lightBgContent }}
          >
            {/* Content with padding for navbar and bottom nav */}
            <div className="pt-16 pb-20 md:pb-8">{children}</div>

            {/* Footer */}
            {!hideFooter && <Footer />}

            {/* Mobile Bottom Navigation */}
            {!hideMobileNav && <MobileBottomNav />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
