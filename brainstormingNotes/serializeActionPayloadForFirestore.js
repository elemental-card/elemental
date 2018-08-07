const serializeActionPayloadForFirestore = (payload) => {
  if (payload.type === 'ELEMENT') {
    return JSON.stringify(payload);
  }
  if (payload.type === 'BID') {
    return JSON.stringify(payload);
  }
  if (payload.type === 'CARD') {
    const card = payload.value;
    const cardCode = card.rank === 0
      ? 52
      : card.rank === Infinity
        ? 53
        : (card.rank - 2) + (['fire', 'water', 'earth', 'air'].indexOf(card.element) * 13);
    return JSON.stringify({
      type: 'CARD',
      value: cardCode,
    });
  }
  throw new TypeError('Illegal payload type.');
};

export default serializeActionPayloadForFirestore;
