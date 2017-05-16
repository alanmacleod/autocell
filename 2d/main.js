
// Some other test cells
// import Flood        from './cells/Flood';
// import Burrow       from './cells/Burrow';
// import Blur         from './cells/Blur';
// import Snow         from './cells/Snow';

// Uncomment these and change to `let world = new OpenWorld({})`
// and set `type: Boid` to see original 2D boids demo
// Also set SIZE = 400 and VIEW_SCALE=1

// import Boid         from './cells/Boid'
// import OpenWorld    from './core/OpenWorld';

import World        from './core/World.js';
import GameOfLife   from './cells/GoL';

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
