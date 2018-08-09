const getDisplayCardOfTrump = (trump) => {
  if (trump.type === 'noTrump') {
    return {
      rank: 0,
      element: 'magic',
    };
  }
  if (trump.type === 'card') {
    return trump.value;
  }
  if (trump.type === 'dealerChoice') {
    return {
      rank: Infinity,
      element: trump.value,
    };
  }
  throw new Error('Illegal trump enum.');
};

export default getDisplayCardOfTrump;
