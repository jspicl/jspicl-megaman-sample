import { DIRECTION_RIGHT } from "./constants";
import { createPlayer, createPlayerCamera } from "./actorFactories";
import { checkForCollisionsAgainstActors } from "./physics";
import { renderMap } from "./render/render-map";

let actors;
let player;
let camera;

const collisionActions = {};

function reset() {
  actors = [];
  camera = createPlayerCamera();
  player = createPlayer(60, 56);

  actors.push(player);
  actors.push(camera);

  actors.camera = camera;
  actors.player = player;
}

export function init() {
  reset();
}

export function update(elapsedTime) {
  cls();
  if (player.status === "dead") {
    player.updateState(player, actors, elapsedTime);
    if (player.reset) {
      reset();
    }
  } else {
    actors.forEach((actor) => actor.updateState(actor, actors, elapsedTime));
    checkForCollisionsAgainstActors(actors, collisionActions);
  }
}

function renderActor(actor) {
  const { currentAnimation, allowRendering, currentAnimationFrame } = actor;

  if (!allowRendering) {
    return;
  }

  spr(
    currentAnimation.index +
      Math.floor(currentAnimationFrame) * currentAnimation.widthCells,
    actor.x - camera.x,
    actor.y - currentAnimation.height - camera.y,
    currentAnimation.widthCells,
    currentAnimation.heightCells,
    actor.direction === DIRECTION_RIGHT
  );
}

export function draw() {
  // cls();
  renderMap(camera.x, camera.y);

  // Render players and enemies
  actors.forEach(renderActor);
}
