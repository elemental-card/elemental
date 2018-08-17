# Elemental - The Card Game
A simple trick-taking game built with React and Firebase.

This repository contains the source code for our website
([elemental-card.github.io](https://elemental-card.github.io)).

## Rules
### Deck
The game is played with 60 cards, each with a *rank* and an *element*:

- 13 cards (ranked `1`-`13`) of each of the 4 non-magic elements (`Fire`, `Water`, `Earth`, and `Air`), totaling 52 cards in all
- 4 `0` cards, which have a rank of `0` and element of `Magic`
- 4 `∞` cards, which have a rank of `∞` and element of `Magic`

### Introduction
There can be 3-6 players.



The game is divided into 60/*n* rounds where *n* is the number of players.

The objective of the game is to be the player with the most points at the end of the final round.

To begin the game, choose a dealer and then begin Round 1.

### Rounds
#### Dealing
At the beginning of each round, the dealer deals *n* cards to each player where *n* is the round number (for example, on Round 1, each player would be dealt 1 card).

#### Determining trump
The dealer then flips the top card of the deck face-up. This card will determine the *trump element*:

If a `0` is flipped, then there is no trump element.

If an `∞` is flipped, then the dealer must immediately pick a element to be trump (they cannot choose no trump).

Otherwise, the trump element is the element of the flipped card.

On the final round of the game, the entire deck will be dealt, so there will be no top card to flip. Because of this, the final round must be played with no trump element.

#### Bidding
Then, starting with the player left of the dealer, each player makes a *bid*, which is a prediction of how many *tricks* they will win.

Players must bid sequentially, and bids cannot be changed once they are made.

After each player has made their bid, the player left of the dealer leads the first trick.

#### Tricks
##### Leading
The first person in each trick may play any card in their hand. This card will determine the *lead element* of the trick.

If they play a `0`, the next player may play any card in their hand, and that card will determine the lead element.

If they play an `∞`, then there is no lead element for this trick, meaning every player can play any card in their hand.

Otherwise, the lead element is the element of the card played.
##### Following
After a lead element (or lack thereof) is determined, each player must do exactly one of the following:
- Play a `Magic` card (`0` or `∞`)
- Play a card that is the same element as the lead element (for example, if a `7 of Fire` was lead, `11 of Fire` would be a legal play)
- If the player has no cards in their hand with the same element as the lead element, they may play any card in their hand.

##### Determining Who Wins the Trick
If any `∞`s were played, then the player who played the first `∞` wins.

Otherwise, if any cards of the trump element were played, then the player who played the highest ranking card of the trump element wins.

Otherwise, if there is no lead element (because every player played a `0`), then the first player wins.

Otherwise, the player who played the highest ranking card of the lead element wins.

The played cards (referred to as the trick) are turned face down and given to the winner of the trick.

The winner leads the next round, repeating this cycle until there are no cards left in each player's hand.

##### End-of-round Scoring
Each player that won tricks exactly equal to their bid gains 20+10*n* points
where *n* is their bid.

Each player who won either too many or too few tricks loses 10*n* points where *n* is the absolute value of the difference between their bid and the number of tricks they won.

The next round is then begun, with the player left of the dealer as the new dealer.

## License
MIT
