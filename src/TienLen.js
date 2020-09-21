// src/TienLen.js

import { Suits, Ranks, Combinations } from "./constants";
import {
  playCards,
  passTurn,
  tienLenPlay,
  newRoundPlay,
} from "./moves/turnMoves";
import {
  cardToStagingArea,
  cardFromStagingArea,
} from "./moves/stagingAreaMoves";
import { compareCards } from "./moves/compareCards";
const _ = require("lodash");

export const TienLen = {
  setup: setUp,
  moves: {
    cardToStagingArea: cardToStagingArea,
    cardFromStagingArea: cardFromStagingArea,
    playCards: playCards,
    passTurn: passTurn,
    tienLenPlay: tienLenPlay,
    newRoundPlay: newRoundPlay,
  },
  stages: {
    tienLen: { moves: { tienLenPlay, newRoundPlay } },
  },
};

function setUp(ctx) {
  let deck = [];
  for (let suit of Suits) {
    for (let rank of Ranks) {
      deck.push({ suit: suit, rank: rank });
    }
  }
  deck = ctx.random.Shuffle(deck);

  const hands = {};

  for (let i = 0; i < 4; i++) {
    hands[i] = _.chunk(deck, 13)[i].sort(compareCards);
  }

  return {
    hands: hands,
    turnOrder: [0, 1, 2, 3],
    center: [],
    stagingArea: [],
    roundType: Combinations.ANY,
  };
}
