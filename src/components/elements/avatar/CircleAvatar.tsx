import React from "react";

interface CircleAvatarProps {
  width?: string | number;
  height?: string | number;
  source?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({
  width,
  height,
  source,
}) => {
  let sizeWidth;
  let sizeHeight;

  if (width) {
    if (typeof width === "number") sizeWidth = `w-${width}`;
    if (typeof width === "string") sizeWidth = `w-[${width}]`;
  } else sizeWidth = "w-10";

  if (height) {
    if (typeof height === "number") sizeHeight = `h-${height}`;
    if (typeof height === "string") sizeHeight = `h-[${height}]`;
  } else sizeHeight = "h-10";

  return (
    <div
      className={`bg-text rounded-full overflow-hidden ${sizeWidth} ${sizeHeight}`}
    >
      <img
        src={source ?? "https://i.pravatar.cc/500"}
        alt="avatar"
        className="object-cover object-center w-full aspect-square"
      />
    </div>
  );
};

export default CircleAvatar;
