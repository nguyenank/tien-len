// src/Card.js
import React from "react";
import Card from "./Card";
import { ReactSortable } from "react-sortablejs";

export default function CardArea({
  cards,
  onClick,
  className,
  setList,
  disabled,
}) {
  return (
    <ReactSortable
      multiDrag={true}
      group={"shared"}
      dragoverBubble={true}
      selectedClass={"selectedCard"}
      list={cards}
      setList={newCards => setList(newCards, className)}
      className={className}
      ghostClass={"ghostCard"}
      disabled={disabled}
    >
      {cards.map(card => (
        <Card rank={card.rank} suit={card.suit} />
      ))}
    </ReactSortable>
  );
}
