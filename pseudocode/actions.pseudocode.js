const action = join
  || leave
  || hostStart
  || chooseTrumpElement
  || chooseBid
  || chooseCard;

const join = {
  author: 'string',
  name: 'string',
};

const leave = {
  author: 'string',
};

const hostStart = {
  author: 'string',
  prngState: Int32Array,
};

const chooseTrumpElement = {
  author: 'string',
  element: 'string',
};

const chooseBid = {
  author: 'string',
  bid: 'number',
};

const chooseCard = {
  author: 'string',
  card: 'number',
};
