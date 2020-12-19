// src/TienLenBoard.js

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import GameArea from "./components/GameArea";
import PlayerArea from "./components/PlayerArea";

class TienLenBoard extends Component {
  render() {
    return (
      <div className="game">
        <DragDropContext onDragEnd={this.props.moves.relocateCards}>
          <GameArea {...this.props} />
          <PlayerArea {...this.props} />
        </DragDropContext>
      </div>
    );
  }
}

TienLenBoard.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
};

export default TienLenBoard;
