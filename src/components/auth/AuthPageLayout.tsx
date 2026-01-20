import * as React from "react";
import NavBar from "../layout/NavBar";

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthPageLayout component - Common layout for authentication pages
 * Includes NavBar and centered main content area
 */
const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col bg-brown-100">
      <NavBar />
      <main className="flex-1 flex items-center justify-center px-[16px] py-[40px] md:px-[24px] md:py-[48px] lg:px-[32px] lg:py-[56px]">
        {children}
      </main>
    </div>
  );
};

export default AuthPageLayout;
