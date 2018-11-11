import React from "react";
import "../styles/Container.css";

// const getClassName = (options) => {
//   return Object.entries(options)
//     .reduce(
//       (className, [k, v]) => className + (v ? ' Container--' + k : ''),
//       ''
//     ).slice(1);
// };

const getClassName = options =>
  "Container " +
  Object.entries(options)
    .filter(([k, v]) => v)
    .map(([k, v]) => "Container--" + k)
    .join(" ");

export default ({
  children,

  ...options
}) => <div className={getClassName(options)}>{children}</div>;
