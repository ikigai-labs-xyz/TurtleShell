import React from "react";

const Container = ({ className, children }) => {

  const containerClasses = `container mx-auto px-5 bg-[#1D2B41] opacity-75 rounded-md ${className}`;

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export default Container;