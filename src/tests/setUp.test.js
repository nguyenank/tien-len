// src/tests/setUp.test.js

import { Client } from "boardgame.io/client";
import { default as TienLen } from "../TienLen";
import { compareCards } from "../moves/helper-functions/cardComparison";
const _ = require("lodash");

describe("setUp", () => {
  let G;

  beforeEach(() => {
    let client = Client({
      game: TienLen,
      numPlayers: 4,
    });
    G = client.store.getState()["G"];
  });

  it("should give each player 13 cards", () => {
    for (let player in G.players) {
      let hand = G.players[player].hand;
      expect(hand.length).toBe(13);
    }
  });

  it("should sort the cards in each hand by ascending rank then suit", () => {
    for (let player in G.players) {
      let hand = G.players[player].hand;
      expect(hand).toEqual(hand.sort(compareCards));
    }
  });

  it("should not have duplicated any cards", () => {
    let hands = _.concat(
      G.players["0"].hand,
      G.players["1"].hand,
      G.players["2"].hand,
      G.players["3"].hand
    );

    expect(_.uniqWith(hands).length).toBe(52);
  });
});
