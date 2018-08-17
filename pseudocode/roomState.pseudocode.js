const roomState = lobby
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
  hostName: 'string',
  players: [
    {
      uid: 'string',
      name: 'string',
    }
  ],
  gameState,
};
