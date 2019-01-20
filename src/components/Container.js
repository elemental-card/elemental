import React from "react";
import "../styles/Container.css";

const getClassName = options =>
  "Container " +
  Object.entries(options)
    .filter(([k, v]) => v)
    .map(([k, v]) => "Container--" + k)
    .join(" ");

export default ({
  children,
  top,

  ...options
}) => (
  <div
    style={top !== undefined ? { top } : {}}
    className={getClassName(options)}
  >
    {children}
  </div>
);
