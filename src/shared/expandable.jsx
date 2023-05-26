import React, { useState } from "react";

const Expandable = ({ children, maxChars = 100 }) => {
  let [expanded, setExpanded] = useState(true);

  if (children?.length <= maxChars) return <p>{children}</p>;

  let text = expanded ? children?.substring(0, maxChars) : children;

  return (
    <>
      <p className="whitespace-pre-line">{text}</p>
      <button className="mt-8" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Read more" : "Read less"}
      </button>
    </>
  );
};

export default Expandable;
