import React, { ChangeEvent, FocusEvent } from "react";

interface InputTextProps {
  name?: string;
  id?: string;
  className?: string;
  defaultValue?: string;
  options: { id: number; name: string }[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({
  name,
  id,
  className,
  defaultValue,
  options,
  onChange,
}: InputTextProps) {
  return (
    <select
      name={name}
      id={id}
      className={`bg-gray-50 
      border 
      border-gray-300 
      text-gray-900 
      text-sm 
      rounded-lg 
      focus:ring-blue-500 
      focus:border-gray-400 
      block 
      w-full 
      p-1.5
      outline-none  ${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map((each) => {
        return (
          <option key={each.id} value={each.id}>
            {each.name}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
