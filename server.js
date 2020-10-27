// server.js

import { Server } from "boardgame.io/server";
import TienLen from "./src/TienLen";

const PORT = process.env.PORT || 8000;
const server = Server({ games: [TienLen] });
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
