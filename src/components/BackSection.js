import React from "react";
import "../styles/BackSection.css";

const NOOP = () => undefined;

export default ({ onClick, status, label }) => (
  <div className="BackSection">
    <div className={"BackSection__Label--" + status}>{label}</div>
    <div
      className={"BackSection__Button--" + status}
      onClick={status === "enabled" ? onClick : NOOP}
    >
      <div className={"BackSection__Icon--" + status} />
    </div>
  </div>
);
