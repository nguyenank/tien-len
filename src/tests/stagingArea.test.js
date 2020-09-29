// src/tests/stagingArea.test.js

import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";
const _ = require("lodash");

describe("cardToStagingArea", () => {
  let client;

  beforeEach(() => {
    client = Client({
      game: TienLen,
    });
  });

  it("should remove the selected card from a hand and put it in stagingArea", () => {
    // pass turn along
    let { G, ctx } = client.store.getState();

    // all players have 13 cards, all staging areas are empty
    expect(_.every(G.players, player => player.hand.length === 13)).toBe(true);
    expect(_.every(G.players, player => player.stagingArea.length === 0)).toBe(
      true
    );

    const card = G.players["0"].hand[5];

    client.moves.cardToStagingArea(card);
    G = client.store.getState()["G"];
    expect(_.find(G.players["0"].hand, card)).toBe(undefined);
    expect(G.players["0"].stagingArea).toContain(card);
    expect(G.players["0"].hand.length).toBe(12);
    expect(G.players["1"].hand.length).toBe(13);
    expect(G.players["2"].hand.length).toBe(13);
    expect(G.players["3"].hand.length).toBe(13);

    client.moves.passTurn();
    const card2 = G.players["1"].hand[3];
    client.moves.cardToStagingArea(card2);

    G = client.store.getState()["G"];
    expect(_.find(G.players["1"].hand, card2)).toBe(undefined);
    expect(G.players["1"].stagingArea).toContain(card2);
    expect(G.players["0"].hand.length).toBe(12);
    expect(G.players["1"].hand.length).toBe(12);
    expect(G.players["2"].hand.length).toBe(13);
    expect(G.players["3"].hand.length).toBe(13);
  });
});

describe("cardFromStagingArea", () => {
  let client;

  beforeEach(() => {
    client = Client({
      game: TienLen,
    });
  });

  it("should remove the selected card from the staging area and put it in the active player's hand", () => {
    // pass turn along
    let { G, ctx } = client.store.getState();

    const card = G.players["0"].hand[5];

    client.moves.cardToStagingArea(card);
    client.moves.cardFromStagingArea(card);

    G = client.store.getState()["G"];
    expect(G.players["0"].hand).toContain(card);
    expect(G.players["0"].stagingArea.length).toBe(0);
    expect(G.players["0"].hand.length).toBe(13);
    expect(G.players["1"].hand.length).toBe(13);
    expect(G.players["2"].hand.length).toBe(13);
    expect(G.players["3"].hand.length).toBe(13);

    client.moves.passTurn();
    const card2 = G.players["1"].hand[3];
    client.moves.cardToStagingArea(card2);
    client.moves.cardFromStagingArea(card2);

    G = client.store.getState()["G"];
    expect(G.players["1"].hand).toContain(card2);
    expect(G.players["1"].stagingArea.length).toBe(0);
    expect(G.players["0"].hand.length).toBe(13);
    expect(G.players["1"].hand.length).toBe(13);
    expect(G.players["2"].hand.length).toBe(13);
    expect(G.players["3"].hand.length).toBe(13);
  });
});
