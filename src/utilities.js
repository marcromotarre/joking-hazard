import { auth } from "./firebase";

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const getPlayerById = (players, uid) => {
  return players.find(player => {
    return player.uid === uid;
  });
};

export const currentUser = () => {
  return auth.currentUser ? auth.currentUser : {};
};
