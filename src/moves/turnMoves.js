// src/moves/turnMoves.js
import { Combinations } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";
import { validCombination, compareHighest } from "./compareCards";
const _ = require("lodash");

export function playCards(G, ctx) {
  const handType = validCombination(G.stagingArea);
  if (G.stagingArea.length === 0 || handType === undefined) {
    return INVALID_MOVE;
  }
  if (G.roundType === Combinations.ANY) {
    G.roundType = handType;
  }
  if (
    G.roundType === handType &&
    compareHighest(G.stagingArea, G.center) === 1
  ) {
    successfulPlay(G);
    nextTurn(G, ctx);
  } else {
    return INVALID_MOVE;
  }
}

export function tienLenPlay(G, ctx) {
  const handType = validCombination(G.stagingArea);
  if (
    // not a valid tien len play
    G.roundType !== handType ||
    compareHighest(G.stagingArea, G.center) !== 1
  ) {
    ctx.events.endStage();
    G.turnOrder = [0, 1, 2, 3];
    G.roundType = Combinations.ANY;
  }
  successfulPlay(G);
  nextTurn(G, ctx);
}

function successfulPlay(G) {
  // shift cards around for a successful play
  G.center = _.cloneDeep(G.stagingArea);
  G.stagingArea = [];
}

export function passTurn(G, ctx) {
  G.turnOrder[parseInt(ctx.currentPlayer)] = null;
  nextTurn(G, ctx);
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let playerList = G.turnOrder
    .slice(currentPlayer + 1, 4)
    .concat(G.turnOrder.slice(0, currentPlayer + 1));
  let nextPlayer = playerList.find(i => i !== null).toString();

  ctx.events.endTurn({ next: nextPlayer });
  if (G.turnOrder.filter(x => x !== null).length === 1) {
    let value = {};
    value[nextPlayer] = "tienLen";
    ctx.events.setActivePlayers({ value: value });
  }
}
