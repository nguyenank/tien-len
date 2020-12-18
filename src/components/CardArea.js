// src/Card.js
import React from "react";
import CardList from "./CardList";
import { Droppable } from "react-beautiful-dnd";
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
          <CardList cards={cards} disabled={disabled} />
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
