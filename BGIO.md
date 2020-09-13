phases - multiple turns
stages - within a turn

Round = phase

tien len = stage

in game state, keep track of list of players who are still in and pass turn accordingly

when only one player left in the turn list,

- have three different moves: normalPlay, tienLenPlay, and newRoundPlay; only enable second for tien len stage
- if they ever take newRoundPlay: reset list of players in the round, and end the tien len stage

maybe embed what the current play is into the type of round? but that might be unnecessarily complicated, because you have to check if a combo beats the middle one anyways

- should prob just be a G variable then
