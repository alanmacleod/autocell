

import World        from './World.js';
import Renderer     from './Renderer2d';
import GameOfLife   from './Rule-GoL';

const SIZE = 100; // cells
const VIEW_SCALE = 8;

let lastTime = 0, frames = 0, avFrames = 0;
let world = new World(SIZE);
let rule = new GameOfLife();
let fpsText = document.getElementById("fps");

let renderer = new Renderer("content");
renderer.scale = VIEW_SCALE;

window.requestAnimationFrame(render);


function render()
{
  let timeNow = performance.now();
  let timeTaken = timeNow - lastTime;

  avFrames +=  1000 / timeTaken;
  lastTime = timeNow;

  if (frames++ == 10)
  {
    fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
    frames = 0;
    avFrames = 0;
    world.mutate(rule);
  }





  renderer.render(world.data);
  window.requestAnimationFrame(render);
}
