// src/moves/turnMoves.js

export function playCards(G, ctx) {
  nextTurn(G, ctx);
}

export function tienLenPlay(G, ctx) {
  nextTurn(G, ctx);
}

export function newRoundPlay(G, ctx) {
  ctx.events.endStage();
  G.turnOrder = [0, 1, 2, 3];
  nextTurn(G, ctx);
}

export function passTurn(G, ctx) {
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
