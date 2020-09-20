// src/tests/setUp.test.js

import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";
import { compareCards } from "../compareCards";

describe("setUp", () => {
  let G;

  beforeEach(() => {
    let client = Client({
      game: TienLen,
    });
    G = client.store.getState()["G"];
  });

  it("should give each player 13 cards", () => {
    for (let player in G.hands) {
      let hand = G.hands[player];
      expect(hand.length).toBe(13);
    }
  });

  it("should sort the cards in each hand by ascending rank then suit", () => {
    for (let player in G.hands) {
      let hand = G.hands[player];
      expect(hand).toEqual(hand.sort(compareCards));
    }
  });
});
