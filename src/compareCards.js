import { Suits, Ranks, Combinations } from "./constants";

const _ = require("lodash");

export function compareCards(card1, card2) {
  /*
    For two cards, returns 1 if if card1 is higher than card2,
    0 if they are the same, and -1 if card1 is lower than card2
  */

  // compare by ranks first
  let rank1Position = Ranks.indexOf(card1.rank);
  let rank2Position = Ranks.indexOf(card2.rank);
  if (rank1Position > rank2Position) {
    return 1;
  } else if (rank1Position < rank2Position) {
    return -1;
  } else {
    let suit1Position = Suits.indexOf(card1.suit);
    let suit2Position = Suits.indexOf(card2.suit);

    if (suit1Position > suit2Position) {
      return 1;
    } else if (suit1Position < suit2Position) {
      return -1;
    }
  }
  return 0;
}

export function validCombination(cards) {
  /*
    for an array of cards, returns true if
    the combination is a normal combination
  */

  if (cards.length === 1) {
    // single
    return Combinations.SINGLE;
  } else if (
    cards.length === 2 &&
    cards.every(card => card.rank === cards[0].rank)
  ) {
    // pair
    return Combinations.PAIR;
  } else if (
    cards.length === 3 &&
    cards.every(card => card.rank === cards[0].rank)
  ) {
    // triple
    return Combinations.TRIPLE;
  } else if (cards.length >= 3 && cards.every(card => card.rank !== "2")) {
    // straight
    cards.sort(compareCards);
    let ranks = cards.map(card => card.rank);
    if (consecutive(ranks)) {
      return Combinations.STRAIGHT;
    }
  }
  return undefined;
}

export function validChop(cards) {
  // cannot be 2's in a chop
  if (cards.some(card => card.rank === 2)) {
    return undefined;
  }
  // four of a kind
  if (cards.length === 4 && cards.every(card => card.rank === cards[0].rank)) {
    return Combinations.FOUROFAKIND;
  }
  // three or four pair
  let groupedCards = _.groupBy(cards, "rank");
  // only pairs
  let onlyPairs = _.every(groupedCards, card => {
    return card.length === 2;
  });
  // consecutiveSuits
  cards.sort(compareCards);
  let ranks = _.uniq(cards.map(card => card.rank));
  let consecutiveSuits = consecutive(ranks);

  if (onlyPairs && consecutiveSuits) {
    if (cards.length === 6) {
      return Combinations.THREEPAIR;
    } else if (cards.length === 8) {
      return Combinations.FOURPAIR;
    }
  }
  return undefined;
}

function consecutive(ranks) {
  let firstIndex = Ranks.indexOf(ranks[0]);
  return _.isEqual(Ranks.slice(firstIndex, firstIndex + ranks.length), ranks);
}
