// src/Card.js
import React from "react";

export default function Card({ rank, suit, onClick }) {
  return (
    <img
      className="card"
      src={require("../assets/cards/" + rank + suit + ".svg")}
      alt={rank + suit}
    />
  );
}
