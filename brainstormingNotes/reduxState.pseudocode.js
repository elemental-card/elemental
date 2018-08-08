// Pseudocode

const reduxState = home
  || createRoom
  || browseRooms
  || joinRoom
  || startGame
  || waitForGameToBeStarted
  || choosingTrump
  || waitingForTrumpToBeChosen
  || bidding
  || waitingForPlayersToBid
  || lookingAtLastBid
  || choosingCard // DONE-ISH TODO prevent revokes
  || waitingForCardToBeChosen // DONE
  || lookingAtLastCardOfTrick
  || lookingAtScoreChanges
  || lookingAtFinalScores;

const home = {
  createRoom() {},
  browseRooms() {},
};

const createRoom = {
  hostName: 'string',
  back() {},
  editHostName(value) {},
  create() {},
};

const browseRooms = {
  back() {},
  joinRoom(hostName) {},
};

const joinRoom = {
  hostName: 'string',
  guestName: 'string',
  back() {},
  editGuestName(value) {},
  join() {},
};

const startGame = {
  hostName: 'string',
  guests: ['string'],
  start() {},
};

const waitForGameToBeStarted = {
  hostName: 'string',
  ownName: 'string',
  guests: ['string'],
};

const choosingTrump = {
  ownName: 'string',
  gameState: 'gameState',
  tentativeTrump: option('string'),
  selectTentative(element) {},
  confirmTentative() {},
};

const waitingForTrumpToBeChosen = {
  ownName: 'string',
  gameState: 'gameState',
};

const bidding = {
  ownName: 'string',
  gameState: 'gameState',
  tentativeBid: 'number',
  editTentative(number) {},
  confirmTentative() {},
};

const waitingForPlayersToBid = {
  ownName: 'string',
  gameState: 'gameState',
};

const lookingAtLastBid = {
  ownName: 'string',
  viewedGameState: 'gameState',
  gameState: 'gameState',
  next() {},
};

const choosingCard = {
  ownName: 'string',
  gameState: 'gameState',
  tentativeCard: option('card'),
  selectTentative(card) {},
  confirmTentative() {},
};

const waitingForCardToBeChosen = {
  ownName: 'string',
  gameState: 'gameState',
};

const lookingAtLastCardOfTrick = {
  ownName: 'string',
  viewedGameState: 'gameState',
  gameState: 'gameState',
  next() {},
};

const lookingAtScoreChanges = {
  ownName: 'string',
  viewedGameState: 'gameState',
  gameState: 'gameState',
  next() {},
};

const lookingAtFinalScores = {
  ownName: 'string',
  viewedGameState: 'gameState',
  gameState: 'gameState',
  next() {},
};
