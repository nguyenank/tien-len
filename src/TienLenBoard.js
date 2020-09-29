// src/TienLenBoard.js

import React, { Component } from "react";
import "./Card.css";
const _ = require("lodash");

export class TienLenBoard extends Component {
  cardClick(suit, rank) {
    const card = { suit: suit, rank: rank };
    if (_.find(this.props.G.stagingArea, card)) {
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
    let stagingArea = [];
    for (let card of this.props.G.stagingArea) {
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
    let cardList = [];
    for (let card of this.props.G.hands[0]) {
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

    return (
      <div>
        <div className="staging-area">{stagingArea}</div>
        <div className="hand">{cardList}</div>
      </div>
    );
  }
}
