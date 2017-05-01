
import World        from './core/World';
import GameOfLife   from './cells/GoL';
// import Flood        from './cells/Flood';
// import Burrow       from './cells/Burrow';
// import Blur         from './cells/Blur';
// import Snow         from './cells/Snow';
//import Renderer     from './Renderer2d';
// import Canvas2d from '../shared/Canvas2d';
// "boids"

const SIZE = 100; // cells
const VIEW_SCALE = 50;
const WORLD_FRAME_RATE = 25;


let world = new World({
  size: SIZE,
  spread: 1.0,
  process: 'vertical',
  type: GameOfLife,
  render: 'content',
  scale: VIEW_SCALE
});

world.evolve();
world.render();

window.requestAnimationFrame(render);
window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);

function render()
{
  world.render();
  window.requestAnimationFrame(render);
}
