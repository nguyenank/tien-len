import React from "react";
import PropTypes from "prop-types";
import {
  validCombination,
  validChop,
  compareHighest,
} from "../../moves/helper-functions/cardComparison";

export default function TienLenButton({
  player,
  roundType,
  center,
  tienLenPlay,
}) {
  let stagingArea = player.stagingArea;
  const handType = validCombination(stagingArea);
  let classList;
  let text = "Tien Len - ";
  const invalidPlay =
    stagingArea.length === 0 || validCombination(stagingArea) === undefined;
  if (invalidPlay) {
    text += "Invalid Combination";
    classList = "disabled";
  } else if (validChop(center, stagingArea)) {
    text += "Tien Len";
    classList = "tien-len";
  } else if (
    roundType !== handType ||
    compareHighest(stagingArea, center) !== 1 ||
    stagingArea.length !== center.length
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
      onClick={invalidPlay ? () => null : () => tienLenPlay()}
    >
      {text}
    </button>
  );
}

TienLenButton.propTypes = {
  player: PropTypes.object,
  roundType: PropTypes.string,
  center: PropTypes.array,
  tienLenPlay: PropTypes.func,
};
