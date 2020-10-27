// src/App.js

import { Client } from "boardgame.io/react";
import { default as TienLen } from "./TienLen";
import { default as TienLenBoard } from "./TienLenBoard";
import { SocketIO } from "boardgame.io/multiplayer";

const App = Client({
  game: TienLen,
  numPlayers: 4,
  board: TienLenBoard,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  debug: false,
});

export default App;
