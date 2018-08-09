import appendAction from './appendAction';
import getCardCodeFromCard from './getCardCodeFromCard';

export default async (hostUid, authorUid, card) => {
  await appendAction(hostUid, {
    type: 'CHOOSE_CARD',
    author: authorUid,
    cardCode: getCardCodeFromCard(card),
  });
};
