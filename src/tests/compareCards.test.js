// src/tests/compareCards.test.js

import { Client } from "boardgame.io/client";
import {
  compareCards,
  validCombination,
  validChop,
  compareHighest,
} from "../moves/helper-functions/cardComparison";
import { Combinations } from "../constants.js";

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
describe("compareHighest", () => {
  let nineClubs = { suit: "C", rank: "9" };
  let nineDiamonds = { suit: "D", rank: "9" };
  let tenClubs = { suit: "C", rank: "T" };
  let tenDiamonds = { suit: "D", rank: "T" };

  it("should return -1 if the first list is empty", () => {
    expect(compareHighest([], [])).toBe(-1);
    expect(compareHighest([], [tenDiamonds])).toBe(-1);
  });

  it("should return 1 if the second list is empty and first is non-empty", () => {
    expect(compareHighest([tenDiamonds], [])).toBe(1);
    expect(compareHighest([tenDiamonds, nineClubs], [])).toBe(1);
  });

  it("should compare by the highest card in each set", () => {
    expect(compareHighest([nineClubs], [nineDiamonds])).toBe(-1);
    expect(
      compareHighest([tenDiamonds, nineClubs], [tenClubs, nineDiamonds])
    ).toBe(1);
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
  let fiveDiamonds = { suit: "D", rank: "5" };
  let twoHearts = { suit: "H", rank: "2" };
  let aceDiamonds = { suit: "D", rank: "A" };
  let kingDiamonds = { suit: "D", rank: "K" };

  it("should allow singles", () => {
    expect(validCombination([nineClubs])).toBe(Combinations.SINGLE);
    expect(validCombination([tenDiamonds])).toBe(Combinations.SINGLE);
  });

  it("should allow pairs", () => {
    expect(validCombination([nineClubs, nineDiamonds])).toBe(Combinations.PAIR);

    expect(validCombination([tenDiamonds, tenClubs])).toBe(Combinations.PAIR);
  });

  it("should allow triples", () => {
    expect(validCombination([nineClubs, nineDiamonds, nineHearts])).toBe(
      Combinations.TRIPLE
    );

    expect(validCombination([tenDiamonds, tenClubs, tenHearts])).toBe(
      Combinations.TRIPLE
    );
  });

  it("should allow straights of at least length 3", () => {
    expect(validCombination([nineClubs, tenDiamonds, eightDiamonds])).toBe(
      Combinations.STRAIGHT
    );

    expect(validCombination([fiveDiamonds, fourSpades, threeClubs])).toBe(
      Combinations.STRAIGHT
    );
  });

  it("should not allow straights including a 2", () => {
    expect(validCombination([twoHearts, kingDiamonds, aceDiamonds])).toBe(
      undefined
    );
  });

  it("should not allow anything not specified above", () => {
    expect(validCombination([])).toBe(undefined);

    expect(validCombination([nineClubs, tenDiamonds])).toBe(undefined);

    expect(validCombination([nineDiamonds, tenClubs, tenHearts])).toBe(
      undefined
    );

    expect(validCombination([nineDiamonds, sevenSpades, tenHearts])).toBe(
      undefined
    );
  });
});

describe("validCombination", () => {
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
      validCombination([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        eightSpades,
        eightDiamonds,
      ])
    ).toBe(Combinations.THREEPAIR);
  });

  it("should allow four of a kind", () => {
    expect(
      validCombination([nineClubs, nineDiamonds, nineSpades, nineHearts])
    ).toBe(Combinations.FOUROFAKIND);
    expect(
      validCombination([tenDiamonds, tenClubs, tenSpades, tenHearts])
    ).toBe(Combinations.FOUROFAKIND);
  });

  it("should allow four pairs", () => {
    expect(
      validCombination([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        eightSpades,
        eightDiamonds,
        sevenSpades,
        sevenHearts,
      ])
    ).toBe(Combinations.FOURPAIR);
  });

  it("should not allow anything not specified above", () => {
    expect(validCombination([])).toBe(undefined);

    // not pairs
    expect(
      validCombination([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        nineHearts,
        eightDiamonds,
      ])
    ).toBe(undefined);

    // not consecutive
    expect(
      validCombination([
        nineClubs,
        nineSpades,
        tenHearts,
        tenDiamonds,
        sevenSpades,
        sevenHearts,
      ])
    ).toBe(undefined);

    // no twos
    expect(
      validCombination([
        threeClubs,
        threeSpades,
        fourSpades,
        twoClubs,
        fourHearts,
        twoHearts,
      ])
    ).toBe(undefined);
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

  let twoHearts = { suit: "H", rank: "2" };
  let twoClubs = { suit: "C", rank: "2" };

  it("should allow four pairs to chop a pair of 2's", () => {
    expect(
      validChop(
        [twoHearts, twoClubs],
        [
          nineClubs,
          nineSpades,
          tenHearts,
          tenDiamonds,
          eightSpades,
          eightDiamonds,
          sevenHearts,
          sevenSpades,
        ]
      )
    ).toBe(true);
  });

  it("should not allow any other chop to chop a pair of 2's", () => {
    expect(
      validChop(
        [twoHearts, twoClubs],
        [
          nineClubs,
          nineSpades,
          eightSpades,
          eightDiamonds,
          sevenHearts,
          sevenSpades,
        ]
      )
    ).toBe(false);

    expect(
      validChop(
        [twoHearts, twoClubs],
        [tenHearts, tenDiamonds, tenSpades, tenClubs]
      )
    ).toBe(false);
  });

  it("should allow any chop to chop a single 2", () => {
    expect(
      validChop(
        [twoHearts],
        [
          nineClubs,
          nineSpades,
          tenHearts,
          tenDiamonds,
          eightSpades,
          eightDiamonds,
          sevenHearts,
          sevenSpades,
        ]
      )
    ).toBe(true);

    expect(
      validChop(
        [twoHearts],
        [
          nineClubs,
          nineSpades,
          eightSpades,
          eightDiamonds,
          sevenHearts,
          sevenSpades,
        ]
      )
    ).toBe(true);

    expect(
      validChop([twoHearts], [tenHearts, tenDiamonds, tenSpades, tenClubs])
    ).toBe(true);
  });

  it("should not allow chops on non 2's", () => {
    expect(
      validChop(
        [twoHearts, tenSpades],
        [
          nineClubs,
          nineSpades,
          tenHearts,
          tenDiamonds,
          eightSpades,
          eightDiamonds,
          sevenHearts,
          sevenSpades,
        ]
      )
    ).toBe(false);
  });
});
