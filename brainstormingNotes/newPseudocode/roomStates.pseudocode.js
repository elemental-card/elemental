const roomStates = lobby
  || playing;

const lobby = {
  hostName: 'string',
  players: [
    {
      uid: 'string',
      name: 'string',
    }
  ],
};

const playing = {
  players: [
    {
      uid: 'string',
      name: 'string',
    }
  ],
  gameState: 'gameState',
};
