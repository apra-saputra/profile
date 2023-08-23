import { InputFloating } from "@/components/elements/inputs";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface InputLoginsProps {
  icon: IconDefinition;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  required?: boolean;
  value: string | number | readonly string[] | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const InputForm: React.FC<InputLoginsProps> = ({
  icon,
  value,
  required,
  setValue,
  type,
  placeholder,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div
      className={`flex items-end transition-all duration-300 ${
        isActive ? "bg-primary" : "bg-transparent"
      } rounded-2xl gap-x-4 pb-4 pt-3 px-6`}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <FontAwesomeIcon icon={icon} className="scale-150" />
      <InputFloating
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
        required={required}
      />
    </div>
  );
};

export default InputForm;
