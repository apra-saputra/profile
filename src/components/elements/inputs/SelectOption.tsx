import React from "react";

interface SelectOptionProps extends InputCustomProps {
  options: { value: string | number; name: string }[];
  size?: "sm" | "md" | "lg";
  defautText?: string;
  width?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  value,
  size,
  width,
  defautText,
  onChange,
}) => {
  let styleSize: string = "";
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

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${styleSize} ${width} bg-background rounded-lg border-2 border-accent focus-visible:outline-[2px] focus-visible:outline-offset-[-1px] focus-visible:outline-accent`}
    >
      <option value={typeof value === "number" ? 0 : ""} disabled>
        {defautText ?? "Default Option"}
      </option>
      {options.map((elemnt) => (
        <option key={elemnt.value} value={elemnt.value}>
          {elemnt.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
