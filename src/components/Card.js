// src/Card.js
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const requestImageFile = require.context("../assets/cards", true, /.svg$/);
export default class Card extends PureComponent {
  render() {
    return (
      <Draggable
        draggableId={this.props.rank + this.props.suit}
        index={this.props.index}
        isDragDisabled={this.props.disabled}
      >
        {(provided, snapshot) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <img
              className="card"
              src={
                requestImageFile(`./${this.props.rank + this.props.suit}.svg`)
                  .default
              }
              alt={this.props.rank + this.props.suit}
            />
          </li>
        )}
      </Draggable>
    );
  }
}

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.01s`,
  };
}

Card.propTypes = {
  rank: PropTypes.string,
  suit: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.number,
};
