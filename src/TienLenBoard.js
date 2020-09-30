// src/TienLenBoard.js

import React, { Component } from "react";
import "./TienLenBoard.css";
const _ = require("lodash");

export class TienLenBoard extends Component {
  cardClick(suit, rank) {
    const card = { suit: suit, rank: rank };
    const player = this.props.G.players[this.props.playerID];
    if (_.find(player.stagingArea, card)) {
      this.props.moves.cardFromStagingArea(card);
    } else {
      this.props.moves.cardToStagingArea(card);
    }
  }

  renderSuit(suit) {
    switch (suit) {
      case "S":
        return "♠️";
      case "C":
        return "♣️";
      case "D":
        return "♦️";
      case "H":
        return "♥️";
      default:
        return "";
    }
  }

  render() {
    let center = [];
    for (let card of this.props.G.center) {
      center.push(
        <div
          className="card"
          key={card.rank + " " + card.suit}
          onClick={() => this.cardClick(card.suit, card.rank)}
        >
          {card.rank} <br /> {this.renderSuit(card.suit)}
        </div>
      );
    }
    let stagingArea = [];
    let cardList = [];
    const playerID = this.props.playerID;
    if (playerID) {
      for (let card of this.props.G.players[playerID].stagingArea) {
        stagingArea.push(
          <div
            className="card"
            key={card.rank + " " + card.suit}
            onClick={() => this.cardClick(card.suit, card.rank)}
          >
            {card.rank} <br /> {this.renderSuit(card.suit)}
          </div>
        );
      }
      for (let card of this.props.G.players[playerID].hand) {
        cardList.push(
          <div
            className="card"
            key={card.rank + " " + card.suit}
            onClick={() => this.cardClick(card.suit, card.rank)}
          >
            {card.rank} <br /> {this.renderSuit(card.suit)}
          </div>
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
