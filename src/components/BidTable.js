import React from "react";
import "../styles/BidTable.css";

export default ({ players, tentativeBid = null }) => (
  <div className="BidTable">
    <div className="BidTable__NameList">
      {players.map(player => (
        <div className="BidTable__Name">{player.name}</div>
      ))}
    </div>
    <div className="BidTable__BidList">
      {players
        .filter(p => p.bid !== null)
        .map(player => (
          <div className="BidTable__Bid">{player.bid}</div>
        ))}
      {tentativeBid === null ? null : (
        <div className="BidTable__Bid BidTable__Bid--tentative">
          {tentativeBid}
        </div>
      )}
    </div>
  </div>
);
