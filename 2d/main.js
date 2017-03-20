

import World        from './core/World.js';
import Renderer     from './core/Renderer2d';
import GameOfLife   from './cells/GoL';
import Flood        from './cells/Flood';
import Burrow       from './cells/Burrow';
import Blur         from './cells/Blur';
import Snow         from './cells/Snow';

const SIZE = 75; // cells
const VIEW_SCALE = 8;
const WORLD_FRAME_RATE = 15;

let fpsText = document.getElementById("fps");

let lastTime = 0, frames = 0, avFrames = 0;

let world = new World({
  size: SIZE,
  spread: 1.0,
  type: Flood
});

let renderer = new Renderer("content");
renderer.scale = VIEW_SCALE;

// world.evolve();
// renderer.render(world.data);
//
// console.log(world.data);


window.world = world;

window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

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
  }

  renderer.render(world.data);
  window.requestAnimationFrame(render);
}
