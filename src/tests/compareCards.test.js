import { Client } from "boardgame.io/client";
import { compareCards, validCombination, validChop } from "../compareCards";

describe("compareCards", () => {
  let nineClubs = { suit: "C", rank: "9" };
  let nineDiamonds = { suit: "D", rank: "9" };
  let tenClubs = { suit: "C", rank: "T" };
  let tenDiamonds = { suit: "D", rank: "T" };

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

describe("validCombination", () => {
  let sevenSpades = { suit: "S", rank: "7" };
  let eightDiamonds = { suit: "D", rank: "8" };
  let nineClubs = { suit: "C", rank: "9" };
  let nineDiamonds = { suit: "D", rank: "9" };
  let nineHearts = { suit: "H", rank: "9" };
  let tenClubs = { suit: "C", rank: "T" };
  let tenDiamonds = { suit: "D", rank: "T" };
  let tenHearts = { suit: "H", rank: "T" };

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

describe("validChop", () => {
  let sevenSpades = { suit: "S", rank: "7" };
  let sevenHearts = { suit: "H", rank: "7" };
  let eightSpades = { suit: "S", rank: "8" };
  let eightDiamonds = { suit: "D", rank: "8" };
  let nineSpades = { suit: "S", rank: "9" };
  let nineClubs = { suit: "C", rank: "9" };
  let nineDiamonds = { suit: "D", rank: "9" };
  let nineHearts = { suit: "H", rank: "9" };
  let tenSpades = { suit: "S", rank: "T" };
  let tenClubs = { suit: "C", rank: "T" };
  let tenDiamonds = { suit: "D", rank: "T" };
  let tenHearts = { suit: "H", rank: "T" };

  let threeClubs = { suit: "C", rank: "3" };
  let fourSpades = { suit: "S", rank: "4" };
  let twoHearts = { suit: "H", rank: "2" };
  let threeSpades = { suit: "S", rank: "3" };
  let fourHearts = { suit: "H", rank: "4" };
  let twoClubs = { suit: "C", rank: "2" };

  it("should allow three pairs", () => {
    expect(
      validChop([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        eightSpades,
        eightDiamonds,
      ])
    ).toBe(true);
  });

  it("should allow four of a kind", () => {
    expect(validChop([nineClubs, nineDiamonds, nineSpades, nineHearts])).toBe(
      true
    );
    expect(validChop([tenDiamonds, tenClubs, tenSpades, tenHearts])).toBe(true);
  });

  it("should allow four pairs", () => {
    expect(
      validChop([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        eightSpades,
        eightDiamonds,
        sevenSpades,
        sevenHearts,
      ])
    ).toBe(true);
  });

  it("should not allow anything not specified above", () => {
    expect(validChop([])).toBe(false);

    // not pairs
    expect(
      validChop([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        nineHearts,
        eightDiamonds,
      ])
    ).toBe(false);

    // not consecutive
    expect(
      validChop([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        sevenSpades,
        sevenHearts,
      ])
    ).toBe(false);

    // no twos
    expect(
      validChop([
        threeClubs,
        threeSpades,
        fourSpades,
        twoClubs,
        fourHearts,
        twoHearts,
      ])
    ).toBe(false);
  });
});
