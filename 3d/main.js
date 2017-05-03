
import GameOfLife3d     from './cells/GoL-3d.js';
import World3d          from './core/World-3d.js'

const SIZE = 30; // cells^3
const VIEW_SCALE = 50;
const WORLD_FRAME_RATE = 20;

let world = new World3d({
  size: SIZE,
  spread: 1.0,
  render: 'content',
  type: GameOfLife3d,
  scale: VIEW_SCALE
});

//world.render();

//world.evolve();
// world.render();
//
window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
