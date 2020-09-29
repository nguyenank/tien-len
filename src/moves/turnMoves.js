// src/moves/turnMoves.js
import { Combinations } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";
import { validCombination, compareHighest } from "./compareCards";
const _ = require("lodash");

export function playCards(G, ctx) {
  let stagingArea = G.players[ctx.currentPlayer].stagingArea;
  const handType = validCombination(stagingArea);
  if (stagingArea.length === 0 || handType === undefined) {
    return INVALID_MOVE;
  }
  if (G.roundType === Combinations.ANY) {
    G.roundType = handType;
  }
  if (G.roundType === handType && compareHighest(stagingArea, G.center) === 1) {
    G.center = _.cloneDeep(stagingArea);
    G.players[ctx.currentPlayer].stagingArea = [];
    nextTurn(G, ctx);
  } else {
    return INVALID_MOVE;
  }
}

export function tienLenPlay(G, ctx) {
  let stagingArea = G.players[ctx.currentPlayer].stagingArea;
  const handType = validCombination(stagingArea);
  if (
    // not a valid tien len play
    G.roundType !== handType ||
    compareHighest(stagingArea, G.center) !== 1
  ) {
    ctx.events.endStage();
    G.turnOrder = [0, 1, 2, 3];
    G.roundType = Combinations.ANY;
  }
  G.center = _.cloneDeep(stagingArea);
  G.players[ctx.currentPlayer].stagingArea = [];
  nextTurn(G, ctx);
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
