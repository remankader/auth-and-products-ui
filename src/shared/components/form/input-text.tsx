import React, { ChangeEvent, FocusEvent } from "react";

interface InputTextProps {
  type?: "text" | "password";
  name?: string;
  id?: string;
  className?: string;
  alertType?: "default" | "danger" | "success";
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

function InputText({
  type = "text",
  name,
  id,
  className,
  alertType = "default",
  placeholder,
  defaultValue,
  onChange,
  onBlur,
}: InputTextProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={`bg-white 
      border 
      shadow-inner
      rounded-lg 
      focus:ring-gray-400 
      focus:border-gray-400 
      block 
      w-full 
      p-1.5 
      outline-none ${
        alertType === "danger"
          ? "border-rose-600"
          : alertType === "success"
          ? "border-green-600"
          : "border-gray-300"
      } ${className}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputText;
