
import Vector2  from '../math/Vector2';

const PALETTE = [
  [0,0,0]
];

const DECEL_RATE = 0.33;  // How hard to put on the brakes! 0.0=hard, 0.99=soft

export default class Boid
{
  constructor(position, bounds)
  {
    this.bounds = bounds;
    this.speed = 1 + (Math.random() / 4)
    this.shyness = 10 + (Math.random() * 10);

    this.maxVelocity = 2 + (Math.random());

    // this.velocity = new Vector2(
    //   (Math.random() - 0.5) * 4,
    //   (Math.random() - 0.5) * 4
    // )

    this.velocity = new Vector2(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );

    this.accelerate = new Vector2(0,0);

    // console.log(this.velocity);
   this.position =  new Vector2(Math.random() * this.bounds.x, Math.random() * this.bounds.y);
    //this.position =  new Vector2(Math.random() * 10, Math.random() * 10);
    this.prepare();

  }

  shader()
  {
    return PALETTE[0];
  }

  mutate(stats)
  {
    this.flock(stats.neighbours);
    this.move();
  }



  move()
  {
    this.velocity.tadd(this.accelerate);
    let m = this.velocity.mag();

    if (m > this.maxVelocity)
      this.velocity.tdiv(m / this.maxVelocity);

    this.position.tadd(this.velocity);

    this.accelerate.tmul( DECEL_RATE );

    this.bound();
    this.dirty = true;
  }


  flock(neighbours)
  {
    this.accelerate = this.accelerate
                      .add(this.falignment(neighbours))
                      .add(this.fcohesion(neighbours))
                      .add(this.fseparation(neighbours))
  }

  falignment(neighbours)
  {
    return new Vector2();
  }

  fcohesion(neighbours)
  {
    return new Vector2();
  }

  fseparation(neighbours)
  {
    let c = new Vector2(); // summed correction vector
    let r = new Vector2();

    for (let t=0; t<neighbours.length; t++)
    {
      let d = neighbours[t].position.dist(this.position);

      r = this.position.sub(neighbours[t].position);
      r.norm();

    }

    //return c.norm();
    return new Vector2();
  }

  mutateold(stats)
  {
    this.velocity = this.velocity
                    //.add(this.separate(stats.neighbours, this.shyness))
                    //.add(this.align(stats.neighbours))
                    //.add(this.cohesion2(stats.neighbours))
                    //.add( this.cohesion( stats.centroid ) )
                    //.add(this.seek(stats.mouse))
                  //  .norm();

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
      if (t & 1) c = c.add(neighbours[t].position);

    //console.log( neighbours.length );

    //return this.cohesion( c.div( neighbours.length ) );
    //return c.div(neighbours.length).norm().sub(this.position);
    return this.seek(c.div(neighbours.length).mul(.8));

  }

  align(neighbours)
  {
    let c = new Vector2(0,0)
    if (neighbours.length == 0) return c;


    for (let t=0; t<neighbours.length; t++)
      c = c.add(neighbours[t].velocity);

    return c.div(neighbours.length).norm().mul(this.speed).sub(this.velocity);
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

  // wrap(v, max)
  // {
  //   if ( v < 0 ) 0
  //   if ( v > max-1) return max-1;
  //   return v;
  // }

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
