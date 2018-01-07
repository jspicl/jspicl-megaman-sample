import { checkForCollisions } from "./physics";
import { updateAnimation } from "./animation";
import { createActor } from "./factories";
import { CELL_SIZE, DIRECTION_RIGHT } from "./constants";
import { roundToNearestCell } from "./utils";
import { clearLog, clearDebugRender, getDebugRender } from "./debug";
import * as SPRITES from "./sprites";
import * as STATES from "./states";

const actors = [];
let player;

export function init () {
  palt(14, true);

  player = createActor({
    type: "player",
    x: 60,
    y: 56,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.megaman,
    moveVelocity: 0.7,
    jumpVelocity: 2
  });

  actors.push(player);
}

function handleState (actor, elapsedTime) {
  STATES[actor.type](actor, elapsedTime);
}

export function update (elapsedTime) {
  clearLog();
  clearDebugRender();

  actors.forEach(actor => {
    handleState(actor, elapsedTime);
    checkForCollisions(actor, elapsedTime);
    updateAnimation(actor, elapsedTime);
  });
}

function renderActor (actor) {
  const sprite = actor.current;

  sspr(
    (sprite.index + Math.floor(actor.cursor) * sprite.widthUnits) % 16 * CELL_SIZE,
    Math.floor(sprite.index / 16) * CELL_SIZE,
    sprite.widthUnits * CELL_SIZE,
    sprite.heightUnits * CELL_SIZE,
    actor.x,
    actor.y,
    actor.scale * sprite.widthUnits * CELL_SIZE,
    actor.scale * sprite.heightUnits * CELL_SIZE,
    actor.direction === DIRECTION_RIGHT);
}

export function draw () {
  const cameraX = player.x - 56; // 56 = screen width / 2 - playerWidth / 2
  const cameraY = -34;

  cls();
  camera(cameraX, cameraY);

  // Draw the proper map region
  const xCell = roundToNearestCell(cameraX);
  const yCell = roundToNearestCell(cameraY);
  map(
    xCell,
    yCell,
    xCell * CELL_SIZE,
    yCell * CELL_SIZE,
    17, 17);

  // Render players and enemies
  actors.forEach(renderActor);

  getDebugRender().map(c => c());
}
