import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  icon?: React.ElementType; // To handle the optional Icon prop
  showPassword?: boolean; // Optional, since not all fields will use this
  onToggle?: () => void; // Optional, since not all fields will have a toggle function
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  placeholder,
  icon: Icon,
  showPassword = false,
  onToggle,
  value,
  onChange,
}) => (
  <div className="mb-6 relative">
    <input
      type={showPassword ? "text" : type}
      id={id}
      name={name}
      className="w-full px-4 py-2 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-purple-600"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {Icon && (
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={onToggle}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    )}
  </div>
);

export default InputField;
