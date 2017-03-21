
import Vector2  from '../math/Vector2';

const PALETTE = [
  [0,0,0]
];


export default class Boid
{
  constructor(position, bounds)
  {
    this.bounds = bounds;
    this.speed = 1 + (Math.random() / 4)
    this.shyness = 2 + (Math.random() * 6);

    this.velocity = new Vector2(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    )

    // console.log(this.velocity);
    this.position =  new Vector2(Math.random() * this.bounds.x, Math.random() * this.bounds.y);
    this.prepare();

  }

  shader()
  {
    return PALETTE[0];
  }

  mutate(stats)
  {
    // this.velocity = this.velocity
    //               .add(this.cohesion(stats.centroid))
    //               // .add(this.spacing(stats.neighbours))
    //               // .add(this.rate(stats.neighbours))
    //               .norm();

//console.log(this.cohesion(stats.centroid).norm())
    // this.velocity = this.velocity.add(this.cohesion(stats.neighbours))
    // .mul(Math.random())
    // .add(this.spacing(stats.neighbours))
    // .norm();

    this.velocity = this.velocity.add(this.separate(stats.neighbours, this.shyness)).norm()
    .add(this.seek(stats.mouse)).mul(this.speed);

    this.position = this.position.add(this.velocity);

    //console.log(this.position);

    this.bound();
    this.dirty = true;
  }


  rate(neighbours)
  {
    let av = new Vector2(0,0);

    if (!neighbours.length) return av;

    for (let t=0; t<neighbours.length; t++)
        av = av.add(neighbours[t].velocity);

    av = av.div(neighbours.length);

    return av.sub(this.velocity).div(4);
  }

  seek(target)
  {
    let desired = target.sub(this.position).norm();
    let steer = desired.sub(this.velocity).norm().mul(0.7)
    return steer;
  }

  separate(neighbours, spacing)
  {
    let spacingsq = spacing * spacing;

    let c = new Vector2(0,0);
    if (!neighbours.length) return c;

    let num = 0;

    for (let t=0; t<neighbours.length; t++)
    {
      let d = neighbours[t].position.distsq(this.position);

      if (d < spacingsq)
      {
        let diff = this.position.sub(neighbours[t].position).norm();
        c = c.add(diff);
        num++;
      }

      if (!num) return c;

      c = c.div(num).mul(2);

      return c.sub(this.velocity).norm();

    }
    //
    // for (let t=0; t<neighbours.length; t++)
    // {
    //     c = c.sub(
    //               neighbours[t].position
    //               .sub(this.position)
    //               .norm()
    //         );
    // }
    //
    // return c.norm();
  }

  cohesion(target)
  {
    return target.sub(this.position)
                 .norm()
                 .sub(this.velocity)
                 .norm()
                 ;

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
