
import Vector2  from '../math/Vector2';

const PALETTE = [
  [0,0,0]
];


export default class Boid
{
  constructor(position, bounds)
  {
    this.bounds = bounds;
    this.velocity = new Vector2(Math.random()/4, Math.random()/4);
    this.position = position || new Vector2(0,0);
    this.prepare();

  }

  shader()
  {
    return PALETTE[0];
  }

  mutate(stats)
  {
    this.velocity = this.cohesion(stats.centroid)
                  .add(this.spacing(stats.neighbours));

    this.position = this.position.add(this.velocity);

    this.bound();
    this.dirty = true;
  }

  spacing(neighbours)
  {
    let c = new Vector2(0,0)

    for (let t=0; t<neighbours.length; t++)
    {
        c = c.sub(neighbours[t].position.sub(this.position).norm());
    }
    //if (c.)
    return c.norm();
  }

  cohesion(target)
  {
    return target.sub(this.position)
                 .norm()
                 .sub(this.velocity)
                 .norm()
                 .mul(4);
  }

  bound()
  {
    this.position.x = this.wrap(this.position.x, this.bounds.x);
    this.position.y = this.wrap(this.position.y, this.bounds.y);
  }
  wrap(v, max)
  {
    if ( v < 0 ) return v + max;
    if ( v > max-1) return v - max;
    return v;
  }


  // Called at the start of every frame
  prepare()
  {
    this.dirty = false;
  }


}
