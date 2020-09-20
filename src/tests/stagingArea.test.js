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

    // all players have 13 cards, staging area in empty
    expect(_.every(G.hands, hand => hand.length === 13)).toBe(true);
    expect(G.stagingArea.length).toBe(0);

    const card = G.hands["0"][5];

    client.moves.cardToStagingArea(card);
    G = client.store.getState()["G"];
    expect(_.find(G.hands["0"], card)).toBe(undefined);
    expect(G.stagingArea).toContain(card);
    expect(G.hands["0"].length).toBe(12);
    expect(G.hands["1"].length).toBe(13);
    expect(G.hands["2"].length).toBe(13);
    expect(G.hands["3"].length).toBe(13);

    client.moves.passTurn();
    const card2 = G.hands["1"][3];
    client.moves.cardToStagingArea(G.hands["1"][3]);

    G = client.store.getState()["G"];
    expect(_.find(G.hands["1"], card2)).toBe(undefined);
    expect(G.stagingArea).toContain(card);
    expect(G.stagingArea).toContain(card2);
    expect(G.hands["0"].length).toBe(12);
    expect(G.hands["1"].length).toBe(12);
    expect(G.hands["2"].length).toBe(13);
    expect(G.hands["3"].length).toBe(13);
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

    // all players have 13 cards, staging area in empty
    expect(_.every(G.hands, hand => hand.length === 13)).toBe(true);
    expect(G.stagingArea.length).toBe(0);

    const card = G.hands["0"][5];

    client.moves.cardToStagingArea(card);
    client.moves.cardFromStagingArea(card);

    G = client.store.getState()["G"];
    expect(G.hands["0"]).toContain(card);
    expect(G.stagingArea.length).toBe(0);
    expect(G.hands["0"].length).toBe(13);
    expect(G.hands["1"].length).toBe(13);
    expect(G.hands["2"].length).toBe(13);
    expect(G.hands["3"].length).toBe(13);

    client.moves.passTurn();
    const card2 = G.hands["1"][3];
    client.moves.cardToStagingArea(card2);
    client.moves.cardFromStagingArea(card2);

    G = client.store.getState()["G"];
    expect(G.hands["1"]).toContain(card2);
    expect(G.stagingArea.length).toBe(0);
    expect(G.hands["0"].length).toBe(13);
    expect(G.hands["1"].length).toBe(13);
    expect(G.hands["2"].length).toBe(13);
    expect(G.hands["3"].length).toBe(13);
  });
});
