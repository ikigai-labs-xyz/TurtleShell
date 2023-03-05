import React from "react";
import { Link } from "react-router-dom";
import right from '../../assets/favicon_right.svg'
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BreadCrumbItem = ({ children, index, link, active, ...props }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const colorsVariants = {
    active: "text-orange-500",
    inactive: "text-white",
  };

  const handleClick = (link) => {
    if (link.includes(':id')) {
      const path = link.split(':id')[0];
      navigate(path + id);
    }
    else {
      navigate(link);
    }
  }

  return (
  <div className="flex items-center mt-4">
    {index !== 0 && <img src={right} className="mx-2" alt='right' />}
    <button onClick={() => handleClick(link)} className={clsx({[colorsVariants.active] : active, [colorsVariants.inactive] : !active}, colorsVariants.default)}>{children}</button>
  </div>
  )
};

export default BreadCrumbItem;