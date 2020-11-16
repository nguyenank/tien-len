// src/App.js

import { Client } from "boardgame.io/react";
import { Debug } from "boardgame.io/debug";
import { default as TienLen } from "./TienLen";
import { default as TienLenBoard } from "./TienLenBoard";
import { SocketIO } from "boardgame.io/multiplayer";

import { APP_PRODUCTION, WEB_SERVER_URL } from "./config";

const { protocol, hostname, port } = window.location;

let server = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : WEB_SERVER_URL;

const App = Client({
  game: TienLen,
  numPlayers: 4,
  board: TienLenBoard,
  multiplayer: SocketIO({ server }),
  debug: { impl: Debug },
});

export default App;
