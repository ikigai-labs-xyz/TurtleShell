import React from "react";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between">
      <div>{title && <h1 className="text-white texl-2xl">{title}</h1>}</div>
    </div>
  );
};

export default Header;
