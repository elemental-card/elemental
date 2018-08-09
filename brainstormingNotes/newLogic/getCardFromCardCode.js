export default (cardCode) => {
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
    rank: (cardCode % 13) + 2,
    element: ['fire', 'water', 'earth', 'air'][~~(cardCode / 13)],
  };
};
