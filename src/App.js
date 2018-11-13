import React from "react";

import ConnectToServerScreen from "./containers/ConnectToServerScreen";
import HomeScreen from "./containers/HomeScreen";
import LobbyBrowsingScreen from "./containers/LobbyBrowsingScreen";
import InitialChoosingScreen from "./containers/InitialChoosingScreen";
import StartLobbyScreen from "./containers/StartLobbyScreen";
import WaitForHostToStartLobbyScreen from "./containers/WaitForHostToStartLobbyScreen";
import ChooseTrumpElementScreen from "./containers/ChooseTrumpElementScreen";
import WaitForDealerToChooseTrumpElementScreen from "./containers/WaitForDealerToChooseTrumpElementScreen";
import TrumpElementResultScreen from "./containers/TrumpElementResultScreen";
import ChooseBidScreen from "./containers/ChooseBidScreen";
import WaitForOpponentToChooseBidScreen from "./containers/WaitForOpponentToChooseBidScreen";
import BidResultScreen from "./containers/BidResultScreen";
import ChooseCardScreen from "./containers/ChooseCardScreen";
import WaitForOpponentToChooseCardScreen from "./containers/WaitForOpponentToChooseCardScreen";
import TrickResultScreen from "./containers/TrickResultScreen";
import HandResultScreen from "./containers/HandResultScreen";
import GameResultScreen from "./containers/GameResultScreen";
import LobbyDestroyedScreen from "./containers/LobbyDestroyedScreen";

import firebaseUtils from "./firebaseUtils";

import getActivePlayerName from "./businessLogic/getActivePlayerName";

const getOwnHandFromAppState = appState => {
  const ownName = appState.roomState.players.find(p => p.uid === appState.uid)
    .name;
  return appState.roomState.gameState.players.find(p => p.name === ownName)
    .hand;
};

const getDisplayCardOfTrump = trump => {
  if (trump.type === "noCard") {
    return null;
  }
  if (trump.type === "zero") {
    return {
      rank: 0,
      element: "magic",
    };
  }
  if (trump.type === "card") {
    return trump.value;
  }
  if (trump.type === "dealerChoice") {
    return {
      rank: Infinity,
      element: trump.value,
    };
  }
  throw new TypeError("Illegal trump type: " + trump.type);
};

const getHostUidOfRoomState = roomState =>
  roomState.players.find(p => p.name === roomState.hostName).uid;

