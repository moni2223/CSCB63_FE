import React from "react";

const EmptyStateComponent = ({ className, text, imageClassName }) => {
  return (
    <div className={`w-full h-full flex items-center flex-col justify-center ${className}`}>
      <p className="text-sm whitespace-nowrap uppercase">{text}</p>
    </div>
  );
};

export default EmptyStateComponent;
