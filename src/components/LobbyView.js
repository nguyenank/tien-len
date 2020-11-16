/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import GithubCorner from "react-github-corner";
import { Lobby } from "boardgame.io/react";
import { GAME_SERVER_URL, WEB_SERVER_URL, APP_PRODUCTION } from "../config";
import { default as BoardTienLen } from "../TienLenBoard";
import { default as GameTienLen } from "../TienLen";
import Rules from "./Rules";
import "./lobby.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

GameTienLen.minPlayers = GameTienLen.maxPlayers = 4;

const { protocol, hostname, port } = window.location;

let gameServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : GAME_SERVER_URL;
let lobbyServer = APP_PRODUCTION
  ? `${protocol}//${hostname}:${port}`
  : WEB_SERVER_URL;

const importedGames = [{ game: GameTienLen, board: BoardTienLen }];

function LobbyView() {
  return (
    <div style={{ padding: 50 }}>
      <Router>
        <div className="center-container">
          <button className="tien-len">
            <Link to="/">Tiến Lên</Link>
          </button>
          <button className="tien-len">
            <Link to="/rules">Rules</Link>
          </button>
        </div>
        <Switch>
          <Route exact path="/">
            <div>
              {" "}
              <h1>Tiến Lên</h1>
              <Lobby
                gameServer={gameServer}
                lobbyServer={lobbyServer}
                gameComponents={importedGames}
              />
            </div>
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
        </Switch>
      </Router>
      <GithubCorner
        href="https://github.com/nguyenank/tien-len"
        octoColor="#f7f3dc"
        bannerColor="#bd4a39"
      />
    </div>
  );
}

export default LobbyView;
