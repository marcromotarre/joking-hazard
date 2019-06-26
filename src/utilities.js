import { auth } from "./firebase";

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const currentUser = () => {
  return auth.currentUser ? auth.currentUser : {};
};

export const getPlayerById = (players, uid) =>
  players.find(player => player.uid === uid);
