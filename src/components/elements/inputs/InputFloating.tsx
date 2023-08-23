import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface InputFloatingProps extends InputCustomProps {
  type: React.HTMLInputTypeAttribute;
}

const InputFloating: React.FC<InputFloatingProps> = ({
  type,
  value,
  placeholder,
  required,
  onChange,
  onReset,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const nestedType = () => {
    if (type === "password") return showPassword ? "text" : "password";
    return type;
  };

  const nestedPlaceholder = () => {
    if (!placeholder) return "Label";
    if (type === "password" && showPassword) return `Show ${placeholder}`;
    return placeholder;
  };

  useEffect(() => {
    setIsActive(!!value);

    return () => {};
  }, [value]);

  return (
    <div className="relative pt-3 w-full">
      <p
        className={`text-base select-none absolute transition-all duration-300 ${
          isActive ? "bottom-6 left-0 text-accent" : "bottom-1 left-[2%]"
        } bg-transparent`}
        onClick={() => setIsActive(true)}
      >
        {nestedPlaceholder()}
        {required && <span className="text-danger">*</span>}
      </p>
      <input
        type={nestedType()}
        className="w-full pt-2 border-b border-b-accent outline-none focus-within:border-b-text"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(!!value)}
        value={value}
        onChange={onChange}
        required={required}
      />
      <div className="absolute top-0 right-[3%] h-full bg-transparent cursor-pointer flex items-center gap-2 ">
        {typeof value !== "undefined" && value && (
          <FontAwesomeIcon
            className="text-danger opacity-75"
            icon={faX}
            onClick={() => onReset?.()}
          />
        )}
        {type === "password" &&
          (showPassword ? (
            <FontAwesomeIcon
              className="opacity-75"
              icon={faEye}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FontAwesomeIcon
              className="opacity-75"
              icon={faEyeSlash}
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default InputFloating;
