// src/moves/stagingAreaMoves.js
import { compareCards } from "./compareCards";
const _ = require("lodash");

export function cardToStagingArea(G, ctx, card) {
  let players = G.players;
  let playerID = ctx.playerID;
  players[playerID].stagingArea.push(card);
  players[playerID].stagingArea.sort(compareCards);
  _.pullAllWith(players[playerID].hand, [card], _.isEqual);
}

export function cardFromStagingArea(G, ctx, card) {
  let players = G.players;
  let playerID = ctx.playerID;
  _.pullAllWith(players[playerID].stagingArea, [card], _.isEqual);
  players[playerID].hand.push(card);
  players[playerID].hand.sort(compareCards);
}
