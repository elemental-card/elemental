const tryDeserializeActionPayloadFromFirestore = (payloadStr) => {
  let payload;
  try {
    payload = JSON.parse(payloadStr);
  } catch (e) {
    return {
      succeeded: false,
      value: new SyntaxError('Unparseable JSON.'),
    };
  }
  if (payload.type === 'ELEMENT') {
    if (['fire', 'water', 'earth', 'air'].includes(payload.value)) {
      return {
        succeeded: true,
        value: payload.value,
      };
    }
    return {
      succeeded: false,
      value: new TypeError('Malformed ELEMENT payload.'),
    };
  }
  if (payload.type === 'BID') {
    if ('number' === typeof payload.value) {
      return {
        succeeded: true,
        value: payload.value,
      };
    }
    return {
      succeeded: false,
      value: new TypeError('Malformed BID payload.'),
    };
  }
  if (payload.type === 'CARD') {
    if (payload.value === ~~payload.value && payload.value >= 0 && payload.value <= 53) {
      if (payload.value === 52) {
        return {
          succeeded: true,
          value: {
            rank: 0,
            element: 'magic',
          },
        };
      }
      if (payload.value === 53) {
        return {
          succeeded: true,
          value: {
            rank: Infinity,
            element: 'magic',
          },
        };
      }
      return {
        succeeded: true,
        value: {
          rank: (payload.value % 13) + 2,
          element: ['fire', 'water', 'earth', 'air'][~~(payload.value / 13)],
        },
      };
    }
    return {
      succeeded: false,
      value: new TypeError('Malformed CARD payload.'),
    };
  }
  return {
    succeeded: false,
    value: new TypeError('Illegal payload type.'),
  };
};

export default tryDeserializeActionPayloadFromFirestore;
