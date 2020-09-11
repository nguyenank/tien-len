import { Client } from "boardgame.io/react";
import { TienLen } from "./Game";
import { TienLenBoard } from "./Board";

const App = Client({ game: TienLen, numPlayers: 4, board: TienLenBoard });

export default App;
