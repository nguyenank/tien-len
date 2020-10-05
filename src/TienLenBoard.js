// src/TienLenBoard.js

import React, { Component } from "react";
import "./TienLenBoard.css";
import CardArea from "./components/CardArea";

export class TienLenBoard extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;
    if (playerID) {
      playerArea.push(<h1>Player {this.props.playerID}</h1>);
      playerArea.push(<h2>Staging Area</h2>);
      playerArea.push(
        <CardArea
          className="staging-area"
          cards={this.props.G.players[playerID].stagingArea}
          onClick={this.props.moves.cardFromStagingArea}
        />
      );
      playerArea.push(<h2>Hand</h2>);
      playerArea.push(
        <CardArea
          className="hand"
          cards={this.props.G.players[playerID].hand}
          onClick={this.props.moves.cardToStagingArea}
        />
      );
    }

    const currentPlayer = this.props.ctx.currentPlayer;
    if (playerID === currentPlayer) {
      if (this.props.ctx.activePlayers[currentPlayer] === "tienLen") {
        playerArea.push(<h3>Tien Len!</h3>);
        playerArea.push(
          <button onClick={this.props.moves.tienLenPlay}>Play Cards</button>
        );
      } else {
        playerArea.push(
          <button onClick={this.props.moves.passTurn}>Pass Turn</button>
        );
        playerArea.push(
          <button onClick={this.props.moves.playCards}>Play Cards</button>
        );
      }
    }

    return (
      <div>
        <h2>Center</h2>
        <CardArea
          className="center"
          cards={this.props.G.center}
          onClick={() => null}
        />
        <div className="player-area">{playerArea}</div>
      </div>
    );
  }
}
