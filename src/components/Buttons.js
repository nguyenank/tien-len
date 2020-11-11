import React from "react";
import PropTypes from "prop-types";
import {
  validCombination,
  validChop,
  compareHighest,
} from "../moves/helper-functions/cardComparison";
import { validPlay } from "../moves/cardPlayMoves";

export default function Buttons(props) {
  const currentPlayer = props.ctx.currentPlayer === props.playerID;
  const tienLen =
    props.ctx.activePlayers[props.ctx.currentPlayer] === "tienLen";
  let buttons = [];

  buttons.push(clearStagingAreaButton(props));

  if (currentPlayer && tienLen) {
    buttons.push(tienLenButton(props));
  } else {
    buttons.push(playCardsButton(props));
    if (currentPlayer && !tienLen) {
      buttons.push(passTurnButton(props));
    }
  }
  return (
    <div className="center-container" key="buttons">
      {buttons}
    </div>
  );
}

function clearStagingAreaButton(props) {
  return (
    <button
      className="button"
      key="clearStagingArea"
      onClick={props.moves.clearStagingArea}
    >
      Clear Staging Area
    </button>
  );
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
    compareHighest(stagingArea, props.G.center) !== 1 ||
    stagingArea.length !== props.G.center.length
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

function passTurnButton(props) {
  return (
    <button className="button" key="passTurn" onClick={props.moves.passTurn}>
      Pass Turn
    </button>
  );
}

Buttons.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  playerID: PropTypes.number,
};
