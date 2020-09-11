export const TienLen = {
  setup: setUp,
  moves: {
    playCards: playCards,
    passTurn: passTurn,
    tienLenPlay: tienLenPlay,
    newRoundPlay: newRoundPlay,
  },
  stages: {
    tienLen: { moves: { tienLenPlay, newRoundPlay } },
  },
};

function setUp() {
  return {
    activePlayers: [0, 1, 2, 3],
  };
}

function playCards(G, ctx) {
  nextTurn(G, ctx);
}

function tienLenPlay(G, ctx) {
  nextTurn(G, ctx);
}

function newRoundPlay(G, ctx) {
  ctx.events.endStage();
  G.activePlayers = [0, 1, 2, 3];
  nextTurn(G, ctx);
}

function passTurn(G, ctx) {
  G.activePlayers[parseInt(ctx.currentPlayer)] = null;
  nextTurn(G, ctx);
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let playerList = G.activePlayers
    .slice(currentPlayer + 1, 4)
    .concat(G.activePlayers.slice(0, currentPlayer + 1));
  let nextPlayer = playerList.find(i => i !== null).toString();

  ctx.events.endTurn({ next: nextPlayer });
  if (G.activePlayers.filter(x => x !== null).length === 1) {
    let value = {};
    value[nextPlayer] = "tienLen";
    ctx.events.setActivePlayers({ value: value });
  }
}
