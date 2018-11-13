import React from "react";
import "../styles/InitialsTakenAlert.css";

export default ({ onClose }) => (
  <div className="InitialsTakenAlert">
    Sorry, somebody is already using that name.
    <div className="InitialsTakenAlert__CloseButton" onClick={onClose}>
      x
    </div>
  </div>
);
