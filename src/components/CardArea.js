// src/Card.js
import React from "react";
import Card from "./Card";
import { ReactSortable } from "react-sortablejs";
import PropTypes from "prop-types";

export default function CardArea({
  cards,
  className,
  listName,
  setList,
  disabled,
}) {
  return (
    <ReactSortable
      multiDrag={false}
      group={"shared"}
      dragoverBubble={true}
      selectedClass={"selected-card"}
      list={cards}
      setList={newCards => setList(newCards, listName)}
      className={className}
      ghostClass={"ghost-card"}
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
  listName: PropTypes.string,
};
