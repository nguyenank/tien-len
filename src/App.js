// src/App.js

import { Client } from "boardgame.io/react";
import { TienLen } from "./TienLen";
import { TienLenBoard } from "./TienLenBoard";

const App = Client({
  game: TienLen,
  numPlayers: 4,
  board: TienLenBoard,
});

export default App;
