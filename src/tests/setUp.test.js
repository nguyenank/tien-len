// src/tests/setUp.test.js

import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";
import { compareCards } from "../moves/compareCards";
const _ = require("lodash");

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

  it("should not have duplicated any cards", () => {
    let hands = _.concat(
      G.hands["0"],
      G.hands["1"],
      G.hands["2"],
      G.hands["3"]
    );

    expect(_.uniqWith(hands).length).toBe(52);
  });
});
