import * as React from "react";

interface AuthFormCardProps {
  title?: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  onFooterLinkClick?: () => void;
}

/**
 * AuthFormCard component - Card container for authentication forms
 * Includes title, form content, and footer link
 */
const AuthFormCard = ({
  title,
  children,
  footerText,
  footerLinkText,
  onFooterLinkClick,
}: AuthFormCardProps) => {
  return (
    <section className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-brown-200 rounded-t-[24px] rounded-b-[16px] shadow-lg flex flex-col px-[16px] py-[40px] md:px-[32px] md:py-[48px] lg:px-[48px] lg:py-[56px]">
      {title && (
        <h1 className="w-full text-headline-2 text-brown-600 text-center mb-[32px]">
          {title}
        </h1>
      )}
      {children}
      {footerText && footerLinkText && (
        <p className="text-center text-body-1 text-brown-600 mt-[24px]">
          {footerText}{" "}
          <button
            type="button"
            onClick={onFooterLinkClick}
            className="text-brown-600 underline hover:text-brown-500 transition-colors"
          >
            {footerLinkText}
          </button>
        </p>
      )}
    </section>
  );
};

export default AuthFormCard;
