
//import World        from './core/World3d';
//import GameOfLife   from './cells/GoL';
import GameOfLife3d     from './core/GameOfLife3d';

const SIZE = 50; // cells
const VIEW_SCALE = 50;
const WORLD_FRAME_RATE = 2;

let world = new GameOfLife3d({
  size: SIZE,
  spread: 1.0,
  render: 'content',
  scale: VIEW_SCALE
});

//world.evolve();
world.render();

window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
