// src/components/PlayerArea.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import Buttons from "./Buttons";
import { getClassName } from "./_helperFunctions";
import CardArea from "./CardArea";
import PlayerStatus from "./PlayerStatus";

export default class PlayerArea extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;

    if (playerID && !this.props.ctx.gameover) {
      const winner = this.props.G.winners.findIndex(
        x => x === playerID.toString()
      );
      playerArea.push(
        <div className="center-container">
          <PlayerStatus
            playerName={playerID.toString()}
            cardsLeft={this.props.G.cardsLeft[playerID]}
            className={
              getClassName(this.props, playerID, "player-status") + " no-shadow"
            }
            winner={winner}
          />
        </div>
      );
      if (winner === -1) {
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
        playerArea.push(<Buttons {...this.props} />);
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
  playerID: PropTypes.number,
};
