import { Link, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";
import { SlashIcon } from "lucide-react";

export const CustomBreadscrums = () => {
  const currentPath = useLocation();

  const segments = currentPath.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {segments.map((item, idx) => {
          return (
            <React.Fragment key={item + idx}>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <Link to={currentPath.pathname.split(item)[0] + item}>
                  {item}
                </Link>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
