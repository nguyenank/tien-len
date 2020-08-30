export const TienLen = {

  setup: setUp,
  moves: {
    playCards: playCards,
    passTurn: passTurn
  },
  phases: {
    normalPlay: {start: true,},
    tienLen: {}
  }

}

function setUp() {
  return {
    activePlayers: [0, 1, 2, 3],
  };
};

function playCards(G, ctx) {
  nextTurn(G, ctx);
}

function passTurn(G, ctx) {
  G.activePlayers[parseInt(ctx.currentPlayer)] = null;
  nextTurn(G, ctx);
}

function nextTurn(G, ctx) {
  let currentPlayer = parseInt(ctx.currentPlayer);
  let playerList = G.activePlayers.slice(currentPlayer+1,4).concat(G.activePlayers.slice(0, currentPlayer+1));
  console.log(playerList);
  let nextPlayer = playerList.find(i => i !== null);
  if (currentPlayer === nextPlayer) {
    // start Tien Len phase
  }
  else {
    ctx.events.endTurn({next: nextPlayer.toString()});
  }
}
