import React, { ReactNode, ChangeEvent } from "react";

interface CheckboxProps {
  name?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Checkbox({
  name,
  id,
  className,
  checked = false,
  onChange,
  disabled,
}: CheckboxProps) {
  return (
    <input
      name={name}
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 
    h-4 
    text-blue-600 
    bg-gray-100 
    border-gray-300 
    rounded 
    focus:ring-blue-500 
    focus:ring-2 
    ${
      disabled
        ? "text-gray-400 hover:bg-sky-700"
        : "text-white hover:bg-sky-800 "
    }
    ${className}`}
    />
  );
}

export default Checkbox;
