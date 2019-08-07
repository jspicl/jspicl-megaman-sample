import { DIRECTION_LEFT, DIRECTION_RIGHT, MAX_AIRJUMP_DURATION, MAX_JUMP_DURATION, GRAVITY } from "../constants";
import { getInput } from "../input";
import { updatePositionBasedOnMotion, checkForCollisionsAgainstEnvironment } from "../physics";
import { updateAnimation } from "../animation";

export function player (actor, elapsedTime) {
  // 1. Collect input
  actor.input = getInput();

  // 2. Update motion based on input
  updatePlayerMotion(actor);

  // 3. Update position based on motion
  updatePositionBasedOnMotion(actor);

  // 4. Colision detect & correct
  const collisionInfo = checkForCollisionsAgainstEnvironment(actor);

  // 5. Respond to collision events
  if (collisionInfo.ground) {
    actor.jumpDuration = 0;
    actor.yVelocity = 0;
    actor.hasJumped = actor.input.jumpPressed;
    actor.airDuration = 0;
  }
  else {
    actor.airDuration = actor.airDuration + 1;
  }

  if (collisionInfo.top) {
    actor.jumpDuration = 1000;
    actor.yVelocity = -GRAVITY;
  }

  // 6. Update animation
  updatePlayerAnimation(actor, elapsedTime);
}

function updatePlayerMotion (actor) {
  if (!actor.hasJumped && actor.input.jumpPressed && actor.jumpDuration < MAX_JUMP_DURATION) {
    actor.yVelocity = actor.jumpVelocity;
    actor.jumpDuration = actor.jumpDuration + 1;
  }

  // Disable jumping if the player has been airborne for a certain amount of time
  if (!actor.input.jumpPressed && actor.airDuration > MAX_AIRJUMP_DURATION) {
    actor.hasJumped = true;
  }

  if (actor.input.leftPressed || actor.input.rightPressed) {
    actor.xVelocity = actor.moveVelocity;
    if (actor.input.dashPressed) {
      actor.xVelocity = actor.moveVelocity * 2;
    }
  }
  else {
    actor.xVelocity = 0;
  }

  actor.direction = actor.input.leftPressed && DIRECTION_LEFT || actor.input.rightPressed && DIRECTION_RIGHT || actor.direction;
}

function updatePlayerAnimation (actor, elapsedTime) {
  let animation = actor.sprites.default;
  if (actor.yVelocity !== 0) {
    animation = actor.sprites.jump;
  }
  else if (actor.xVelocity !== 0) {
    // if (Math.abs(actor.xVelocity) > actor.moveVelocity) {
    //   animation = actor.sprites.dash;
    // }
    // else {
    animation = actor.sprites.run;
    // }
  }
  else if (actor.xVelocity === 0) {
    animation = actor.sprites.default;
  }

  if (actor.currentAnimation !== animation) {
    actor.cursor = 0;
  }

  actor.currentAnimation = animation;

  updateAnimation(actor, elapsedTime);
}
