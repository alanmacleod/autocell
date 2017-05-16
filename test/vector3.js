import test from 'ava';
import Vector3 from '../3d/math/Vector3';

test('constructor', t => {
  let v = new Vector3(2, 3, 4);
  t.is(v.x, 2);
  t.is(v.y, 3);
  t.is(v.z, 4);
});

test('set', t => {
  let v = new Vector3().set(5,6,7);
  t.deepEqual(v, new Vector3(5,6,7));
});

test('add', t => {
  let v = (new Vector3(0,0,0)).add(new Vector3(1,1,1));
  t.deepEqual(v, new Vector3(1,1,1));
});

test('sub', t => {
  let v = (new Vector3(1,1,1)).sub(new Vector3(1,1,1));
  t.deepEqual(v, new Vector3());
});

test('mul', t => {
  let v = (new Vector3(1,1,1)).mul(2);
  t.deepEqual(v, new Vector3(2,2,2));
});

test('div', t => {
  let v = new Vector3(2,2,2).div(2);
  t.deepEqual(v, new Vector3(1,1,1));
})

// Functions that operate in-place (i.e. don't return new object)
test('tsub', t => {
  let v = new Vector3(2,2,2).tsub(new Vector3(1,1,1));
  t.deepEqual(v, new Vector3(1,1,1));
});

test('tadd', t => {
  let v = new Vector3(1,1,1).tadd(new Vector3(1,1,1));
  t.deepEqual(v, new Vector3(2,2,2));
});

test('tdiv', t =>{
  let v = new Vector3(2,2,2).tdiv(2);
  t.deepEqual(v, new Vector3(1,1,1));
});

test('tmul', t =>{
  let v = new Vector3(1,1,1).tmul(2);
  t.deepEqual(v, new Vector3(2,2,2));
});

test('mag', t => {
  let m = new Vector3(0,1,0).mag();
  t.is(m, 1);
});

test('dist', t => {
  let d = (new Vector3(0,0,0)).dist(new Vector3(0,1,0))
  t.is(d, 1);
});
