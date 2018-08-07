import getActivePlayer from './getActivePlayer';
import nextGameState from './nextGameState';
import tryDeserializeActionPayloadFromFirestore from './tryDeserializeActionPayloadFromFirestore';
import hashGameState from './hashGameState';

const tryApplyingAction = (currState, action) => {
  if (getActivePlayer(currState) !== action.author) {
    return {
      succeeded: false,
      value: new Error('Playing out of turn.'),
    };
  }
  const payload = deserializeActionPayloadFromFirestore(action.payload);
  if (!payload.succeeded) {
    return {
      succeeded: false,
      value: new Error('Malformed payload.'),
    };
  }
  const newState = nextGameState(currState, payload);
  const hash = hashGameState(newState);
  if (hash !== action.hash) {
    return {
      succeeded: false,
      value: new Error('Checksum hashes did not match.'),
    };
  }
  return {
    succeeded: true,
    value: newState,
  };
};

export default tryApplyingAction;
