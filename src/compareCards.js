import { Constants } from "./constants";

const _ = require("lodash");

export function compareCards(card1, card2) {
  /*
    For two cards, returns 1 if if card1 is higher than card2,
    0 if they are the same, and -1 if card1 is lower than card2
  */
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
  /*
    for an array of cards, returns true if
    the combination is a normal combination
  */
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
  } else if (cards.length >= 3 && cards.every(card => card.rank !== "2")) {
    // straight
    cards.sort(compareCards);
    let ranks = cards.map(card => card.rank);
    return consecutive(ranks);
  }
  return false;
}

export function validChop(cards) {
  // cannot be 2's in a chop
  if (cards.some(card => card.rank === 2)) {
    return false;
  }
  // four of a kind
  if (cards.length === 4) {
    return cards.every(card => card.rank === cards[0].rank);
  }
  // three or four pair
  if (cards.length === 6 || cards.length === 8) {
    let groupedCards = _.groupBy(cards, "rank");
    // only pairs
    let onlyPairs = _.every(groupedCards, card => {
      return card.length === 2;
    });
    // consecutive
    let RANKS = Constants.RANKS;
    cards.sort(compareCards);
    let ranks = _.uniq(cards.map(card => card.rank));
    let consecutive = consecutive(ranks);

    return onlyPairs && consecutive;
  }
  return false;
}

function consecutive(ranks) {
  let firstIndex = RANKS.indexOf(ranks[0]);
  return _.isEqual(RANKS.slice(firstIndex, firstIndex + ranks.length), ranks);
}
