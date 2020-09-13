import { Client } from "boardgame.io/client";
import { compareCards } from "../compareCards";

describe("compareCards", () => {
  let nineClubs;
  let nineDiamonds;
  let tenClubs;
  let tenDiamonds;
  beforeEach(() => {
    nineClubs = { suit: "C", rank: "9" };
    nineDiamonds = { suit: "D", rank: "9" };
    tenClubs = { suit: "C", rank: "T" };
    tenDiamonds = { suit: "D", rank: "T" };
  });
  it("should first compare by rank", () => {
    expect(compareCards(nineClubs, tenClubs)).toBe(-1);
    expect(compareCards(nineClubs, tenDiamonds)).toBe(-1);

    expect(compareCards(tenClubs, nineDiamonds)).toBe(1);
    expect(compareCards(tenDiamonds, nineDiamonds)).toBe(1);
  });

  it("should then compare by rank", () => {
    expect(compareCards(nineClubs, nineDiamonds)).toBe(-1);

    expect(compareCards(tenDiamonds, tenClubs)).toBe(1);
  });

  it("should return 0 for identical cards", () => {
    expect(compareCards(nineClubs, nineClubs)).toBe(0);

    expect(compareCards(tenDiamonds, tenDiamonds)).toBe(0);
  });
});
