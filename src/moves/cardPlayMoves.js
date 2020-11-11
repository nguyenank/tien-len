// src/moves/cardPlayMoves.js
import { Combinations } from "../constants";
import {
  validCombination,
  validChop,
  compareHighest,
} from "./helper-functions/cardComparison";
const _ = require("lodash");

export function validPlay(stagingArea, roundType, center) {
  const handType = validCombination(stagingArea);
  if (stagingArea.length === 0 || handType === undefined) {
    return "Invalid Combination";
  } else if (roundType === Combinations.ANY || validChop(center, stagingArea)) {
    return true;
  } else if (roundType !== handType || stagingArea.length !== center.length) {
    return "Does Not Match Center";
  } else if (compareHighest(stagingArea, center) !== 1) {
    return "Does Not Beat Center";
  } else {
    return true;
  }
}

export function tienLenPlay(G, ctx) {
  let stagingArea = G.players[ctx.currentPlayer].stagingArea;
  const handType = validCombination(stagingArea);
  if (validChop(G.center, stagingArea)) {
    G.roundType = handType;
  } else if (
    // not a valid tien len play
    G.roundType !== handType ||
    compareHighest(stagingArea, G.center) !== 1 ||
    stagingArea.length !== G.center.length
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

export function cardsToCenter(G, ctx) {
  const currentPlayer = ctx.currentPlayer;
  let stagingArea = G.players[currentPlayer].stagingArea;
  G.roundType = validCombination(stagingArea);

  G.center = _.cloneDeep(stagingArea);
  G.players[currentPlayer].stagingArea = [];
  G.cardsLeft[currentPlayer] -= G.center.length;
  if (G.cardsLeft[currentPlayer] === 0) {
    // won the game
    G.winners.push(currentPlayer);
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
  removeNulls = G.turnOrder.filter(x => x !== null);
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
