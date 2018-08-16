import React from 'react';
import '../styles/HomeScreen.css';

export default ({ isPending, onJoinClicked, onCreateClicked }) => [
  <div className="HomeScreen__Join" onClick={onJoinClicked}>
    Join
  </div>,

  <div className="HomeScreen__Create" onClick={onCreateClicked}>
    Create
  </div>
].concat(
  isPending
    ? [
      <div className="HomeScreen__PendingOverlay" />,
      <div className="HomeScreen__PendingIcon" />
    ]
    : []
);
