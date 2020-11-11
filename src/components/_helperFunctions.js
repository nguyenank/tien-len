// src/components/helper-functions/helperFunctions.js
export function getClassName(props, index, classname) {
  return index === props.ctx.currentPlayer
    ? "current-" + classname
    : props.G.turnOrder[index] === null || props.G.turnOrder[index] === "W"
    ? "passed-" + classname
    : classname;
}
