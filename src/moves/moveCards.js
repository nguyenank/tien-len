// src/moves/moveCards.js
const _ = require("lodash");

export function reorderCards(G, ctx, cards, source) {
  let players = G.players;
  let playerID = ctx.playerID;
  players[playerID][source] = cards;
}
