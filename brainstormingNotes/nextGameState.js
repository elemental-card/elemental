import { getWinnerIndex, generateOrderedDeck } from './cardUtils';
import xorshift from 'xorshift';

const Xorshift = xorshift.constructor;

const nextGameState = (currState, action) => {
  if (currState.type === 'CHOOSING_TRUMP') {
    return pipeHelper(currState, setTrumpTo(action), setPlayersBidsToNull, setStateTypeToBidding);
  }
  if (currState.type === 'BIDDING') {
    currState = pipeHelper(currState, setPlayerBidTo(action));
    const numberOfPlayers = currState.players.length;
    const playersThatBid = currState.players.filter(p => p.bid !== null).length;
    if (playersThatBid < numberOfPlayers) {
      return currState;
    }
    return pipeHelper(currState, setPlayersTricksWonToZero, setPlayersPlayedCardToNull, setNextDealer, setStateTypeToChoosingCard);
  }
  if (currState.type === 'CHOOSING_CARD') {
    currState = pipeHelper(currState, removeCardFromPlayerHand(action), setPlayerPlayedCardTo(action));
    const numberOfPlayers = currState.players.length;
    const numberOfPlayersThatPlayedACard = currState.players.filter(p => p.playedCard !== null).length;
    if (numberOfPlayersThatPlayedACard < numberOfPlayers) {
      return currState;
    }
    currState = pipeHelper(currState, makeWinnerLeader, incrementWinnerTricksWon, setPlayersPlayedCardToNull);
    const doPlayersHaveCardsLeftToPlay = currState.players[0].hand.length > 0;
    if (doPlayersHaveCardsLeftToPlay) {
      return currState;
    }
    const { deck, nextPrngState } = generateDeckAndGetNextPrngState(currState.prngState);
    const roundNumber = currState.players.map(p => p.tricksWon).reduce((a, b) => a + b);
    const finalRoundNumber = 60 / numberOfPlayers;
    if (roundNumber === finalRoundNumber) {
      return pipeHelper(currState, updateScores, orderByScoreThenSetStateTypeToFinal);
    }
    const nextRoundNumber = roundNumber + 1;
    const cardsPerPlayer = nextRoundNumber;
    const numberOfCardsToBeDealtNextRound = cardsPerPlayer * numberOfPlayers;
    const trumpCard = nextRoundNumber === finalRoundNumber
      ? { rank: 0, element: 'magic' }
      : deck[numberOfCardsToBeDealtNextRound];
    currState = {
      ...currState,
      prngState: nextPrngState,
    };
    currState = pipeHelper(currState, updateScores, updateDealer, setPlayersHandUsing(deck, cardsPerPlayer), removePlayersBidsTricksWonAndPlayedCards);
    const doesDealerNeedToChooseTrump = trumpCard.rank === Infinity;
    if (doesDealerNeedToChooseTrump) {
      return pipeHelper(currState, setStateTypeToChoosingTrump);
    }
    return pipeHelper(currState, setTrumpTo(trumpCard), setPlayersBidsToNull, setStateTypeToBidding);
  }
  throw new TypeError('Cannot get nextGameState for state type ' + currState.type);
};

// Since create-react-app doesn't enable pipeline syntax,
//   a |> b |> c
//   must now be written as pipeHelper(a, b, c).
const pipeHelper = (...args) => {
  if (args.length === 0) {
    return;
  }

  let [result, ...funcs] = args;
  for (const f of funcs) {
    result = f(result);
  }
  return result;
};

const generateDeckAndGetNextPrngState = (prngState) => {
  const xorshift = new Xorshift(prngState);
  const deck = generateOrderedDeck();
  for (let i = 0; i < 256; i++) {
    deck.sort(() => xorshift.random() - 0.5);
  }
  const nextPrngState = xorshift.randomint().concat(xorshift.randomint());
  return {
    deck,
    nextPrngState,
  };
};

const setTrumpTo = (cardOrElement) => (currState) => {
  if ('object' === typeof cardOrElement) {
    const card = cardOrElement;
    if (card.rank === 0) {
      return {
        ...currState,
        trump: {
          type: 'noTrump',
          value: null,
        },
      };
    }
    return {
      ...currState,
      trump: {
        type: 'card',
        value: card,
      },
    };
  }
  if ('string' === typeof cardOrElement) {
    const element = cardOrElement;
    return {
      ...currState,
      trump: {
        type: 'dealerChoice',
        value: element,
      },
    };
  }
  throw new TypeError('Illegal cardOrSuit.');
};

const setPlayersBidsToNull = (currState) => {
  return {
    ...currState,
    players: currState.players.map((player) => {
      return {
        ...player,
        bid: null,
      }
    }),
  };
};

const setStateTypeToBidding = (currState) => {
  return {
    ...currState,
    type: 'BIDDING',
  };
};

