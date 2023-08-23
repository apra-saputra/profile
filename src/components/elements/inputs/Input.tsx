import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface InputProps extends InputCustomProps {
  type: React.HTMLInputTypeAttribute;
}

const Input: React.FC<InputProps> = ({
  size,
  type,
  value,
  placeholder,
  className,
  pattern,
  inputMode,
  onChange,
  onReset,
}) => {
  let styleSize: string;

  switch (size) {
    case "sm":
      styleSize = "p-1 text-sm";
      break;
    case "lg":
      styleSize = "py-2 px-2 text-lg";
      break;
    default:
      styleSize = "py-1 px-2 text-base";
      break;
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const nestedType = () => {
    if (type === "password") return showPassword ? "text" : "password";
    return type;
  };

  return (
    <div className="relative">
      <input
        type={nestedType()}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className={`${styleSize} bg-background rounded-lg border-2 border-accent active:outline-accent focus-visible:outline-[2px] focus-visible:outline-offset-[2px] focus-visible:outline-accent ${
          className ?? "w-full"
        }`}
        placeholder={
          type === "password" && showPassword
            ? `show ${placeholder}`
            : placeholder
        }
      />

      <div className="absolute top-0 right-[3%] h-full bg-transparent cursor-pointer flex items-center gap-2 ">
        {typeof value !== "undefined" && onReset && value && (
          <FontAwesomeIcon
            className="text-danger opacity-60"
            icon={faX}
            onClick={() => onReset()}
          />
        )}
        {type === "password" &&
          (showPassword ? (
            <FontAwesomeIcon
              className="opacity-60"
              icon={faEye}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FontAwesomeIcon
              className="opacity-60"
              icon={faEyeSlash}
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
