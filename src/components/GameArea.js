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
        const center = this.props.ctx.gameover ? (
          <div key="center" className="round-type">
            Game Over!
          </div>
        ) : (
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
        centerRow.push(center);
      } else {
        const index = (i + pID) % 4;
        const indexString = index.toString();
        const playerStatusClassName = getClassName(
          this.props,
          indexString,
          "player-status"
        );
        if (i === 2 || (i === 0 && !playerID)) {
          gameArea.push(
            <div className="center-container" key={indexString}>
              <PlayerStatus
                playerName={indexString}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={playerStatusClassName}
                winner={this.props.G.winners.findIndex(x => x === indexString)}
              />
            </div>
          );
        } else if (i % 2 === 1) {
          centerRow.push(
            <div key={indexString}>
              <PlayerStatus
                playerName={indexString}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={playerStatusClassName}
                winner={this.props.G.winners.findIndex(x => x === indexString)}
              />
            </div>
          );
          if (i === 1) {
            gameArea.push(
              <div key="centerRow" className="center-row">
                {centerRow}
              </div>
            );
          }
        }
      }
    }
    return <div className="game-area">{gameArea}</div>;
  }
}

GameArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  playerID: PropTypes.number,
};
