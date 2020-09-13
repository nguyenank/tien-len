import { Client } from "boardgame.io/client";
import { TienLen, sortCards } from "../TienLen";

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

  it("should sort the cards by ascending rank then suit", () => {});
});
