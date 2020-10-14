// src/TienLenBoard.js

import React, { Component } from "react";
import "./TienLenBoard.css";
import CardArea from "./components/CardArea";

export class TienLenBoard extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;
    if (playerID) {
      playerArea.push(<h1>Player {playerID}</h1>);
      playerArea.push(<h2>Staging Area</h2>);
      playerArea.push(
        <CardArea
          className="stagingArea"
          cards={this.props.G.players[playerID].stagingArea}
          setList={this.props.moves.reorderCards}
        />
      );
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
        playerArea.push(
          <button onClick={this.props.moves.clearStagingArea}>
            Clear Staging Area
          </button>
        );
        playerArea.push(<h2>Hand</h2>);
        playerArea.push(
          <CardArea
            className="hand"
            cards={this.props.G.players[playerID].hand}
            setList={this.props.moves.reorderCards}
          />
        );
      }
    }

    let gameover = "";
    if (this.props.ctx.gameover) {
      gameover = <h2>Game Over!</h2>;
    }

    return (
      <div>
        <h2>Center (Round Type: {this.props.G.roundType})</h2>
        <CardArea
          className="center"
          cards={this.props.G.center}
          onClick={() => null}
          setList={() => null}
          disabled={true}
        />
        <div className="player-area">{playerArea}</div>
        <h3>Winners: {this.props.G.winners}</h3>
        {gameover}
      </div>
    );
  }
}
