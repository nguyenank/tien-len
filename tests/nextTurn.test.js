import { Client } from "boardgame.io/client";
import { TienLen } from "../src/TienLen";

describe("nextTurn", () => {
  it("should pass the turn to the correct player", () => {
    // original state
    const client = Client({
      game: TienLen,
    });
    // pass turn along
    client.moves.playCards();

    const { G, ctx } = client.store.getState();

    expect(G.activePlayers).toEqual([0, 1, 2, 3]);
    expect(ctx.currentPlayer).toEqual("1");
  });
});
