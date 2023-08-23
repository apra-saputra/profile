interface TextAreaProps extends InputCustomProps {
  width?: string;
  height?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  size,
  width,
  height,
  value,
  placeholder,
  className,
  onChange,
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

  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`${width ?? "w-full"} ${
        height ?? "min-h-[100px]"
      } ${styleSize} bg-background rounded-lg border-2 border-accent  active::outline-[10px] active:outline-accent focus-visible:outline-[10px] focus-visible:outline-accent ${
        className ?? ""
      }`}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
