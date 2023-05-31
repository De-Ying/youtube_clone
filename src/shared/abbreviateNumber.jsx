import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";

const AbbreviateNumber = ({ children, type }) => {
  let text =
    children < 1000
      ? abbreviateNumber(children, 1)
      : abbreviateNumber(children, 2);
  return (
    <span className="mr-2">
      {text} {type}
    </span>
  );
};

export default AbbreviateNumber;
