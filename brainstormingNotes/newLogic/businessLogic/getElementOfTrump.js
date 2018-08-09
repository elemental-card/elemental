const getElementOfTrump = (trump) => {
  if (trump.type === 'noTrump') {
    return null;
  }
  if (trump.type === 'card') {
    return trump.value.element;
  }
  if (trump.type === 'dealerChoice') {
    return trump.value;
  }
  throw new Error('Illegal trump enum.');
};

export default getElementOfTrump;
