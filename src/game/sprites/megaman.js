import { createKeyframeAnimation } from "../factories";

/* eslint-disable no-magic-numbers */
export const megaman = {
  default: createKeyframeAnimation(36, 2, 2, 2, 2),
  run: createKeyframeAnimation(2, 4, 0.15, 2, 2),
  jump: createKeyframeAnimation(32, 1, 1, 2, 2),
  shoot: createKeyframeAnimation(0, 0, 0, 2, 2),
  dash: createKeyframeAnimation(42, 1, 1, 2, 2),
  elevator: createKeyframeAnimation(0, 0, 0, 0, 2, 2)
};
