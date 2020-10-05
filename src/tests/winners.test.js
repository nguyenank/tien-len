// src/tests/playCards.test.js

import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";
import { Combinations } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";

describe("winners", () => {
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
          { suit: "C", rank: "2" },
          { suit: "D", rank: "2" },
        ],
        stagingArea: [],
      },
      "1": {
        hand: [{ suit: "H", rank: "K" }],
        stagingArea: [],
      },
      "2": {
        hand: [{ suit: "H", rank: "A" }],
        stagingArea: [],
      },
      "3": {
        hand: [{ suit: "H", rank: "2" }],
        stagingArea: [],
      },
    };
  });

  it("should be added to every time a player runs out of cards", () => {
    client.moves.passTurn();
    client.moves.cardToStagingArea({ suit: "H", rank: "K" });
    client.moves.playCards();

    G = client.store.getState()["G"];
    expect(G.winners).toEqual(["1"]);

    client.moves.cardToStagingArea({ suit: "H", rank: "A" });
    client.moves.playCards();

    G = client.store.getState()["G"];
    expect(G.winners).toEqual(["1", "2"]);
  });

  it("should be added to even when the player is in tien len", () => {
    client.moves.cardToStagingArea({ suit: "C", rank: "2" });
    client.moves.playCards();
    client.moves.passTurn();
    client.moves.passTurn();
    client.moves.passTurn();

    let ctx = client.store.getState()["ctx"];
    expect(ctx.activePlayers[0]).toEqual("tienLen");

    client.moves.cardToStagingArea({ suit: "D", rank: "2" });
    client.moves.tienLenPlay();

    G = client.store.getState()["G"];
    ctx = client.store.getState()["ctx"];
    expect(G.winners).toEqual(["0"]);
    expect(ctx.currentPlayer).toEqual("1");
  });

  describe("turn order", () => {
    let G;
    let ctx;
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
            { suit: "H", rank: "4" },
            { suit: "H", rank: "K" },
            { suit: "H", rank: "2" },
          ],
          stagingArea: [],
        },
        "1": {
          hand: [{ suit: "H", rank: "K" }],
          stagingArea: [],
        },
        "2": {
          hand: [{ suit: "H", rank: "A" }],
          stagingArea: [],
        },
        "3": {
          hand: [
            { suit: "C", rank: "2" },
            { suit: "H", rank: "5" },
          ],
          stagingArea: [],
        },
      };
    });

    it("should skip players who have won", () => {
      client.moves.cardToStagingArea({ suit: "H", rank: "4" });
      client.moves.playCards();

      client.moves.cardToStagingArea({ suit: "H", rank: "K" });
      client.moves.playCards();

      client.moves.cardToStagingArea({ suit: "H", rank: "A" });
      client.moves.playCards();

      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("3");

      client.moves.cardToStagingArea({ suit: "C", rank: "2" });
      client.moves.playCards();

      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("0");

      client.moves.cardToStagingArea({ suit: "H", rank: "2" });
      client.moves.playCards();

      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("3");
    });

    it("should pass to the next player on if no clear next player", () => {
      client.moves.cardToStagingArea({ suit: "H", rank: "4" });
      client.moves.playCards();

      client.moves.cardToStagingArea({ suit: "H", rank: "K" });
      client.moves.playCards();
      G = client.store.getState()["G"];
      expect(G.turnOrder).toEqual([0, "W", 2, 3]);

      client.moves.cardToStagingArea({ suit: "H", rank: "A" });
      client.moves.playCards();
      G = client.store.getState()["G"];
      expect(G.turnOrder).toEqual([0, null, "W", 3]);

      client.moves.passTurn(); // player 3 passes
      G = client.store.getState()["G"];
      expect(G.turnOrder).toEqual([0, null, "W", null]);
      client.moves.passTurn(); // player 1 passes
      ctx = client.store.getState()["ctx"];
      G = client.store.getState()["G"];
      expect(ctx.currentPlayer).toEqual("3");
      expect(G.turnOrder).toEqual([0, null, null, 3]);
    });
  });
});
