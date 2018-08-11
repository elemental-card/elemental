import React from 'react';
import '../styles/HomeScreen.css';

export default ({ onJoinClicked, onCreateClicked }) => [
  <div className="HomeScreen__Join" onClick={onJoinClicked}>
    Join
  </div>,

  <div className="HomeScreen__Create" onClick={onCreateClicked}>
    Create
  </div>
];
