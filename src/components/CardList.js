// src/PlayerStatus.js
import React, { PureComponent } from "react";
import Card from "./Card";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

export default class CardList extends PureComponent {
  render() {
    return this.props.cards.map((card, index) => {
      return (
        <Draggable
          key={card.rank + card.suit}
          draggableId={card.rank + card.suit}
          index={index}
          isDragDisabled={this.props.disabled}
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
    });
  }
}

CardList.propTypes = {
  cards: PropTypes.array,
  disabled: PropTypes.bool,
};
