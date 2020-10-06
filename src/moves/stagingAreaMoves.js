// src/moves/stagingAreaMoves.js
const _ = require("lodash");

export function cardToStagingArea(G, ctx, card) {
  let players = G.players;
  let playerID = ctx.playerID;
  players[playerID].stagingArea.push(card);
  _.pullAllWith(players[playerID].hand, [card], _.isEqual);
}

export function cardFromStagingArea(G, ctx, card) {
  let players = G.players;
  let playerID = ctx.playerID;
  _.pullAllWith(players[playerID].stagingArea, [card], _.isEqual);
  players[playerID].hand.push(card);
}

export function reorderCards(G, ctx, cards, source) {
  let players = G.players;
  let playerID = ctx.playerID;
  players[playerID][source] = cards;
}
