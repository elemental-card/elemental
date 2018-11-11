import React from "react";
import "../styles/HomeScreen.css";

export default ({
  isPending,
  currentRoom,
  onJoinClicked,
  onCreateClicked,
  onRejoinClicked,
}) =>
  [
    <div className="HomeScreen__Join" onClick={onJoinClicked}>
      Join
    </div>,

    <div className="HomeScreen__Create" onClick={onCreateClicked}>
      Create
    </div>,
  ]
    .concat(
      currentRoom === null
        ? []
        : [
            <div className="HomeScreen__Rejoin" onClick={onRejoinClicked}>
              Rejoin {currentRoom.hostName}
            </div>,
          ],
    )
    .concat(
      isPending
        ? [
            <div className="HomeScreen__PendingOverlay" />,
            <div className="HomeScreen__PendingIcon" />,
          ]
        : [],
    );
