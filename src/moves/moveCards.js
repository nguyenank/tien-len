// src/moves/moveCards.js

export function reorderCards(G, ctx, cards, source) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID][source] = cards;
}

export function clearStagingArea(G, ctx) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID].hand = players[playerID].hand.concat(
    players[playerID].stagingArea
  );
  players[playerID].stagingArea = [];
}