// src/TienLenBoard.js

import React, { Component } from "react";
import PropTypes from "prop-types";

import GameArea from "./components/GameArea";
import PlayerArea from "./components/PlayerArea";

class TienLenBoard extends Component {
  render() {
    return (
      <div className="game">
        <GameArea {...this.props} />
        <PlayerArea {...this.props} />
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
