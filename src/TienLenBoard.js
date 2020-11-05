// src/TienLenBoard.js

import React, { Component } from "react";
import CardArea from "./components/CardArea";
import PropTypes from "prop-types";
import { validPlay } from "./moves/cardPlayMoves";
import {
  validCombination,
  validChop,
  compareHighest,
} from "./moves/helper-functions/cardComparison";

class TienLenBoard extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;
    if (playerID && !this.props.ctx.gameover) {
      playerArea.push(
        <div className="centerContainer" key="stagingArea">
          <CardArea
            className="stagingArea"
            cards={this.props.G.players[playerID].stagingArea}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
      let buttons = createButtons(this.props);
      playerArea.push(
        <div className="centerContainer" key="buttons">
          {buttons}
        </div>
      );
      playerArea.push(
        <div className="centerContainer" key="hand">
          <CardArea
            className="hand"
            cards={this.props.G.players[playerID].hand}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
    }

    let status = [];

    for (let i = 0; i < 4; i++) {
      let className = "";
      if (i.toString() === this.props.ctx.currentPlayer) {
        className += " currentPlayer";
      }
      if (i.toString() === playerID) {
        className += " playerID";
      }
      if (!this.props.G.turnOrder.includes(i)) {
        className += " passed";
      }
      if (this.props.G.winners.includes(i)) {
        className += " winner";
      }
      status.push(
        <span className={className} key={i}>
          {i}
        </span>
      );
    }

    let gameover = "";
    if (this.props.ctx.gameover) {
      gameover = <h2>Game Over!</h2>;
    }

    return (
      <div>
        <center>
          <h2>Center (Round Type: {this.props.G.roundType})</h2>
        </center>
        <div className="centerContainer">
          <CardArea
            className="center"
            cards={this.props.G.center}
            onClick={() => null}
            setList={() => null}
            disabled={true}
          />
        </div>
        <div className="playerArea">{playerArea}</div>
        <div className="centerContainer">
          <div className="status">{status}</div>
        </div>
        {gameover}
      </div>
    );
  }
}

function createButtons(props) {
  const currentPlayer = props.ctx.currentPlayer === props.playerID;
  const tienLen =
    props.ctx.activePlayers[props.ctx.currentPlayer] === "tienLen";
  let buttons = [];

  buttons.push(
    <button
      className="button"
      key="clearStagingArea"
      onClick={props.moves.clearStagingArea}
    >
      Clear Staging Area
    </button>
  );

  if (currentPlayer && tienLen) {
    buttons.push(tienLenButton(props));
  } else {
    buttons.push(playCardsButton(props));
    if (currentPlayer && !tienLen) {
      buttons.push(
        <button
          className="button"
          key="passTurn"
          onClick={props.moves.passTurn}
        >
          Pass Turn
        </button>
      );
    }
  }
  return buttons;
}

function tienLenButton(props) {
  let stagingArea = props.G.players[props.playerID].stagingArea;
  const handType = validCombination(stagingArea);
  let classList = "button ";
  let text = "Tien Len - ";
  const invalidPlay =
    stagingArea.length === 0 || validCombination(stagingArea) === undefined;
  if (invalidPlay) {
    text += "Invalid Combination";
    classList += "disabled";
  } else if (validChop(props.G.center, stagingArea)) {
    text += "Tien Len";
    classList += "tienlen";
  } else if (
    props.G.roundType !== handType ||
    compareHighest(stagingArea, props.G.center) !== 1
  ) {
    text += stagingArea.length === 1 ? "Play Card" : "Play Cards";
  } else {
    text += "Tien Len";
    classList += "tienlen";
  }
  return (
    <button
      className={classList}
      disabled={invalidPlay}
      key="tienLenPlay"
      onClick={invalidPlay ? () => null : props.moves.tienLenPlay}
    >
      {text}
    </button>
  );
}

function playCardsButton(props) {
  const currentPlayer = props.ctx.currentPlayer;
  const playerID = props.playerID;
  let stagingArea = props.G.players[playerID].stagingArea;
  const p = validPlay(stagingArea, props.G.roundType, props.G.center);
  if (typeof p === "string") {
    return (
      <button className="button disabled" key="playcards">
        {p}
      </button>
    );
  } else if (playerID !== currentPlayer) {
    return (
      <button className="button wait" key="playcards">
        Not Your Turn
      </button>
    );
  } else {
    return (
      <button
        className="button"
        key="playcards"
        onClick={props.moves.cardsToCenter}
      >
        {stagingArea.length === 1 ? "Play Card" : "Play Cards"}
      </button>
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
