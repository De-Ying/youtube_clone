import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";

const AbbreviateNumber = ({ children }) => {
  let text =
    children < 1000
      ? abbreviateNumber(children, 1)
      : abbreviateNumber(children, 2);
  return <span className="mr-1">{text}</span>;
};

export default AbbreviateNumber;
