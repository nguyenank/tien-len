import React from "react";

export default function Rules() {
  return (
    <div>
      <h1 id="rules-of-ti-n-l-n">Rules of Tiến Lên</h1>
      <p>
        <em>Tiến Lên</em> is a card game for 4 players. There are many rules
        that differ among play groups; these are the rules my family uses. The
        object of the game is to get rid of all of the cards in your hand.
      </p>
      <h2 id="cards">Cards</h2>
      <p>
        Tiến Lên uses a standard, 52-card deck. The cards are ranked, from low
        to high: 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2. The cards are also
        ranked based on suits, from low to high: spades (♠), clubs (♣), diamonds
        (<span className="red-suit">♦</span>), hearts (
        <span className="red-suit">♥</span>). Thus, the 3♠ is the lowest ranked
        card in the game, and the 2<span className="red-suit">♥</span> is the
        highest ranked card in the game. When ranking cards, rank takes priority
        over suit: a 3<span className="red-suit">♥</span> is higher than a 3
        <span className="red-suit">♦</span>, but a 4♠ is higher than both of
        them.
      </p>
      <h2 id="setup">Setup</h2>
      <p>
        For the first game, the player with the 3♠ starts, and must start play
        using the 3♠.
        {/* For every game after, the winner of the previous game
        starts, with no restrictions on their starting play. Play then continues
        counter-clockwise from whoever started. */}
      </p>
      <h2 id="playing-the-game">Playing the Game</h2>
      <p>
        The starting player starts a round by playing from their hand some
        combination of cards to the center of the table. There are 4 standard
        types of combinations:
      </p>
      <h4 id="standard-combinations">Standard Combinations</h4>
      <ul>
        <li>
          <strong>single</strong> - a single card (ex. 6
          <span className="red-suit">♦</span>)
        </li>
        <li>
          <strong>pair</strong> - two cards of the same rank (ex. 5♠ 5
          <span className="red-suit">♦</span>)
        </li>
        <li>
          <strong>triple</strong> - three cards of the same rank (ex. 8♠ 8
          <span className="red-suit">♦</span> 8
          <span className="red-suit">♥</span>)
        </li>
        <li>
          <strong>straight</strong> - at least three cards of consecutive rank
          (9♠ 10<span className="red-suit">♥</span> J
          <span className="red-suit">♦</span> Q
          <span className="red-suit">♦</span>); 2&#39;s cannot be included in
          straights
        </li>
      </ul>
      <p>
        The next player can then play a combination that beats the combination
        in the center, or pass.
      </p>
      <h3 id="beating-a-combination">Beating a Combination</h3>
      <p>
        A combination can only be beat by a combination of the same type with a
        higher highest-ranked card in the combination. For example, the pair 7♠
        7<span className="red-suit">♥</span> beats the pair 7♣ 7
        <span className="red-suit">♦</span>, because the highest card of the
        former pair (7<span className="red-suit">♥</span>) is higher than the
        highest card of the latter pair (7<span className="red-suit">♦</span>).
      </p>
      <p>
        For straights, the number of cards in the straight is part of the kind
        of combination, so a 5-card straight can only be beaten by another
        5-card straight.
      </p>
      <h3 id="passing">Passing</h3>
      <p>
        If a player cannot or does not want to beat the combination in the
        center, they may pass. When a player passes, they may not play any more
        cards until a new round begins; play will simply skip over them as it
        goes around the table.
      </p>
      <h3 id="ti-n-l-n">Tiến Lên</h3>
      <p>
        When every player has passed in a round except for one, that remaining
        player may <em>tiến lên</em> (go forward) by playing 1 or more
        combinations to the center that beat the combination currently in the
        center. When a player is in <em>tiến lên</em>, other players may not
        play any cards. For example, if player A is the last remaining player in
        a round, with the pair 6<span className="red-suit">♦</span> 6
        <span className="red-suit">♥</span> in the middle, player A may play the
        pair 8♠ 8<span className="red-suit">♥</span> and then the pair 10♠ 10
        <span className="red-suit">♦</span> and stay in <em>tiến lên</em>, so no
        player may attempt to beat either of those pairs. Note that player A
        could not play those pairs in the opposite order and stay in{" "}
        <em>tiến lên</em>: if player A played the pair 10♠ 10
        <span className="red-suit">♦</span> first, then the pair 8♠ 8
        <span className="red-suit">♥</span> does not beat the combination
        currently in the center (10♠ 10<span className="red-suit">♦</span>) and
        could not be played while staying in <em>tiến lên</em>.
      </p>
      <p>
        Whether the remaining player plays any cards in <em>tiến lên</em>, that
        player will then start a new round of play by playing some combination
        of cards to the center.
      </p>
      <h3 id="chops">Chops</h3>
      <p>
        Chops are special combinations of cards that beat 2&#39;s, the highest
        cards in the game. There are 3 types of chops:
      </p>
      <ul>
        <li>
          <strong>3 consecutive pairs</strong> - three pairs of cards, with the
          pairs being of consecutive rank (ex. 6
          <span className="red-suit">♦</span> 6
          <span className="red-suit">♥</span> 7
          <span className="red-suit">♦</span> 7
          <span className="red-suit">♥</span> 8♠ 8
          <span className="red-suit">♦</span>); beats any single 2
        </li>
        <li>
          <strong>4 of a kind</strong> - four cards of the same rank (ex. 5♠ 5♣
          5<span className="red-suit">♦</span> 5
          <span className="red-suit">♥</span>
          ), beats any single 2
        </li>
        <li>
          <strong>4 consecutive pairs</strong> - four pairs of cards, with the
          pairs being of consecutive rank (ex. 6
          <span className="red-suit">♦</span> 6
          <span className="red-suit">♥</span> 7
          <span className="red-suit">♦</span> 7
          <span className="red-suit">♥</span> 8♠ 8
          <span className="red-suit">♦</span> 9♣ 9
          <span className="red-suit">♦</span>), beats any single 2 or any pair
          of 2&#39;s
        </li>
      </ul>
      <p>
        Chops can only be played to beat a 2 (or pair of 2&#39;s, for 4
        consecutive pairs) or to start a round. Therefore, during a round of
        single cards, a chop can be played to beat a 2♠, but not an A
        <span className="red-suit">♥</span>.
      </p>
      <p>
        Chops can be beaten like any other combination, following the identical
        same type, highest card rule.
      </p>
      <h2 id="winning">Winning</h2>
      <p>
        When a player runs out of cards in their hand, they win. When a player
        wins, other players continue play as normal, essentially skipping that
        player during play. If the player finished during <em>tiến lên</em> or
        all other players pass the final combination that player played, the
        next player counter-clockwise starts a new round.
      </p>
      <p>
        The game continues until there is only one player left with cards in
        their hand. Rankings are based on when players run out of cards in their
        hand compared to the others; i.e. the first player to run out of cards
        is first place for that game, the second player to do so is second, the
        third is third, and the player with cards remaining at the end of the
        game is fourth.
      </p>
      <h2 id="miscellaneous">Miscellaneous</h2>
      <p>
        Typically players do not have to disclose how many cards they have in
        their hand at any point, but players may agree to be honest beforehand.
        In this implementation, cards in hand is open information.
      </p>
      <p>
        Traditionally the fourth-placed player of each game shuffles and deals
        for the next game.
      </p>
      <p>
        Some of the terminology in these rules (notably, <em>combination</em>,{" "}
        <em>round</em>, <em>center</em>) are used for clarity in these rules,
        but are not normally used in describing/playing.
      </p>
      <p>
        Some traditional terminology used in my family not mentioned in these
        rules:
      </p>
      <ul>
        <li>
          <em>trash</em> - cards in a hand that do not fit into a multi-card
          combination
        </li>
        <li>
          <em>winner</em> - the player who places first in a game, may be said
          to have <em>won</em>
        </li>
        <li>
          <em>loser</em> - the player who places fourth in a game, may be said
          to have <em>lost</em>
        </li>
      </ul>
    </div>
  );
}
