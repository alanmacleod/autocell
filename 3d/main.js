
import OpenWorld3d          from './core/OpenWorld-3d';
import Boid3d               from './cells/Boid-3d';

const SIZE = 2000;
const VIEW_SCALE = 10;
const WORLD_FRAME_RATE = 60;

let world = new OpenWorld3d({
  size: SIZE,         // World bounds
  spread: 500,        // Number of entities
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
