import React from "react";
import BreadCrumbItem from "./BreadcrumItem";

const Breadcrumbs = ({ list, activeItem }) => ( 
  <div className="flex flex-row items-center">
    {list.map((item, index) => (
      <BreadCrumbItem key={index} link={item.path} index={index} active={activeItem == item.title}>
        {item.title}
      </BreadCrumbItem>
    ))}
  </div>
);

export default Breadcrumbs;