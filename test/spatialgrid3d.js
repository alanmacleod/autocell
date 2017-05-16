
// Basic test of SpatialGrid's main functions

import test from 'ava';
import SpatialGrid3d from '../3d/core/SpatialGrid-3d.js';

// Create a 100x100x100 grid cube, divided into 10x10x10 cells
let g = new SpatialGrid3d({
  minx: 0, maxx: 99,
  miny: 0, maxy:99,
  minz: 0, maxz:99
}, 10);

test('constructor', t => {
  t.is(g.grid.length, 10);
  t.is(g.grid[0].length, 10);
  t.is(g.grid[0][0].length, 10);
});

test('add', t => {
  g.add({x:1, y:1, z:1});
  t.is(g.grid[0][0][0].length, 1);
});

test('move', t => {
  // Ensure item is in the first corner cell 0,0,0
  let test_item = {x:1, y:1, z:1};
  g.add(test_item);
  // Force item into the adjacent diagonal cell
  g.move(test_item, 1,1,1, 11, 11, 11);
  t.is(g.grid[1][1][1].includes(test_item), true);
});

test('query', t => {
  let test_item = {x:5, y:5, z:5};
  let test_item_2 = {x:4, y:4, z:4};
  g.add(test_item);
  g.add(test_item_2);
  t.is(g.query(test_item, 5).length, 1);
});
