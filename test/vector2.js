import test from 'ava';
import Vector2 from '../2d/math/Vector2';

test('v2_sum', t => {
  let v = (new Vector2(0,0)).add(new Vector2(1,1));
  t.deepEqual(v, new Vector2(1,1));
});

test('v2_mul', t => {
  let v = (new Vector2(1,1)).mul(2);
  t.deepEqual(v, new Vector2(2,2));
});

test('v2_dist', t => {
  let d = (new Vector2(0,0)).dist(new Vector2(0,1))
  t.is(d, 1);
});
