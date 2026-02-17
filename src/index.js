import { init, draw, update } from "./game";

function _init() {
  cls();
  init();
}

function _update60() {
  update(1 / 60);
}

function _draw() {
  draw();
}
