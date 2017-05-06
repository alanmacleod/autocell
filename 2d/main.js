

import SpatialGrid  from './core/SpatialGrid';
import World        from './core/World.js';
import GameOfLife   from './cells/GoL';
import Flood        from './cells/Flood';
import Burrow       from './cells/Burrow';
import Blur         from './cells/Blur';
import Snow         from './cells/Snow';
import Boid         from './cells/Boid'
import OpenWorld    from './core/OpenWorld';
//import Vector2  from './math/Vector2';

//import Renderer     from './Renderer2d';
//import Canvas2d from '../shared/Canvas2d';

// "boids"

const SIZE = 100; // cells
const VIEW_SCALE = 4;
const WORLD_FRAME_RATE = 25;
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

// 10,000 items in a 10,000 x 10,1000 grid  = 4ms

// let g = new SpatialGrid(0, 0, 10000, 10000, 100);
//
// for (var t=0; t< 20000; t++)
// {
//   g.add({x: Math.random() * 10000, y: Math.random() * 10000});
// }
//
// // g.add({x: 17, y:17, id:0});
// // g.add({x: 18, y:18, id:1});
// // g.add({x: 1, y:1, id:2});
// // g.add({x: 2, y:2, id:3});
// // g.add({x: 33, y:33, id:4});
// // g.add({x: 66, y:66, id:4});
//
// var t1= performance.now();
// for (var t=0; t< 20000; t++)
//   g.query(3, 3, 110);
//
// console.log(`Took ${performance.now() - t1} ms`);
//





let fpsText = document.getElementById("fps");

let lastTime = 0, frames = 0, avFrames = 0;

let world = new OpenWorld({
  size: SIZE,
  spread: 1.0,
  process: 'vertical',
  type: Boid,
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
