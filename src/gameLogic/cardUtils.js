export const generateOrderedDeck = () => {
  const deck = [];
  for (const element of ['fire', 'water', 'earth', 'air']) {
    for (let rank = 2; rank <= 14; rank++) {
      deck.push({
        rank,
        element,
      });
    }
  }
  for (const rank of [0, Infinity]) {
    for (let i = 0; i < 4; i++) {
      deck.push({
        rank,
        element: 'magic',
      });
    }
  }
  return deck;
};

export const getWinnerIndex = (playedCards, trumpElementOrNull) => {
  const infinityIndex = playedCards.findIndex(c => c.rank === Infinity);
  if (infinityIndex !== -1) {
    return infinityIndex;
  }

  let highestTrumpIndex = -1;
  let highestTrumpRank = 0;
  for (let i = 0; i < playedCards.length; i++) {
    const card = playedCards[i];
    if (card.element === trumpElementOrNull && card.rank > highestTrumpRank) {
      highestTrumpIndex = i;
      highestTrumpRank = card.rank;
    }
  }
  if (highestTrumpIndex !== -1) {
    return highestTrumpIndex;
  }

  const leadCard = playedCards.find(c => c.rank !== 0);
  if (leadCard === undefined) {
    return 0;
  }
  const leadElement = leadCard.element;
  let highestLeadIndex = -1;
  let highestLeadRank = 0;
  for (let i = 0; i < playedCards.length; i++) {
    const card = playedCards[i];
    if (card.element === leadElement && card.rank > highestLeadRank) {
      highestLeadIndex = i;
      highestLeadRank = card.rank;
    }
  }
  if (highestLeadIndex !== -1) {
    return highestLeadIndex;
  }
  throw new Error('Impossible outcome: nobody won the trick.');
};