const setPlayerBidTo = (bid) => (currState) => {
  const activePlayer = currState.players.find(p => p.bid === null);
  if (activePlayer === undefined) {
    throw new Error('All players have bid.');
  }
  return {
    ...currState,
    players: currState.players.map((player) => {
      if (player.name === activePlayer.name) {
        return {
          ...player,
          bid,
        };
      }
      return player;
    }),
  };
};

const setPlayersTricksWonToZero = (currState) => {
  return {
    ...currState,
    players: currState.players.map((player) => {
      return {
        ...player,
        tricksWon: 0,
      }
    }),
  };
};

const setPlayersPlayedCardToNull = (currState) => {
  return {
    ...currState,
    players: currState.players.map((player) => {
      return {
        ...player,
        playedCard: null,
      }
    }),
  };
};

const setNextDealer = (currState) => {
  return {
    ...currState,
    nextDealer: currState.players[currState.players.length - 1].name,
  };
};

const setStateTypeToChoosingCard = (currState) => {
  return {
    ...currState,
    type: 'CHOOSING_CARD',
  };
};

const removeCardFromPlayerHand = (card) => (currState) => {
  const activePlayer = currState.players.find(p => p.playedCard === null);
  if (activePlayer === undefined) {
    throw new Error('All players have played a card.');
  }
  return {
    ...currState,
    players: currState.players.map((player) => {
      if (player.name === activePlayer.name) {
        const indexOfCard = player.hand.findIndex(c => c.rank === card.rank && c.element === card.element);
        if (indexOfCard === -1) {
          throw new Error('Card is not in player\'s hand.');
        }
        return {
          ...player,
          hand: player.hand.slice(0, indexOfCard).concat(player.hand.slice(indexOfCard + 1)),
        };
      }
      return player;
    }),
  };
};

const setPlayerPlayedCardTo = (card) => (currState) => {
  const activePlayer = currState.players.find(p => p.playedCard === null);
  if (activePlayer === undefined) {
    throw new Error('All players have played a card.');
  }
  return {
    ...currState,
    players: currState.players.map((player) => {
      if (player.name === activePlayer.name) {
        return {
          ...player,
          playedCard: card,
        };
      }
      return player;
    }),
  };
};

const makeWinnerLeader = (currState) => {
  const playedCards = currState.players.map(p => p.playedCard);
  const winnerIndex = getWinnerIndex(playedCards, getElementOfTrump(currState.trump));
  return {
    ...currState,
    players: currState.players.slice(winnerIndex).concat(currState.players.slice(0, winnerIndex)),
  };
};

const incrementWinnerTricksWon = (currState) => {
  const playedCards = currState.players.map(p => p.playedCard);
  const winnerIndex = getWinnerIndex(playedCards, getElementOfTrump(currState.trump));
  return {
    ...currState,
    players: currState.players.map((player, i) => {
      if (i === winnerIndex) {
        return {
          ...player,
          tricksWon: player.tricksWon + 1,
        };
      }
      return player;
    }),
  };
};

const updateScores = (currState) => {
  return {
    ...currState,
    players: currState.players.map((player) => {
      const trickDiff = Math.abs(player.tricksWon - player.bid);
      const points = trickDiff === 0
        ? 20 + (player.bid * 10)
        : trickDiff * -10;
      return {
        ...player,
        score: player.score + points,
      };
    }),
  };
};

const orderByScoreThenSetStateTypeToFinal = (currState) => {
  return {
    ...currState,
    type: 'FINAL',
    players: currState.players.map((player) => {
      return {
        name: player.name,
        score: player.score,
      };
    }).sort((a, b) => b.score - a.score),
  };
};

const updateDealer = (currState) => {
  const newDealerName = currState.nextDealer;
  const indexOfNewDealer = currState.players.findIndex(p => p.name === newDealerName);
  const indexOfNewLeader = indexOfNewDealer + 1 === currState.players.length
    ? 0
    : indexOfNewLeader + 1;
  return {
    ...currState,
    players: currState.players.slice(indexOfNewLeader).concat(currState.players.slice(0, indexOfNewLeader)),
  };
};

const setPlayersHandUsing = (deck, cardsPerPlayer) => (currState) => {
  return {
    ...currState,
    players: currState.players.map((player, i) => {
      return {
        ...player,
        hand: deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer),
      }
    }),
  };
};

const removePlayersBidsTricksWonAndPlayedCards = (currState) => {
  return {
    ...currState,
    players: currState.players.map((player) => {
      return {
        name: player.name,
        score: player.score,
        hand: player.hand,
      };
    }),
  };
};

const setStateTypeToChoosingTrump = (currState) => {
  return {
    ...currState,
    type: 'CHOOSING_TRUMP',
  };
};

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

export default nextGameState;