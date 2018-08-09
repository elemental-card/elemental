export default (card) => {
  if (card.rank === 0) {
    return 52;
  }
  if (card.rank === Infinity) {
    return 53;
  }
  return
    ((card.rank - 2) % 13) +
    13 * ['fire', 'water', 'earth', 'air'].indexOf(card.element);
};
