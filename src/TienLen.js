import { Suits, Ranks, Combinations } from "./constants";
import { compareCards } from "./compareCards";
const _ = require("lodash");

export const TienLen = {
  setup: setUp,
  moves: {
    cardToStagingArea: cardToStagingArea,
    cardFromStagingArea: cardFromStagingArea,
    playCards: playCards,
    passTurn: passTurn,
    tienLenPlay: tienLenPlay,
    newRoundPlay: newRoundPlay,
  },
  stages: {
    tienLen: { moves: { tienLenPlay, newRoundPlay } },
  },
};

function setUp(ctx) {
  let deck = [];
  for (let suit of Suits) {
    for (let rank of Ranks) {
      deck.push({ suit: suit, rank: rank });
    }
  }
  deck = ctx.random.Shuffle(deck);

  const hands = {};

  for (let i = 0; i < 4; i++) {
    hands[i] = deck.slice(i, i + 13).sort(compareCards);
  }

  return {
    hands: hands,
    turnOrder: [0, 1, 2, 3],
    center: [],
    stagingArea: [],
    roundType: Combinations.ANY,
  };
}

function cardToStagingArea(G, ctx, card) {
  G.stagingArea.push(card);
  G.stagingArea.sort(compareCards);
  _.pullAllWith(G.hands[ctx.currentPlayer], [card], _.isEqual);
}

function cardFromStagingArea(G, ctx, card) {
  _.pullAllWith(G.stagingArea, [card], _.isEqual);
  G.hands[ctx.currentPlayer].push(card);
  G.hands[ctx.currentPlayer].sort(compareCards);
}

function playCards(G, ctx) {
  nextTurn(G, ctx);
}

function tienLenPlay(G, ctx) {
  nextTurn(G, ctx);
}

function newRoundPlay(G, ctx) {
  ctx.events.endStage();
  G.turnOrder = [0, 1, 2, 3];
  nextTurn(G, ctx);
}

function passTurn(G, ctx) {
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
