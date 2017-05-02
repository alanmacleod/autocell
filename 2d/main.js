

import World        from './core/World.js';
import GameOfLife   from './cells/GoL';
import Flood        from './cells/Flood';
import Burrow       from './cells/Burrow';
import Blur         from './cells/Blur';
import Snow         from './cells/Snow';
//import Renderer     from './Renderer2d';
//import Canvas2d from '../shared/Canvas2d';

// "boids"

const SIZE = 50; // cells
const VIEW_SCALE = 8;
const WORLD_FRAME_RATE = 30;
//
// let can = new Canvas2d("content");
// can.resize(SIZE * VIEW_SCALE, SIZE * VIEW_SCALE);
// can.clear();
// //can.fitwindow();
//
// let cols = [
//   [0,0,0],
//   [255,0,0],
//   [0,255,0],
//   [0,0,255],
//   [255,255,0],
//   [255,0,255],
//   [0,255,255],
//   [128,0,0],
//   [0,128,0],
//   [0,0,128],
//   [128,128,0],
//   [0,128,128],
//   [128,0,128]
// ]
//
//
// let num = SIZE * SIZE;
// let x = Math.round(SIZE / 2);
// let y = Math.round(SIZE / 2);
// let xd = 1, yd = 1;
// let onx = true;
// let countdown = 1;
// let iterations = 1;
// let dir = 1;
// let inc = 1;
// let cnum = 0;
// let visited = 0;
//
// let iterator = 1;
// do
// {
//
//   let col = cols[cnum % 13];
//   cnum++
//   // // Move x  loop
//   console.log(`Moving x ${iterator} places ${xd==1?'>':'<'}`);
//   for (let xi=0; xi < iterator; xi++)
//   {
//     can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
//     x += xd;
//     visited++;
//   }
//   xd = -xd;
//   // // change direction
//   //
//   col = cols[(cnum++)%13];
//   console.log(`Moving y ${iterator} places ${yd==1?'v':'^'}`);
//   for (let yi=0; yi < iterator; yi++)
//   {
//     can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
//     y += yd;
//     visited++;
//   }
//   yd = -yd;
//
//   iterator += 1;
// } while(visited < num);
//



// // Speed test
//
// let num = 25000000;
// let start = performance.now();
// let i = num;
// for (let t=0; t<num; t++)
// {
//   let xdiff = (i - num);
//   let ydiff = (num - i);
//   let squaredist = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
//   i++;
// }
// let ttaken = performance.now() - start;
// console.log("Time taken: ", ttaken);
// //



let fpsText = document.getElementById("fps");

let lastTime = 0, frames = 0, avFrames = 0;

let world = new World({
  size: SIZE,
  spread: 1.0,
  process: 'vertical',
  type: GameOfLife,
  render: 'content',
  scale: VIEW_SCALE
});


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
  //  fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
    frames = 0;
    avFrames = 0;
  }

  world.render();
  window.requestAnimationFrame(render);
}
