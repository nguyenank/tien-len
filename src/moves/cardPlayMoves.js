// src/moves/cardPlayMoves.js
import { Combinations } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";
import {
  validCombination,
  validChop,
  compareHighest,
} from "./helper-functions/cardComparison";
const _ = require("lodash");

export function playCards(G, ctx) {
  let stagingArea = G.players[ctx.currentPlayer].stagingArea;
  const handType = validCombination(stagingArea);
  if (stagingArea.length === 0 || handType === undefined) {
    return INVALID_MOVE;
  }
  if (G.roundType === Combinations.ANY || validChop(G.center, stagingArea)) {
    G.roundType = handType;
    cardsToCenter(G, ctx);
  } else if (
    G.roundType === handType &&
    compareHighest(stagingArea, G.center) === 1
  ) {
    cardsToCenter(G, ctx);
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
    ctx.events.setStage("notTurn");
    // remove any winners from turn order
    G.turnOrder = [0, 1, 2, 3].map(x =>
      G.winners.includes(x.toString()) ? null : x
    );
    G.roundType = handType;
  }
  cardsToCenter(G, ctx);
}

function cardsToCenter(G, ctx) {
  let stagingArea = G.players[ctx.currentPlayer].stagingArea;
  G.center = _.cloneDeep(stagingArea);
  G.players[ctx.currentPlayer].stagingArea = [];
  if (G.players[ctx.currentPlayer].hand.length === 0) {
    // won the game
    G.winners.push(ctx.currentPlayer);
    // get rid of any existing winner markers
    G.turnOrder = G.turnOrder.map(x => (x === "W" ? null : x));
    G.turnOrder[parseInt(ctx.currentPlayer)] = "W";
  }
  nextTurn(G, ctx);
}

export function passTurn(G, ctx) {
  G.turnOrder[parseInt(ctx.currentPlayer)] = null;
  nextTurn(G, ctx);
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
  let removeNulls = G.turnOrder.filter(x => x !== null);
  if (nextPlayer === "W" && removeNulls.length !== 1) {
    // next player has already won, more players left in turn order
    // need to remove winning "W" marker
    G.turnOrder = G.turnOrder.map(x => (x === "W" ? null : x));
    nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
    removeNulls = G.turnOrder.filter(x => x !== null);
  } else if (nextPlayer === "W" && removeNulls.length === 1) {
    // next player has already won, no more players left in turn order
    // need to pass free play to player after "W"

    // remove winners from turn order
    G.turnOrder = [0, 1, 2, 3].map(x =>
      G.winners.includes(x.toString()) ? null : x
    );
    G.roundType = Combinations.ANY;

    // find player after winner
    currentPlayer = parseInt(G.winners[G.winners.length - 1]);
    nextPlayer = findNextPlayer(G.turnOrder, currentPlayer);
  }
  ctx.events.endTurn({ next: nextPlayer });
  if (removeNulls.length === 1) {
    // need to place new currentPlayer into tien len
    ctx.events.setActivePlayers({
      currentPlayer: { stage: "tienLen" },
      others: { stage: "notTurn" },
    });
  }
}

function findNextPlayer(turnOrder, currentPlayer) {
  let playerList = turnOrder
    .slice(currentPlayer + 1, 4)
    .concat(turnOrder.slice(0, currentPlayer + 1));
  return playerList.find(i => i !== null).toString();
}
