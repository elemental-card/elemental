export const getCardCodeFromCard = (card) => {
  if (card.rank === 0) {
    return 52;
  }
  if (card.rank === Infinity) {
    return 53;
  }
  return (
    ((card.rank - 1) % 13)
    + (13 * ['fire', 'water', 'earth', 'air'].indexOf(card.element))
  );
};

export const getCardFromCardCode = (cardCode) => {
  if (cardCode === 52) {
    return {
      rank: 0,
      element: 'magic',
    };
  }
  if (cardCode === 53) {
    return {
      rank: Infinity,
      element: 'magic',
    };
  }
  return {
    rank: (cardCode % 13) + 1,
    element: ['fire', 'water', 'earth', 'air'][~~(cardCode / 13)],
  };
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

export const getOrderedDeck = () => {
  const deck = [];
  ['fire', 'water', 'earth', 'air'].forEach((element) => {
    for (let rank = 1; rank <= 13; rank++) {
      deck.push({
        rank,
        element,
      });
    }
  });
  [0, Infinity].forEach((rank) => {
    for (let i = 0; i < 4; i++) {
      deck.push({
        rank,
        element: 'magic',
      });
    }
  });
  return deck;
};

export const canCardBePlayed = (card, playedCards, hand) => {
  if (card.element === 'magic') {
    return true;
  }
  const leadCard = playedCards.find(c => c.rank !== 0);
  const leadElement = leadCard !== undefined ? leadCard.element : null;
  if (leadElement === null || leadElement === 'magic') {
    return true;
  }
  return card.element === leadElement
    || hand.every(c => c.element !== leadElement);
};

export const sortHand = (hand) => hand.slice().sort((a, b) => (
  getMagicFirstCardCodeFromCard(a) - getMagicFirstCardCodeFromCard(b)
));

const getMagicFirstCardCodeFromCard = (card) => {
  const code = getCardCodeFromCard(card);
  if (code === 52) {
    return -2;
  }
  if (code === 53) {
    return -1;
  }
  return code;
};
