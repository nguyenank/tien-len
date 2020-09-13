import { Client } from "boardgame.io/client";
import { validCombination } from "../compareCards";

describe("validCombination", () => {
  let sevenSpades = { suit: "S", rank: "7" };
  let eightDiamonds = { suit: "D", rank: "8" };
  let nineClubs = { suit: "C", rank: "9" };
  let nineDiamonds = { suit: "D", rank: "9" };
  let nineHearts = { suit: "H", rank: "9" };
  let tenClubs = { suit: "C", rank: "T" };
  let tenDiamonds = { suit: "D", rank: "T" };
  let tenHearts = { suit: "D", rank: "T" };

  let threeClubs = { suit: "C", rank: "3" };
  let fourSpades = { suit: "S", rank: "4" };
  let twoHearts = { suit: "H", rank: "2" };
  let aceDiamonds = { suit: "D", rank: "A" };
  let kingDiamonds = { suit: "D", rank: "K" };

  it("should allow singles", () => {
    expect(validCombination([nineClubs])).toBe(true);
    expect(validCombination([tenDiamonds])).toBe(true);
  });

  it("should allow pairs", () => {
    expect(validCombination([nineClubs, nineDiamonds])).toBe(true);

    expect(validCombination([tenDiamonds, tenClubs])).toBe(true);
  });

  it("should allow triples", () => {
    expect(validCombination([nineClubs, nineDiamonds, nineHearts])).toBe(true);

    expect(validCombination([tenDiamonds, tenClubs, tenHearts])).toBe(true);
  });

  it("should allow straights of at least length 3", () => {
    expect(validCombination([nineClubs, tenDiamonds, eightDiamonds])).toBe(
      true
    );

    expect(validCombination([twoHearts, fourSpades, threeClubs])).toBe(false);
  });

  it("should not allow straights including a 2", () => {
    expect(validCombination([twoHearts, kingDiamonds, aceDiamonds])).toBe(
      false
    );
  });

  it("should not allow anything not specified above", () => {
    expect(validCombination([])).toBe(false);

    expect(validCombination([nineClubs, tenDiamonds])).toBe(false);

    expect(validCombination([nineDiamonds, tenClubs, tenHearts])).toBe(false);

    expect(validCombination([nineDiamonds, sevenSpades, tenHearts])).toBe(
      false
    );
  });
});
