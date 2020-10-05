// src/tests/playCards.test.js

import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";
import { Combinations } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";

describe("playCards", () => {
  let G;
  let client;
  beforeEach(() => {
    client = Client({
      game: TienLen,
      numPlayers: 4,
    });
    G = client.store.getState()["G"];
    G.players = {
      "0": {
        hand: [
          { suit: "S", rank: "3" },
          { suit: "S", rank: "4" },
          { suit: "H", rank: "4" },
          { suit: "S", rank: "6" },
          { suit: "D", rank: "6" },
          { suit: "C", rank: "8" },
          { suit: "D", rank: "8" },
          { suit: "S", rank: "T" },
          { suit: "C", rank: "J" },
          { suit: "H", rank: "A" },
          { suit: "S", rank: "2" },
          { suit: "C", rank: "2" },
          { suit: "D", rank: "2" },
        ],
        stagingArea: [],
      },
      "1": {
        hand: [
          { suit: "D", rank: "4" },
          { suit: "S", rank: "5" },
          { suit: "C", rank: "5" },
          { suit: "H", rank: "6" },
          { suit: "D", rank: "7" },
          { suit: "S", rank: "8" },
          { suit: "C", rank: "9" },
          { suit: "C", rank: "T" },
          { suit: "H", rank: "T" },
          { suit: "S", rank: "Q" },
          { suit: "C", rank: "Q" },
          { suit: "D", rank: "Q" },
          { suit: "H", rank: "Q" },
        ],
        stagingArea: [],
      },
      "2": {
        hand: [
          { suit: "D", rank: "3" },
          { suit: "H", rank: "3" },
          { suit: "C", rank: "4" },
          { suit: "S", rank: "7" },
          { suit: "C", rank: "7" },
          { suit: "D", rank: "9" },
          { suit: "H", rank: "9" },
          { suit: "D", rank: "T" },
          { suit: "D", rank: "J" },
          { suit: "C", rank: "K" },
          { suit: "D", rank: "K" },
          { suit: "H", rank: "K" },
          { suit: "S", rank: "A" },
        ],
        stagingArea: [],
      },
      "3": {
        hand: [
          { suit: "C", rank: "3" },
          { suit: "D", rank: "5" },
          { suit: "H", rank: "5" },
          { suit: "C", rank: "6" },
          { suit: "H", rank: "7" },
          { suit: "H", rank: "8" },
          { suit: "S", rank: "9" },
          { suit: "S", rank: "J" },
          { suit: "H", rank: "J" },
          { suit: "S", rank: "K" },
          { suit: "C", rank: "A" },
          { suit: "D", rank: "A" },
          { suit: "H", rank: "2" },
        ],
        stagingArea: [],
      },
    };
  });

  it("should change the roundType at the start of each round", () => {
    client.moves.cardToStagingArea({ suit: "S", rank: "6" });
    client.moves.cardToStagingArea({ suit: "D", rank: "6" });
    client.moves.playCards();

    G = client.store.getState()["G"];

    expect(G.roundType).toEqual(Combinations.PAIR);
    expect(G.center).toEqual([
      { suit: "S", rank: "6" },
      { suit: "D", rank: "6" },
    ]);
    expect(G.players["0"].hand.length).toBe(11);
    expect(G.players["0"].stagingArea.length).toBe(0);
  });

  it("should not allow plays of not roundType or too low", () => {
    // invalid combination
    client.moves.cardToStagingArea({ suit: "S", rank: "6" });
    client.moves.cardToStagingArea({ suit: "D", rank: "6" });
    client.moves.cardToStagingArea({ suit: "H", rank: "7" });
    client.moves.playCards();
    G = client.store.getState()["G"];
    expect(G.players["0"].stagingArea.length).toBe(3);

    client.moves.cardFromStagingArea({ suit: "H", rank: "7" });
    client.moves.playCards();

    // not a pair
    client.moves.cardToStagingArea({ suit: "C", rank: "5" });
    client.moves.cardToStagingArea({ suit: "H", rank: "6" });

    client.moves.playCards();
    G = client.store.getState()["G"];
    expect(G.players["1"].stagingArea.length).toBe(2);

    client.moves.cardFromStagingArea({ suit: "C", rank: "5" });
    client.moves.cardFromStagingArea({ suit: "H", rank: "6" });

    // not high enough
    client.moves.cardToStagingArea({ suit: "C", rank: "5" });
    client.moves.cardToStagingArea({ suit: "S", rank: "5" });

    client.moves.playCards();
    G = client.store.getState()["G"];
    expect(G.players["1"].stagingArea.length).toBe(2);

    client.moves.cardFromStagingArea({ suit: "C", rank: "5" });
    client.moves.cardFromStagingArea({ suit: "S", rank: "5" });
  });

  it("should allow higher plays of the same roundType", () => {
    client.moves.cardToStagingArea({ suit: "S", rank: "6" });
    client.moves.cardToStagingArea({ suit: "D", rank: "6" });
    client.moves.playCards();

    client.moves.cardToStagingArea({ suit: "C", rank: "T" });
    client.moves.cardToStagingArea({ suit: "H", rank: "T" });

    client.moves.playCards();
    G = client.store.getState()["G"];
    expect(G.roundType).toEqual(Combinations.PAIR);
    expect(G.center).toEqual([
      { suit: "C", rank: "T" },
      { suit: "H", rank: "T" },
    ]);
    expect(G.players["0"].hand.length).toBe(11);
    expect(G.players["1"].hand.length).toBe(11);
  });

  it("should allow chops", () => {
    client.moves.cardToStagingArea({ suit: "S", rank: "2" });
    client.moves.playCards();

    client.moves.cardToStagingArea({ suit: "S", rank: "Q" });
    client.moves.cardToStagingArea({ suit: "C", rank: "Q" });
    client.moves.cardToStagingArea({ suit: "D", rank: "Q" });
    client.moves.cardToStagingArea({ suit: "H", rank: "Q" });

    client.moves.playCards();
    G = client.store.getState()["G"];
    expect(G.roundType).toEqual(Combinations.FOUROFAKIND);
    expect(G.center).toEqual([
      { suit: "S", rank: "Q" },
      { suit: "C", rank: "Q" },
      { suit: "D", rank: "Q" },
      { suit: "H", rank: "Q" },
    ]);
    expect(G.players["0"].hand.length).toBe(12);
    expect(G.players["1"].hand.length).toBe(9);
  });
});
