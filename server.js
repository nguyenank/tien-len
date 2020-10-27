// server.js

import { Server } from "boardgame.io/server";
import { default as TienLen } from "./src/TienLen";

// const PORT = process.env.PORT || 8000;
const server = Server({ games: [TienLen] });
server.run(8000, () => {
  console.log(`Serving at: http://localhost:${8000}/`);
});
