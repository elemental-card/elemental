const getElementOfTrump = (trump) => {
  if (trump.type === 'zero' || trump.type === 'noCard') {
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
