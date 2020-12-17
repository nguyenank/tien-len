// src/Card.js
import React from "react";
import Card from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

export default function CardArea({ cards, className, listName, disabled }) {
  return (
    <Droppable
      droppableId={listName}
      direction="horizontal"
      isDropDisabled={disabled}
    >
      {provided => (
        <ul
          className={className}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {cards.map((card, index) => {
            return (
              <Draggable
                key={card.rank + card.suit}
                draggableId={card.rank + card.suit}
                index={index}
              >
                {provided => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card rank={card.rank} suit={card.suit} />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

CardArea.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  setList: PropTypes.func,
  disabled: PropTypes.bool,
  listName: PropTypes.string,
};
