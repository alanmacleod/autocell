

import OpenWorld    from './core/OpenWorld';
import Boid         from './cells/Boid';
// "boids"

const SIZE = 200; // cells
const VIEW_SCALE = 4;
const WORLD_FRAME_RATE = 20;

let world = new OpenWorld({
  type: Boid,
  size: SIZE,
  scale: VIEW_SCALE,
  spread: 0.1,
  render: "content"
});

//console.log("Hello from main2.js");
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

window.requestAnimationFrame(render);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
