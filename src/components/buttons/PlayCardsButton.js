import React from "react";
import PropTypes from "prop-types";
import { validPlay } from "../../moves/cardPlayMoves";
const _ = require("lodash");

export default function PlayCardsButton({
  currentPlayer,
  playerID,
  player,
  roundType,
  center,
  cardsToCenter,
}) {
  let stagingArea = player.stagingArea;
  let threeSpadesInHand = _.find(player.hand, {
    rank: "3",
    suit: "S",
  });
  const p = validPlay(stagingArea, roundType, center, threeSpadesInHand);
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
      <button key="playcards" onClick={() => cardsToCenter()}>
        {stagingArea.length === 1 ? "Play Card" : "Play Cards"}
      </button>
    );
  }
}

PlayCardsButton.propTypes = {
  currentPlayer: PropTypes.string,
  playerID: PropTypes.string,
  player: PropTypes.object,
  roundType: PropTypes.string,
  center: PropTypes.array,
  cardsToCenter: PropTypes.func,
};
