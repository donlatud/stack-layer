import * as React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

/**
 * FormInput component - Reusable form input with label
 * Consistent styling for all form inputs in auth pages
 * Supports error state with red border and error message
 */
const FormInput = ({ label, id, className, error, ...props }: FormInputProps) => {
  const hasError = !!error;
  
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label
        htmlFor={id}
        className="text-body-1 text-brown-400 w-full"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full h-[48px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 placeholder:text-brown-400 focus:outline-none focus:ring-2 ${
          hasError
            ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
            : "border-brown-300 text-brown-600 focus:ring-brown-400 focus:border-brown-400"
        } ${className || ""}`}
        {...props}
      />
      {hasError && (
        <p className="text-body-2 text-brand-red mt-[4px]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
