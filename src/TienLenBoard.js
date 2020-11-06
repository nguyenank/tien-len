// src/TienLenBoard.js

import React, { Component } from "react";
import CardArea from "./components/CardArea";
import PlayerStatus from "./components/PlayerStatus";
import PropTypes from "prop-types";
import { validPlay } from "./moves/cardPlayMoves";
import {
  validCombination,
  validChop,
  compareHighest,
} from "./moves/helper-functions/cardComparison";

class TienLenBoard extends Component {
  render() {
    const playerID = this.props.playerID;
    const currentPlayer = this.props.ctx.currentPlayer;
    const currentPlayerBool = currentPlayer === this.props.playerID;

    let playerArea = [];
    if (playerID && !this.props.ctx.gameover) {
      playerArea.push(
        <div className="center-container" key="stagingArea">
          <CardArea
            className={
              currentPlayerBool ? "current-staging-area" : "staging-area"
            }
            listName="stagingArea"
            cards={this.props.G.players[playerID].stagingArea}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
      let buttons = createButtons(this.props);
      playerArea.push(
        <div className="center-container" key="buttons">
          {buttons}
        </div>
      );
      playerArea.push(
        <div className="center-container" key="hand">
          <CardArea
            className={currentPlayerBool ? "current-hand" : "hand"}
            listName="hand"
            cards={this.props.G.players[playerID].hand}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
    }

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
        if (i == 0 && playerID) {
          playerArea.push(
            <div className="center-container">
              <PlayerStatus
                playerName={index.toString()}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={
                  index.toString() === currentPlayer
                    ? "current-player-status"
                    : "player-status"
                }
              />
            </div>
          );
        } else if (i % 2 === 0) {
          gameArea.push(
            <div className="center-container">
              <PlayerStatus
                playerName={index.toString()}
                cardsLeft={this.props.G.cardsLeft[index]}
                className={
                  index.toString() === currentPlayer
                    ? "current-player-status"
                    : "player-status"
                }
              />
            </div>
          );
        } else {
          centerRow.push(
            <PlayerStatus
              playerName={index.toString()}
              cardsLeft={this.props.G.cardsLeft[index]}
              className={
                index.toString() === currentPlayer
                  ? "current-player-status"
                  : "player-status"
              }
            />
          );
          if (i === 1) {
            gameArea.push(<div className="center-row">{centerRow}</div>);
          }
        }
      }
    }

    let gameover = "";
    if (this.props.ctx.gameover) {
      gameover = <h2>Game Over!</h2>;
    }

    return (
      <div>
        <div className="gameArea">{gameArea}</div>
        <div
          className={
            currentPlayer === this.props.playerID
              ? "current-player-area"
              : "player-area"
          }
        >
          {playerArea}
        </div>
        <div className="center-container">
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
  let classList;
  let text = "Tien Len - ";
  const invalidPlay =
    stagingArea.length === 0 || validCombination(stagingArea) === undefined;
  if (invalidPlay) {
    text += "Invalid Combination";
    classList = "disabled";
  } else if (validChop(props.G.center, stagingArea)) {
    text += "Tien Len";
    classList = "tien-len";
  } else if (
    props.G.roundType !== handType ||
    compareHighest(stagingArea, props.G.center) !== 1
  ) {
    text += stagingArea.length === 1 ? "Play Card" : "Play Cards";
  } else {
    text += "Tien Len";
    classList = "tien-len";
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
      <button className="disabled" disabled={true} key="playcards">
        {p}
      </button>
    );
  } else if (playerID !== currentPlayer) {
    return (
      <button className="wait" key="playcards">
        Not Your Turn
      </button>
    );
  } else {
    return (
      <button key="playcards" onClick={props.moves.cardsToCenter}>
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
