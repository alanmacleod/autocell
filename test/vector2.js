import test from 'ava';
import Vector2 from '../2d/math/Vector2';

test('constructor', t => {
  let v = new Vector2(2, 3);
  t.is(v.x, 2);
  t.is(v.y, 3);
});

test('set', t => {
  let v = new Vector2().set(5,6);
  t.deepEqual(v, new Vector2(5,6));
});

test('add', t => {
  let v = (new Vector2(0,0)).add(new Vector2(1,1));
  t.deepEqual(v, new Vector2(1,1));
});

test('sub', t => {
  let v = (new Vector2(1,1)).sub(new Vector2(1,1));
  t.deepEqual(v, new Vector2());
});

test('mul', t => {
  let v = (new Vector2(1,1)).mul(2);
  t.deepEqual(v, new Vector2(2,2));
});

test('div', t => {
  let v = new Vector2(2,2).div(2);
  t.deepEqual(v, new Vector2(1,1));
})

// Functions that operate in-place (i.e. don't return new object)
test('tsub', t => {
  let v = new Vector2(2,2).tsub(new Vector2(1,1));
  t.deepEqual(v, new Vector2(1,1));
});

test('tadd', t => {
  let v = new Vector2(1,1).tadd(new Vector2(1,1));
  t.deepEqual(v, new Vector2(2,2));
});

test('tdiv', t =>{
  let v = new Vector2(2,2).tdiv(2);
  t.deepEqual(v, new Vector2(1,1));
});

test('tmul', t =>{
  let v = new Vector2(1,1).tmul(2);
  t.deepEqual(v, new Vector2(2,2));
});

test('mag', t => {
  let m = new Vector2(0,1).mag();
  t.is(m, 1);
});

test('dist', t => {
  let d = (new Vector2(0,0)).dist(new Vector2(0,1))
  t.is(d, 1);
});
