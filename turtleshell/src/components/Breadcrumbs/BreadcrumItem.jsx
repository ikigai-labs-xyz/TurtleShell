import React from "react";
import { Link } from "react-router-dom";
import right from '../../assets/favicon_right.svg'
import clsx from "clsx";

const BreadCrumbItem = ({ children, index, active, ...props }) => {
  const colorsVariants = {
    default: "ml-2",
    active: "text-orange-500",
    inactive: "text-white",
  };

  return (
  <div className="flex items-center">
    {index !== 0 && <img src={right} className="ml-2" alt='right' />}
    <div className={clsx({[colorsVariants.active] : active, [colorsVariants.inactive] : !active}, colorsVariants.default)}>{children}</div>
  </div>
  )
};

export default BreadCrumbItem;