
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
    this.shyness = 5 + (Math.random() * 5);

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
    this.velocity = this.velocity
                    .add(this.separate(stats.neighbours, this.shyness))
                    .add(this.align(stats.neighbours))
                    //.add(this.cohesion2(stats.neighbours))
                    //.add( this.cohesion( stats.centroid ) )
                    .add(this.seek(stats.mouse))
                    .norm();

    //console.log( this.align( stats.neighbours ) );





    this.position = this.position.add(this.velocity);


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

  align2(neighbours)
  {
    let distsq = 20 * 20;

    let c = new Vector2(0,0);
    let num = 0;

    for (let t=0; t< neighbours.length; t++)
    {
      let d = neighbours[t].position.distsq(this.position);
      if (d > 0 && d < distsq)
      {
        c = c.add(neighbours[t].velocity);
        num++;
      }
    }

    if (!num) return c;

    return c.div(num).norm().mul(1.5).sub(this.velocity).norm();

  }

  cohesion2(neighbours)
  {
    let c = new Vector2(0,0)
    if (neighbours.length == 0) return c;


    for (let t=0; t<neighbours.length; t++)
      c = c.add(neighbours[t].position);

    //console.log( neighbours.length );

    //return this.cohesion( c.div( neighbours.length ) );
    //return c.div(neighbours.length).norm().sub(this.position);
    return this.seek(c.div(neighbours.length));

  }

  align(neighbours)
  {
    let c = new Vector2(0,0)
    if (neighbours.length == 0) return c;


    for (let t=0; t<neighbours.length; t++)
      c = c.add(neighbours[t].velocity);

    //console.log( neighbours.length );

    //return this.cohesion( c.div( neighbours.length ) );
    return c.div(neighbours.length).norm().sub(this.velocity);
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
        c = c.add(diff.div(d));
        num++;
      }

      if (!num) return c;

      c = c.div(num).norm();

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
                 .sub(this.velocity)
                 .norm();
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
