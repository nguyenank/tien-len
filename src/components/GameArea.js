// src/components/GameArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import PlayerStatus from "./PlayerStatus";

export default class GameArea extends Component {
  render() {
    const playerID = this.props.playerID;
    const pID = playerID ? parseInt(playerID) : 0;
    let gameArea = [];
    let centerRow = [];
    for (let i of [2, 3, "center", 1, 0]) {
      if (i === "center") {
        centerRow.push(
          <div key="center" className="round-type">
            {this.props.G.roundType}
            <CardArea
              className="center"
              cards={this.props.G.center}
              onClick={() => null}
              setList={() => null}
              disabled={true}
            />
          </div>
        );
      } else {
        const index = (i + pID) % 4;
        const playerStatusClassName = getClassName(
          this.props,
          index.toString(),
          "player-status"
        );
        if (i === 2 || (i === 0 && !playerID)) {
          gameArea.push(
            <div className="center-container">
              <PlayerStatus
                playerName={index.toString()}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={playerStatusClassName}
              />
            </div>
          );
        } else if (i % 2 === 1) {
          centerRow.push(
            <PlayerStatus
              playerName={index.toString()}
              cardsLeft={this.props.G.cardsLeft[index]}
              className={playerStatusClassName}
            />
          );
          if (i === 1) {
            gameArea.push(<div className="center-row">{centerRow}</div>);
          }
        }
      }
    }
    return (
      <div className="gameArea">
        {!this.props.ctx.gameover ? gameArea : <h2>Game Over!</h2>}
      </div>
    );
  }
}

GameArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  playerID: PropTypes.number,
};
