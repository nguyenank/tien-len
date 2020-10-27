// src/Card.js
import React from "react";
import PropTypes from "prop-types";

const requestImageFile = require.context("../assets/cards", true, /.svg$/);
export default function Card({ rank, suit }) {
  return (
    <img
      className="card"
      src={requestImageFile(`./${rank + suit}.svg`).default}
      alt={rank + suit}
    />
  );
}

Card.propTypes = {
  rank: PropTypes.string,
  suit: PropTypes.string,
};
