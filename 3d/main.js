
import OpenWorld3d          from './core/OpenWorld-3d';
import Boid3d               from './cells/Boid-3d';

// 2000 size, 400 spread is good

const SIZE = 2500
const VIEW_SCALE = 10;
const WORLD_FRAME_RATE = 45;

let world = new OpenWorld3d({
  size: SIZE,         // World bounds
  spread: 800,        // Number of entities
  render: 'content',
  type: Boid3d,
  scale: VIEW_SCALE
});

window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
