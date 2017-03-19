

import World from './World.js';

const SIZE = 100; // cells

let world = new World(SIZE);

console.log(world.neighbourhood(0,0));
