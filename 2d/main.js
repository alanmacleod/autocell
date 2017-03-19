

import World        from './core/World.js';
import Renderer     from './core/Renderer2d';
import GameOfLife   from './cells/Cell-GoL';

const SIZE = 100; // cells
const VIEW_SCALE = 8;

let lastTime = 0, frames = 0, avFrames = 0;

let world = new World({
  size: SIZE,
  spread: 1.0,
  type: GameOfLife
});

let renderer = new Renderer("content");
renderer.scale = VIEW_SCALE;


world.mutate();

renderer.render(world.data);


let fpsText = document.getElementById("fps");

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
    world.mutate();
  }

  renderer.render(world.data);
  window.requestAnimationFrame(render);
}
