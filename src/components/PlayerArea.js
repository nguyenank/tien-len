// src/components/PlayerArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import Buttons from "./Buttons";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import PlayerStatus from "./PlayerStatus";
const _ = require("lodash");

export default class PlayerArea extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;

    if (playerID) {
      const winner = this.props.G.winners.findIndex(x => x === playerID);
      const player = _.find(this.props.gameMetadata, {
        id: parseInt(playerID),
      });
      const playerName = player ? player.name : playerID;
      playerArea.push(
        <div className="center-container" key="winScreen">
          <PlayerStatus
            playerName={playerName}
            cardsLeft={this.props.G.cardsLeft[playerID]}
            className={
              getClassName(this.props, playerID, "player-status") + " no-shadow"
            }
            winner={winner}
          />
        </div>
      );
      if (winner === -1 && !this.props.ctx.gameover) {
        playerArea.push(
          <div className="center-container" key="stagingArea">
            <CardArea
              className={getClassName(
                this.props,
                this.props.playerID,
                "staging-area"
              )}
              listName="stagingArea"
              cards={this.props.G.players[playerID].stagingArea}
              setList={this.props.moves.relocateCards}
            />
          </div>
        );
        playerArea.push(
          <div key="buttons">
            <Buttons {...this.props} />
          </div>
        );
        playerArea.push(
          <div className="center-container" key="hand">
            <CardArea
              className={getClassName(this.props, playerID, "hand")}
              listName="hand"
              cards={this.props.G.players[playerID].hand}
              setList={this.props.moves.relocateCards}
            />
          </div>
        );
      } else {
        playerArea.push(
          <div key="congratulations" className="center-container">
            Congratulations!
          </div>
        );
      }
    }
    return (
      <div className={getClassName(this.props, playerID, "player-area")}>
        {playerArea}
      </div>
    );
  }
}

PlayerArea.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.string,
  gameMetadata: PropTypes.array,
};
