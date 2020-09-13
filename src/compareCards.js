import { Constants } from "./constants";

const _ = require("lodash");

export function compareCards(card1, card2) {
  let SUITS = Constants.SUITS;
  let RANKS = Constants.RANKS;

  // compare by ranks first
  let rank1Position = RANKS.indexOf(card1.rank);
  let rank2Position = RANKS.indexOf(card2.rank);
  if (rank1Position > rank2Position) {
    return 1;
  } else if (rank1Position < rank2Position) {
    return -1;
  } else {
    let suit1Position = SUITS.indexOf(card1.suit);
    let suit2Position = SUITS.indexOf(card2.suit);

    if (suit1Position > suit2Position) {
      return 1;
    } else if (suit1Position < suit2Position) {
      return -1;
    }
  }
  return 0;
}

export function validCombination(cards) {
  let RANKS = Constants.RANKS;

  if (cards.length === 1) {
    // single
    return true;
  } else if (
    cards.length === 2 &&
    cards.every(card => card.rank === cards[0].rank)
  ) {
    // pair
    return true;
  } else if (
    cards.length === 3 &&
    cards.every(card => card.rank === cards[0].rank)
  ) {
    // triple
    return true;
  } else if (cards.length >= 3) {
    // straight
    cards.sort(compareCards);
    let ranks = cards.map(card => card.rank);
    // going to remove 2, so adjust index in advance
    let firstIndex = RANKS.indexOf(ranks[0]) - 1;
    if (
      _.isEqual(
        _.tail(RANKS) // remove 2
          .slice(firstIndex, firstIndex + ranks.length),
        ranks
      )
    ) {
      return true;
    }
  }
  return false;
}

export function validChop(cards) {}
