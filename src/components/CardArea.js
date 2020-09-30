// src/Card.js
import React from "react";
import Card from "./Card";

export default function CardArea({ cards, onClick, className }) {
  let cardArea = [];
  for (let card of cards) {
    cardArea.push(
      <Card rank={card.rank} suit={card.suit} onClick={() => onClick(card)} />
    );
  }
  return <div className={className}>{cardArea}</div>;
}
