// src/moves/cardAreaMoves.js
import { compareCards } from "./helper-functions/cardComparison";
const _ = require("lodash");

export function relocateCards(G, ctx, result) {
  if (!result.destination) return;
  const players = G.players;
  const playerID = ctx.playerID;
  const source = result.source.droppableId;
  const destination = result.destination.droppableId;
  if (source === destination) {
    const items = _.cloneDeep(players[playerID][source]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    players[playerID][source] = items;
  } else {
    const sourceItems = _.cloneDeep(players[playerID][source]);
    const destinationItems = _.cloneDeep(players[playerID][destination]);
    const [reorderedItem] = sourceItems.splice(result.source.index, 1);
    destinationItems.splice(result.destination.index, 0, reorderedItem);
    players[playerID][source] = sourceItems;
    players[playerID][destination] = destinationItems;
  }
}

export function clearStagingArea(G, ctx) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID].hand = players[playerID].hand.concat(
    players[playerID].stagingArea
  );
  players[playerID].stagingArea = [];
}

export function sortStagingArea(G, ctx) {
  const players = G.players;
  const playerID = ctx.playerID;
  players[playerID].stagingArea.sort(compareCards);
}
