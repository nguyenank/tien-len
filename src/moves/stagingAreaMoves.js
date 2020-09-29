// src/moves/stagingAreaMoves.js
import { compareCards } from "./compareCards";
const _ = require("lodash");

export function cardToStagingArea(G, ctx, card) {
  const currentPlayer = ctx.currentPlayer;
  let players = G.players;
  players[currentPlayer].stagingArea.push(card);
  players[currentPlayer].stagingArea.sort(compareCards);
  _.pullAllWith(players[currentPlayer].hand, [card], _.isEqual);
}

export function cardFromStagingArea(G, ctx, card) {
  const currentPlayer = ctx.currentPlayer;
  let players = G.players;
  _.pullAllWith(players[currentPlayer].stagingArea, [card], _.isEqual);
  players[currentPlayer].hand.push(card);
  players[currentPlayer].hand.sort(compareCards);
}
