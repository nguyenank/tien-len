import { Constants } from "./constants";

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
