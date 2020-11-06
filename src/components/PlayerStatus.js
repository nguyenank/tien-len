// src/PlayerStatus.js
import React from "react";
import PropTypes from "prop-types";
import cardback from "../assets/cards/2B.svg";

export default function PlayerStatus({ playerName, cardsLeft, className }) {
  return (
    <div className={className}>
      {playerName}: {cardsLeft}
      <img className="card-small" src={cardback} alt={cardsLeft} />
    </div>
  );
}

PlayerStatus.propTypes = {
  playerName: PropTypes.string,
  cardsLeft: PropTypes.integer,
  className: PropTypes.string,
};
