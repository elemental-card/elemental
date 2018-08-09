const appStates = loginStandby
  || home
  || chooseLobbyToJoin
  || chooseInitialsForCreating
  || chooseInitialsForJoining
  || startLobby
  || waitForHostToStart
  || chooseTrumpElement
  || waitForTrumpElementToBeChosen
  || trumpElementResult
  || chooseBid
  || waitForOpponentsToChooseBid
  || bidResults
  || chooseCard
  || waitForOpponentsToChooseCard
  || trickResults
  || handResults
  || gameResults;

const loginStandby = {};

const home = {
  uid: 'string',
  create() {},
  browse() {},
};

const chooseLobbyToJoin = {
  uid: 'string',
  hostsOfLobbies: ['player'],
  tentativePlayer: option('player'),
  selectTentativePlayer(player) {},
  confirmTentativePlayer() {},
  back() {},
};

const chooseInitialsForCreating = {
  uid: 'string',
  tentativeInitials: 'string',
  editTentativeInitials(initials) {},
  confirmTentativeInitials() {},
  back() {},
};

const chooseInitialsForJoining = {
  uid: 'string',
  hostUid: 'string',
  tentativeInitials: 'string',
  editTentativeInitials(initials) {},
  confirmTentativeInitials() {},
  back() {},
};

const startLobby = {
  uid: 'string',
  roomState: 'roomState',
  start() {},
  destroyLobby() {},
};

const waitForHostToStart = {
  uid: 'string',
  roomState: 'roomState',
  leave() {},
};

const chooseTrumpElement = {
  uid: 'string',
  roomState: 'roomState',
  tentativeElement: option('string'),
  selectTentativeElement() {},
  confirmTentativeElement() {},
};

const waitForTrumpElementToBeChosen = {
  uid: 'string',
  roomState: 'roomState',
};

const trumpElementResult = {
  uid: 'string',
  roomState: 'roomState',
  accept() {},
};

const chooseBid = {
  uid: 'string',
  roomState: 'roomState',
  tentativeBid: 'number',
  selectTentativeBid(bid) {},
  confirmTentativeBid() {},
};

const waitForOpponentsToChooseBid = {
  uid: 'string',
  roomState,
};

const bidResults = {
  uid: 'string',
  roomState,
  accept() {},
};

const chooseCard = {
  uid: 'string',
  roomState,
  tentativeCardIndex: 'number',
  selectTentativeCardIndex(index) {},
  confirmTentativeCardIndex() {},
};

const waitForOpponentsToChooseCard = {
  uid: 'string',
  roomState,
};

const trickResults = {
  uid: 'string',
  roomState,
  accept() {},
};

const handResults = {
  uid: 'string',
  roomState,
  accept() {},
};

const gameResults = {
  uid: 'string',
  roomState,
  accept() {},
};

// TODO reconsider results states
