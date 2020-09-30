// src/TienLenBoard.js

import React, { Component } from "react";
import "./TienLenBoard.css";
import Card from "./components/Card";

export class TienLenBoard extends Component {
  render() {
    let center = [];
    for (let card of this.props.G.center) {
      center.push(<Card rank={card.rank} suit={card.suit} />);
    }
    let stagingArea = [];
    let cardList = [];
    const playerID = this.props.playerID;
    if (playerID) {
      for (let card of this.props.G.players[playerID].stagingArea) {
        stagingArea.push(
          <Card
            rank={card.rank}
            suit={card.suit}
            onClick={() => this.props.moves.cardFromStagingArea(card)}
          />
        );
      }
      for (let card of this.props.G.players[playerID].hand) {
        cardList.push(
          <Card
            rank={card.rank}
            suit={card.suit}
            onClick={() => this.props.moves.cardToStagingArea(card)}
          />
        );
      }
    }

    return (
      <div>
        <h2>Center</h2>
        <div className="center">{center}</div>
        <h1>Player {this.props.playerID}</h1>
        <h2>Staging Area</h2>
        <div className="staging-area">{stagingArea}</div>
        <h2>Hand</h2>
        <div className="hand">{cardList}</div>
      </div>
    );
  }
}
