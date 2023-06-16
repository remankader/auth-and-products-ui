import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  id?: string;
  className?: string;
  style?: "default" | "link";
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  type,
  id,
  className,
  children,
  disabled,
  style = "default",
  onClick,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type ? type : "submit"}
      disabled={disabled}
      className={`bg-sky-700 
      border 
      border-sky-600 
      focus:outline-none
      focus:ring-4 
      focus:ring-gray-200 
      px-4 
      py-1.5
      ${style === "link" && "link"}
      ${
        disabled
          ? `text-gray-400 hover:bg-sky-700 ${
              style === "link" && "linkDisabled !border-gray-400"
            }`
          : "text-white hover:bg-sky-800 "
      }
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
