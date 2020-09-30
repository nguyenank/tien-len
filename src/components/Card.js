// src/Card.js
import React from "react";

export default function Card({ rank, suit, onClick }) {
  return (
    <div
      className="card"
      key={rank + " " + suit}
      onClick={() => onClick.call(this, rank, suit)}
    >
      {rank} <br /> {renderSuit(suit)}
    </div>
  );
}

function renderSuit(suit) {
  switch (suit) {
    case "S":
      return "♠️";
    case "C":
      return "♣️";
    case "D":
      return "♦️";
    case "H":
      return "♥️";
    default:
      return "";
  }
}
