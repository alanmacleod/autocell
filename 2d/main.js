

import SpatialGrid  from './core/SpatialGrid';
import World        from './core/World.js';
import GameOfLife   from './cells/GoL';
import Flood        from './cells/Flood';
import Burrow       from './cells/Burrow';
import Blur         from './cells/Blur';
import Snow         from './cells/Snow';
import Boid         from './cells/Boid'
import OpenWorld    from './core/OpenWorld';

const SIZE = 100; // cells
const VIEW_SCALE = 8;
const WORLD_FRAME_RATE = 30;

let world = new World({
  size: SIZE,
  spread: 1.0,
  process: 'vertical',
  type: GameOfLife,
  render: 'content',
  scale: VIEW_SCALE
});

window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