const areTentativeInitialsValid = tentativeInitials =>
  /^\w{0,3}$/.test(tentativeInitials);

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      appState: {
        type: "LOGIN_STANDBY",
      },
    };

    firebaseUtils.loginAnonymously().then(uid => {
      firebaseUtils.getCurrentRoom(uid).then(currentRoom => {
        this.setState({
          appState: {
            type: "HOME",
            uid,
            isPending: false,
            currentRoom,
          },
        });
      });
    });

    [
      "navigateToHomeScreen",
      "navigateToBrowseScreen",
      "updateRoomState",
      "indicatePendingSubmission",
      "clearPendingSubmission",
      "onHomeJoin",
      "onHomeCreate",
      "onHomeRejoin",
      "onBrowseSelect",
      "onBrowseConfirm",
      "onJoiningInitialEdit",
      "onJoiningInitialConfirm",
      "onCreatingInitialEdit",
      "onCreatingInitialConfirm",
      "onLobbyStart",
      "onLobbyDelete",
      "onLobbyLeave",
      "onTrumpSelect",
      "onTrumpConfirm",
      "onTrumpContinue",
      "onBidSelect",
      "onBidConfirm",
      "onBidContinue",
      "onCardSelect",
      "onCardConfirm",
      "onTrickContinue",
      "onHandContinue",
      "onGameContinue",
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });

    this.unsubscribeToRoomUpdates = () => {
      throw new Error("You have not subscribed to a room yet.");
    };
  }

  render() {
    switch (this.state.appState.type) {
      case "LOGIN_STANDBY":
        return <ConnectToServerScreen />;
      case "HOME":
        return (
          <HomeScreen
            isPending={this.state.appState.isPending}
            currentRoom={this.state.appState.currentRoom}
            onJoinClicked={this.onHomeJoin}
            onCreateClicked={this.onHomeCreate}
            onRejoinClicked={this.onHomeRejoin}
          />
        );
      case "BROWSE_LOBBIES":
        return (
          <LobbyBrowsingScreen
            hostsOfLobbies={this.state.appState.hostsOfLobbies}
            tentativePlayer={this.state.appState.tentativePlayer}
            onSelectTentativePlayer={this.onBrowseSelect}
            onConfirmTentativePlayer={this.onBrowseConfirm}
            onBack={this.navigateToHomeScreen}
          />
        );
      case "CHOOSE_INITIALS_FOR_JOINING":
        return (
          <InitialChoosingScreen
            tentativeInitials={this.state.appState.tentativeInitials}
            isPending={this.state.appState.isPending}
            onEditTentativeInitials={this.onJoiningInitialEdit}
            onConfirmTentativeInitials={this.onJoiningInitialConfirm}
            onBack={this.navigateToBrowseScreen}
          />
        );
      case "CHOOSE_INITIALS_FOR_CREATING":
        return (
          <InitialChoosingScreen
            tentativeInitials={this.state.appState.tentativeInitials}
            isPending={this.state.appState.isPending}
            onEditTentativeInitials={this.onCreatingInitialEdit}
            onConfirmTentativeInitials={this.onCreatingInitialConfirm}
            onBack={this.navigateToHomeScreen}
          />
        );
      case "START_LOBBY":
        return (
          <StartLobbyScreen
            players={this.state.appState.roomState.players}
            status={this.state.appState.status}
            onStart={this.onLobbyStart}
            onLeave={this.onLobbyDelete}
          />
        );
      case "WAIT_FOR_START":
        return (
          <WaitForHostToStartLobbyScreen
            players={this.state.appState.roomState.players}
            isPending={this.state.appState.isPending}
            onLeave={this.onLobbyLeave}
          />
        );
      case "CHOOSE_TRUMP":
        return (
          <ChooseTrumpElementScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            tentativeElement={this.state.appState.tentativeElement}
            isPending={this.state.appState.isPending}
            onSelectTentativeElement={this.onTrumpSelect}
            onConfirmTentativeElement={this.onTrumpConfirm}
          />
        );
      case "WAIT_FOR_TRUMP":
        return (
          <WaitForDealerToChooseTrumpElementScreen
            hand={getOwnHandFromAppState(this.state.appState)}
          />
        );
      case "TRUMP_RESULT":
        return (
          <TrumpElementResultScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpElement={this.state.appState.roomState.gameState.trump.value}
            onContinue={this.onTrumpContinue}
          />
        );
      case "CHOOSE_BID":
        return (
          <ChooseBidScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpCard={getDisplayCardOfTrump(
              this.state.appState.roomState.gameState.trump,
            )}
            players={this.state.appState.roomState.gameState.players}
            tentativeBid={this.state.appState.tentativeBid}
            isPending={this.state.appState.isPending}
            onSelectTentativeBid={this.onBidSelect}
            onConfirmTentativeBid={this.onBidConfirm}
          />
        );
      case "WAIT_FOR_BID":
        return (
          <WaitForOpponentToChooseBidScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpCard={getDisplayCardOfTrump(
              this.state.appState.roomState.gameState.trump,
            )}
            players={this.state.appState.roomState.gameState.players}
          />
        );
      case "BID_RESULT":
        return (
          <BidResultScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpCard={getDisplayCardOfTrump(
              this.state.appState.roomState.gameState.trump,
            )}
            players={this.state.appState.roomState.gameState.players}
            onContinue={this.onBidContinue}
          />
        );
      case "CHOOSE_CARD":
        return (
          <ChooseCardScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpCard={getDisplayCardOfTrump(
              this.state.appState.roomState.gameState.trump,
            )}
            players={this.state.appState.roomState.gameState.players}
            tentativeCardIndex={this.state.appState.tentativeCardIndex}
            isPending={this.state.appState.isPending}
            onSelectTentativeCardIndex={this.onCardSelect}
            onConfirmTentativeCardIndex={this.onCardConfirm}
          />
        );
      case "WAIT_FOR_CARD":
        return (
          <WaitForOpponentToChooseCardScreen
            hand={getOwnHandFromAppState(this.state.appState)}
            trumpCard={getDisplayCardOfTrump(
              this.state.appState.roomState.gameState.trump,
            )}
            players={this.state.appState.roomState.gameState.players}
          />
        );
      case "TRICK_RESULT":
        return (
          <TrickResultScreen
            hand={this.state.appState.hand}
            trumpCard={getDisplayCardOfTrump(this.state.appState.trump)}
            players={this.state.appState.players}
            onContinue={this.onTrickContinue}
          />
        );
      case "HAND_RESULT":
        return (
          <HandResultScreen
            playerScoreBreakdowns={this.state.appState.scoreBreakdowns}
            trumpCard={getDisplayCardOfTrump(this.state.appState.trump)}
            onContinue={this.onHandContinue}
          />
        );
      case "GAME_RESULT":
        return (
          <GameResultScreen
            players={this.state.appState.viewedRoomState.gameState.players}
            onContinue={this.onGameContinue}
          />
        );
      case "LOBBY_DESTROYED":
        return <LobbyDestroyedScreen onHome={this.navigateToHomeScreen} />;
      default:
        throw new TypeError("Illegal state type: " + this.state.appState.type);
    }
  }

  navigateToHomeScreen() {
    this.setState(prevState => ({
      appState: {
        type: "HOME",
        uid: prevState.appState.uid,
        isPending: false,
        currentRoom: null,
      },
    }));

    firebaseUtils.getCurrentRoom(this.state.appState.uid).then(currentRoom => {
      if (
        currentRoom !== null &&
        this.state.appState.type === "HOME" &&
        !this.state.appState.isPending
      ) {
        this.setState(prevState => ({
          appState: {
            ...prevState.appState,
            currentRoom,
          },
        }));
      }
    });
  }

  navigateToBrowseScreen() {
    firebaseUtils.getHostsOfJoinableRooms().then(hostsOfLobbies => {
      this.setState(prevState => ({
        appState: {
          type: "BROWSE_LOBBIES",
          uid: prevState.appState.uid,
          hostsOfLobbies,
          tentativePlayer: null,
        },
      }));
    });
  }

  updateRoomState(newRoomState) {
    const { appState: oldAppState } = this.state;
    const { roomState: oldRoomState } = oldAppState;
    if (
      oldAppState.type === "WAIT_FOR_TRUMP" &&
      newRoomState.gameState.type === "BIDDING"
    ) {
      this.setState(prevState => ({
        appState: {
          type: "TRUMP_RESULT",
          uid: prevState.appState.uid,
          roomState: newRoomState,
        },
      }));
    } else if (
      oldAppState.type === "WAIT_FOR_BID" &&
      newRoomState.gameState.type === "CHOOSING_CARD"
    ) {
      this.setState(prevState => ({
        appState: {
          type: "BID_RESULT",
          uid: prevState.appState.uid,
          roomState: newRoomState,
        },
      }));
    } else if (
      oldAppState.type === "WAIT_FOR_CARD" &&
      (newRoomState.gameState.players[0].playedCard === null ||
        newRoomState.gameState.type === "CHOOSING_TRUMP" ||
        newRoomState.gameState.type === "BIDDING")
    ) {
      this.setState(prevState => {
        const { name: ownName } = oldRoomState.players.find(
          p => p.uid === oldAppState.uid,
        );
        const oldSelf = oldRoomState.gameState.players.find(
          p => p.name === ownName,
        );
        const hand =
          oldSelf.hand.length === 0
            ? []
            : newRoomState.gameState.players.find(p => p.name === ownName).hand;
        return {
          appState: {
            type: "TRICK_RESULT",
            uid: prevState.appState.uid,
            hand,
            trump: oldRoomState.gameState.trump,
            players: oldRoomState.gameState.players.map(player => {
              if (player.playedCard !== null) {
                return player;
              }
              const newPlayer = newRoomState.gameState.players.find(
                p => p.name === player.name,
              );
              const playedCard =
                player.hand.length === 1
                  ? player.hand[0]
                  : newPlayer.hand.reduce((hand, card) => {
                      const i = hand.findIndex(
                        c => c.rank === card.rank && c.element === card.element,
                      );
                      return hand.slice(0, i).concat(hand.slice(i + 1));
                    }, player.hand)[0];

              return {
                ...player,
                playedCard,
              };
            }),
            roomState: newRoomState,
          },
        };
      });
    } else if (
      oldAppState.type === "CHOOSE_CARD" &&
      (newRoomState.gameState.type === "CHOOSING_TRUMP" ||
        newRoomState.gameState.type === "BIDDING")
    ) {
      this.setState(prevState => {
        const scoreBreakdowns = newRoomState.gameState.players.map(player => {
          const currentScore = player.score;
          const oldScore = oldRoomState.gameState.players.find(
            p => p.name === player.name,
          ).score;
          return {
            name: player.name,
            score: currentScore,
            delta: currentScore - oldScore,
          };
        });
        return {
          appState: {
            type: "HAND_RESULT",
            uid: oldAppState.uid,
            trump: oldRoomState.gameState.trump,
            scoreBreakdowns,
            roomState: newRoomState,
          },
        };
      });
    } else if (
      oldAppState.type === "TRUMP_RESULT" ||
      oldAppState.type === "BID_RESULT" ||
      oldAppState.type === "TRICK_RESULT" ||
      oldAppState.type === "HAND_RESULT" ||
      oldAppState.type === "GAME_RESULT"
    ) {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          roomState: newRoomState,
        },
      }));
    } else {
      this.setState(prevState => {
        const { uid: ownUid } = prevState.appState;
        const { name: ownName } = newRoomState.players.find(
          p => p.uid === ownUid,
        );

        switch (newRoomState.type) {
          case "PREGAME":
            if (ownName === newRoomState.hostName) {
              return {
                appState: {
                  type: "START_LOBBY",
                  uid: ownUid,
                  roomState: newRoomState,
                  status: "noPendingReqs",
                },
              };
            } else {
              return {
                appState: {
                  type: "WAIT_FOR_START",
                  uid: ownUid,
                  roomState: newRoomState,
                  isPending: false,
                },
              };
            }
          case "GAME":
            switch (newRoomState.gameState.type) {
              case "CHOOSING_TRUMP":
                if (ownName === getActivePlayerName(newRoomState.gameState)) {
                  return {
                    appState: {
                      type: "CHOOSE_TRUMP",
                      uid: ownUid,
                      roomState: newRoomState,
                      tentativeElement: null,
                      isPending: false,
                    },
                  };
                } else {
                  return {
                    appState: {
                      type: "WAIT_FOR_TRUMP",
                      uid: ownUid,
                      roomState: newRoomState,
                    },
                  };
                }
              case "BIDDING":
                if (ownName === getActivePlayerName(newRoomState.gameState)) {
                  return {
                    appState: {
                      type: "CHOOSE_BID",
                      uid: ownUid,
                      roomState: newRoomState,
                      tentativeBid: 0,
                      isPending: false,
                    },
                  };
                } else {
                  return {
                    appState: {
                      type: "WAIT_FOR_BID",
                      uid: ownUid,
                      roomState: newRoomState,
                    },
                  };
                }
              case "CHOOSING_CARD":
                if (ownName === getActivePlayerName(newRoomState.gameState)) {
                  return {
                    appState: {
                      type: "CHOOSE_CARD",
                      uid: ownUid,
                      roomState: newRoomState,
                      tentativeCardIndex: -1,
                      isPending: false,
                    },
                  };
                } else {
                  return {
                    appState: {
                      type: "WAIT_FOR_CARD",
                      uid: ownUid,
                      roomState: newRoomState,
                    },
                  };
                }
              default:
                throw new TypeError(
                  "Illegal gameState type: " + newRoomState.gameState.type,
                );
            }
          default:
            throw new TypeError("Illegal roomState type: " + newRoomState.type);
        }
      });
    }
  }

  indicatePendingSubmission() {
    this.setState(prevState => ({
      appState: { ...prevState.appState, isPending: true },
    }));
  }

  clearPendingSubmission() {
    this.setState(prevState => ({
      appState: { ...prevState.appState, isPending: false },
    }));
  }

  onHomeJoin() {
    this.indicatePendingSubmission();
    this.navigateToBrowseScreen();
  }

  onHomeCreate() {
    this.setState(prevState => ({
      appState: {
        type: "CHOOSE_INITIALS_FOR_CREATING",
        uid: prevState.appState.uid,
        tentativeInitials: "",
        isPending: false,
      },
    }));
  }

  onHomeRejoin() {
    this.indicatePendingSubmission();

    const { hostName } = this.state.appState.currentRoom;
    const { uid: hostUid } = this.state.appState.currentRoom.players.find(
      p => p.name === hostName,
    );
    const { uid: ownUid } = this.state.appState;

    this.unsubscribeToRoomUpdates = firebaseUtils.onActionAppended(
      hostUid,
      (roomExists, roomState) => {
        if (roomExists) {
          this.updateRoomState(roomState);
        } else {
          this.unsubscribeToRoomUpdates();
          this.setState({
            appState: {
              type: "LOBBY_DESTROYED",
              uid: ownUid,
            },
          });
        }
      },
    );
  }

  onBrowseSelect(tentativePlayer) {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        tentativePlayer,
      },
    }));
  }

  onBrowseConfirm() {
    this.setState(prevState => ({
      appState: {
        type: "CHOOSE_INITIALS_FOR_JOINING",
        uid: prevState.appState.uid,
        hostUid: prevState.appState.tentativePlayer.uid,
        tentativeInitials: "",
        isPending: false,
      },
    }));
  }

  onJoiningInitialEdit(tentativeInitials) {
    if (areTentativeInitialsValid(tentativeInitials)) {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          tentativeInitials,
        },
      }));
    }
  }

  onJoiningInitialConfirm() {
    this.indicatePendingSubmission();

    const { uid, hostUid, tentativeInitials } = this.state.appState;
    firebaseUtils
      .joinRoom(hostUid, uid, tentativeInitials)
      .then(didJoinSucceed => {
        if (didJoinSucceed) {
          this.unsubscribeToRoomUpdates = firebaseUtils.onActionAppended(
            hostUid,
            (roomExists, roomState) => {
              if (roomExists) {
                this.updateRoomState(roomState);
              } else {
                this.unsubscribeToRoomUpdates();
                this.setState({
                  appState: {
                    type: "LOBBY_DESTROYED",
                    uid,
                  },
                });
              }
            },
          );
        } else {
          alert("Initials in use");
          this.clearPendingSubmission();
        }
      });
  }

  onCreatingInitialEdit(tentativeInitials) {
    if (areTentativeInitialsValid(tentativeInitials)) {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          tentativeInitials,
        },
      }));
    }
  }

  onCreatingInitialConfirm() {
    this.indicatePendingSubmission();

    const { uid, tentativeInitials } = this.state.appState;
    firebaseUtils.createRoom(uid, tentativeInitials).then(() => {
      this.unsubscribeToRoomUpdates = firebaseUtils.onActionAppended(
        uid,
        (roomExists, roomState) => {
          if (roomExists) {
            this.updateRoomState(roomState);
          } else {
            this.unsubscribeToRoomUpdates();
            this.setState({
              appState: {
                type: "LOBBY_DESTROYED",
                uid,
              },
            });
          }
        },
      );
    });
  }

  onLobbyStart() {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        status: "starting",
      },
    }));

    const { uid } = this.state.appState;
    firebaseUtils.startRoom(uid);
  }

  onLobbyDelete() {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        status: "leaving",
      },
    }));

    const { uid } = this.state.appState;
    this.unsubscribeToRoomUpdates();
    firebaseUtils.deleteRoom(uid);
    this.navigateToHomeScreen();
  }

  onLobbyLeave() {
    this.indicatePendingSubmission();

    const { uid, roomState } = this.state.appState;
    const hostUid = getHostUidOfRoomState(roomState);
    this.unsubscribeToRoomUpdates();
    firebaseUtils.leaveRoom(hostUid, uid);
    this.navigateToHomeScreen();
  }

  onTrumpSelect(tentativeElement) {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        tentativeElement,
      },
    }));
  }

  onTrumpConfirm() {
    this.indicatePendingSubmission();

    const { uid, roomState, tentativeElement } = this.state.appState;
    const hostUid = getHostUidOfRoomState(roomState);
    firebaseUtils.chooseTrumpElement(hostUid, uid, tentativeElement);
  }

  onTrumpContinue() {
    this.setState(prevState => {
      const { gameState } = prevState.appState.roomState;
      const activePlayerName = gameState.players.find(p => p.bid === null).name;
      const isUserActivePlayer =
        prevState.appState.uid ===
        prevState.appState.roomState.players.find(
          p => p.name === activePlayerName,
        ).uid;
      const appState = isUserActivePlayer
        ? {
            type: "CHOOSE_BID",
            uid: prevState.appState.uid,
            roomState: prevState.appState.roomState,
            tentativeBid: 0,
            isPending: false,
          }
        : {
            type: "WAIT_FOR_BID",
            uid: prevState.appState.uid,
            roomState: prevState.appState.roomState,
          };
      return { appState };
    });
  }

  onBidSelect(tentativeBid) {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        tentativeBid,
      },
    }));
  }

  onBidConfirm() {
    this.indicatePendingSubmission();

    const { uid, roomState, tentativeBid } = this.state.appState;
    const hostUid = getHostUidOfRoomState(roomState);
    firebaseUtils.chooseBid(hostUid, uid, tentativeBid);
  }

  onBidContinue() {
    this.setState(prevState => {
      const { gameState } = prevState.appState.roomState;
      const activePlayerName = gameState.players.find(
        p => p.playedCard === null,
      ).name;
      const isUserActivePlayer =
        prevState.appState.uid ===
        prevState.appState.roomState.players.find(
          p => p.name === activePlayerName,
        ).uid;
      const appState = isUserActivePlayer
        ? {
            type: "CHOOSE_CARD",
            uid: prevState.appState.uid,
            roomState: prevState.appState.roomState,
            tentativeCardIndex: -1,
            isPending: false,
          }
        : {
            type: "WAIT_FOR_CARD",
            uid: prevState.appState.uid,
            roomState: prevState.appState.roomState,
          };
      return { appState };
    });
  }

  onCardSelect(tentativeCardIndex) {
    this.setState(prevState => ({
      appState: {
        ...prevState.appState,
        tentativeCardIndex,
      },
    }));
  }

  onCardConfirm() {
    this.indicatePendingSubmission();

    const { uid, roomState, tentativeCardIndex } = this.state.appState;
    const hostUid = getHostUidOfRoomState(roomState);
    const { name: ownName } = roomState.players.find(p => p.uid === uid);
    const card = roomState.gameState.players.find(p => p.name === ownName).hand[
      tentativeCardIndex
    ];
    firebaseUtils.chooseCard(hostUid, uid, card);
  }

  onTrickContinue() {
    this.setState(prevState => {
      const { gameState } = prevState.appState.roomState;

      if (gameState.type === "CHOOSING_CARD") {
        const activePlayerName = gameState.players.find(
          p => p.playedCard === null,
        ).name;
        const isUserActivePlayer =
          prevState.appState.uid ===
          prevState.appState.roomState.players.find(
            p => p.name === activePlayerName,
          ).uid;
        const appState = isUserActivePlayer
          ? {
              type: "CHOOSE_CARD",
              uid: prevState.appState.uid,
              roomState: prevState.appState.roomState,
              tentativeCardIndex: -1,
              isPending: false,
            }
          : {
              type: "WAIT_FOR_CARD",
              uid: prevState.appState.uid,
              roomState: prevState.appState.roomState,
            };
        return { appState };
      }

      const scoreBreakdowns = gameState.players.map(player => {
        const currentScore = player.score;
        const oldScore = prevState.appState.players.find(
          p => p.name === player.name,
        ).score;
        return {
          name: player.name,
          score: currentScore,
          delta: currentScore - oldScore,
        };
      });
      return {
        appState: {
          type: "HAND_RESULT",
          uid: prevState.appState.uid,
          trump: prevState.appState.trump,
          scoreBreakdowns,
          roomState: prevState.appState.roomState,
        },
      };
    });
  }

  onHandContinue() {
    this.setState(prevState => {
      const { gameState } = prevState.appState.roomState;

      if (gameState.type === "FINAL") {
        return {
          appState: {
            type: "GAME_RESULT",
            uid: prevState.appState.uid,
            viewedRoomState: prevState.appState.roomState,
          },
        };
      }

      if (gameState.type === "CHOOSING_TRUMP") {
        const ownName = prevState.appState.roomState.players.find(
          p => p.uid === prevState.appState.uid,
        ).name;
        const dealerName = gameState.players[gameState.players.length - 1].name;
        if (ownName === dealerName) {
          return {
            appState: {
              type: "CHOOSE_TRUMP",
              uid: prevState.appState.uid,
              roomState: prevState.appState.roomState,
              tentativeElement: null,
            },
          };
        }
        return {
          appState: {
            type: "WAIT_FOR_TRUMP",
            uid: prevState.appState.uid,
            roomState: prevState.appState.roomState,
          },
        };
      }

      if (gameState.type === "BIDDING") {
        const activePlayerName = gameState.players.find(p => p.bid === null)
          .name;
        const isUserActivePlayer =
          prevState.appState.uid ===
          prevState.appState.roomState.players.find(
            p => p.name === activePlayerName,
          ).uid;
        const appState = isUserActivePlayer
          ? {
              type: "CHOOSE_BID",
              uid: prevState.appState.uid,
              roomState: prevState.appState.roomState,
              tentativeBid: 0,
              isPending: false,
            }
          : {
              type: "WAIT_FOR_BID",
              uid: prevState.appState.uid,
              roomState: prevState.appState.roomState,
            };
        return { appState };
      }

      throw new TypeError("Illegal gameState type: " + gameState.type);
    });
  }

  onGameContinue() {
    this.navigateToHomeScreen();
  }
}
