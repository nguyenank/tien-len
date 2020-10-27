// src/Card.js
import React from "react";
import Card from "./Card";
import { ReactSortable } from "react-sortablejs";
import PropTypes from "prop-types";

export default function CardArea({ cards, className, setList, disabled }) {
  return (
    <ReactSortable
      multiDrag={false}
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
        <Card rank={card.rank} suit={card.suit} key={card.rank + card.suit} />
      ))}
    </ReactSortable>
  );
}

CardArea.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  setList: PropTypes.func,
  disabled: PropTypes.bool,
};
