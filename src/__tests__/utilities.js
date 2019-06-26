import { getPlayerById } from "../utilities.js";

test("getPlayerId", () => {
  const players = [
    {
      name: "Player1",
      uid: "asdfghjklñ"
    },
    {
      name: "Player2",
      uid: "qwertyuiop"
    },
    {
      name: "Player3",
      uid: "zxcvbnm"
    },
    {
      name: "Player4",
      uid: "asdfghjklñ"
    }
  ];
  const playerSearch1 = getPlayerById(players, "notfoundid");
  expect(playerSearch1).toBe(undefined);

  const playerSearch2 = getPlayerById(players, "qwertyuiop");
  expect(playerSearch2.name).toBe("Player2");
  expect(playerSearch2.uid).toBe("qwertyuiop");

  const playerSearch3 = getPlayerById(players, "asdfghjklñ");
  expect(playerSearch3.name).toBe("Player1");
  expect(playerSearch3.uid).toBe("asdfghjklñ");
});
