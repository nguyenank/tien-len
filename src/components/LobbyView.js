/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { Lobby } from "boardgame.io/react";
import { GAME_SERVER_URL, WEB_SERVER_URL, APP_PRODUCTION } from "../config";
import { default as BoardTienLen } from "../TienLenBoard";
import { default as GameTienLen } from "../TienLen";
import "./lobby.css";

GameTienLen.minPlayers = GameTienLen.maxPlayers = 4;

const { protocol, hostname, port } = window.location;

let gameServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : GAME_SERVER_URL;
let lobbyServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : WEB_SERVER_URL;

const importedGames = [{ game: GameTienLen, board: BoardTienLen }];

const LobbyView = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer={gameServer}
      lobbyServer={lobbyServer}
      gameComponents={importedGames}
    />
  </div>
);

export default LobbyView;
