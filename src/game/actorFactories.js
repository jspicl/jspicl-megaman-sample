import { generateUniqueId } from "./utils";
import { DIRECTION_RIGHT, DIRECTION_LEFT } from "./constants";
import * as STATES from "./states";
import * as SPRITES from "./sprites";

export function createActor(args) {
  return Object.assign(
    {
      id: generateUniqueId(),
      status: "active",
      x: 0,
      y: 0,
      health: 1,
      direction: DIRECTION_LEFT,
      facingDirection: args.direction || DIRECTION_LEFT,
      xVelocity: 0,
      yVelocity: 0,
      targetXVelocity: 0,
      jumpDuration: 0,
      maxMoveVelocity: 48,
      currentAnimationFrame: 0,
      currentAnimation: args.sprites.default,

      allowUpdating: true,
      allowRendering: true,
      allowCollisions: true,
    },
    args
  );
}

export function createPlayer(x, y) {
  return createActor({
    type: "player",
    updateState: STATES.player,
    x,
    y,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.megaman,
  });
}

export function createPlayerCamera() {
  return createActor({
    type: "camera",
    updateState: STATES.camera,
    allowRendering: false,
    sprites: {
      default: {
        width: 128,
        height: 128,
      },
    },
  });
}
