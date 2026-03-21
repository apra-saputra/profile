import React from "react";

interface SpanCapsulProps {
  text: string;
}

const SpanCapsul: React.FC<SpanCapsulProps> = ({ text }) => {
  return (
    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
      {text}
    </span>
  );
};

export default React.memo(SpanCapsul);
