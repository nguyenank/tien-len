// src/TienLen.js

import { PlayerView, Stage } from "boardgame.io/core";
import { Suits, Ranks, Combinations } from "./constants";
import { playCards, passTurn, tienLenPlay } from "./moves/turnMoves";
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
  },
  stages: {
    tienLen: { moves: { tienLenPlay } },
    notTurn: { moves: { cardToStagingArea, cardFromStagingArea } },
  },
  turn: {
    activePlayers: {
      currentPlayer: { stage: Stage.NULL },
      others: { stage: "notTurn" },
    },
  },
  playerView: PlayerView.STRIP_SECRETS,
  endIf: (G, ctx) => {
    if (G.winners.length === 3) {
      let w = G.winners.concat(
        ["0", "1", "2", "3"].filter(x => !G.winners.includes(x))
      );
      return { winners: w };
    }
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
  const chunkedDeck = _.chunk(deck, 13).map(x => x.sort(compareCards));

  const players = {};

  for (let i = 0; i < 4; i++) {
    players[i] = {
      hand: chunkedDeck[i],
      stagingArea: [],
    };
  }

  return {
    turnOrder: [0, 1, 2, 3],
    center: [],
    players: players,
    roundType: Combinations.ANY,
    winners: [],
  };
}
