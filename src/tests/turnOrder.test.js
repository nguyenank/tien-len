import { Client } from "boardgame.io/client";
import { TienLen } from "../TienLen";

describe("Turn order", () => {
  let client;

  beforeEach(() => {
    client = Client({
      game: TienLen,
    });
  });

  it("should pass to the next player, wrapping around", () => {
    // pass turn along
    client.moves.playCards();

    let { ctx } = client.store.getState();

    expect(ctx.currentPlayer).toEqual("1");

    client.moves.playCards();
    ctx = client.store.getState()["ctx"];
    expect(ctx.currentPlayer).toEqual("2");

    client.moves.playCards();
    ctx = client.store.getState()["ctx"];
    expect(ctx.currentPlayer).toEqual("3");

    client.moves.playCards();
    ctx = client.store.getState()["ctx"];
    let G = client.store.getState()["G"];
    expect(ctx.currentPlayer).toEqual("0");
    expect(G.turnOrder).toEqual([0, 1, 2, 3]);
  });

  describe("skips", () => {
    let G;

    beforeEach(() => {
      G = client.store.getState()["G"];
      G.turnOrder = [0, null, 2, 3];
    });

    it("should skip any players who have passed", () => {
      client.moves.playCards();

      let { ctx } = client.store.getState();

      expect(ctx.currentPlayer).toEqual("2");

      client.moves.playCards();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("3");

      client.moves.playCards(); // player 3 passes
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("0");

      client.moves.playCards();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      G = client.store.getState()["G"];
      expect(G.turnOrder).toEqual([0, null, 2, 3]);
    });

    it("should remove players who pass from the turn order", () => {
      client.moves.playCards();

      let { ctx } = client.store.getState();

      expect(ctx.currentPlayer).toEqual("2");

      client.moves.playCards();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("3");

      client.moves.passTurn(); // player 3 passes
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("0");

      client.moves.playCards();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");

      client.moves.playCards();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("0");
      G = client.store.getState()["G"];
      expect(G.turnOrder).toEqual([0, null, 2, null]);
    });
  });

  describe("tien len", () => {
    let G;
    let ctx;

    beforeEach(() => {
      G = client.store.getState()["G"];
      ctx = client.store.getState()["ctx"];
      ctx.currentPlayer = "1";
      G.turnOrder = [null, 1, 2, null];
    });

    it("should start whenever 1 player is left in turn order", () => {
      client.moves.passTurn();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });
    });

    it("should persist as long as the player makes tien len moves", () => {
      client.moves.passTurn();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });

      client.moves.tienLenPlay();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });

      client.moves.tienLenPlay();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });
    });

    it("should end when the player makes a non-tien len move", () => {
      client.moves.passTurn();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });

      client.moves.tienLenPlay();
      ctx = client.store.getState()["ctx"];
      expect(ctx.currentPlayer).toEqual("2");
      expect(ctx.activePlayers).toEqual({ "2": "tienLen" });

      client.moves.newRoundPlay();
      ctx = client.store.getState()["ctx"];
      G = client.store.getState()["G"];
      expect(ctx.currentPlayer).toEqual("3");
      expect(ctx.activePlayers).toEqual(null);
      expect(G.turnOrder).toEqual([0, 1, 2, 3]);
    });
  });
});
