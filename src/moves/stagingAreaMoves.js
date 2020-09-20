// src/moves/stagingAreaMoves.js
import { compareCards } from "./compareCards";
const _ = require("lodash");

export function cardToStagingArea(G, ctx, card) {
  G.stagingArea.push(card);
  G.stagingArea.sort(compareCards);
  _.pullAllWith(G.hands[ctx.currentPlayer], [card], _.isEqual);
}

export function cardFromStagingArea(G, ctx, card) {
  _.pullAllWith(G.stagingArea, [card], _.isEqual);
  G.hands[ctx.currentPlayer].push(card);
  G.hands[ctx.currentPlayer].sort(compareCards);
}
