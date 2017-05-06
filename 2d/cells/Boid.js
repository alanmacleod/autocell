

import Vector2  from '../math/Vector2';

const PALETTE = [
  [0,0,128]
];

// How hard to put on the brakes; 0.0=hard, 0.99=soft
const DECEL_RATE = 0;

// How close to a predator until a boid gets scared
const PREDATOR_DANGER = 50;

// Between 0..1, lower means ignore more neighbours
const FUZZY_NEIGHBOURS = 0.6;

// Attraction radius of e.g. mouse cursor
const SEEK_INTEREST_RANGE = 50;


export default class Boid
{
  constructor(position, bounds)
  {
    this.bounds = bounds;

    this.maxVelocity = 3 + (Math.random());
    this.maxSteer = 0.1;

    this.velocity = new Vector2(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );

    this.accelerate = new Vector2();

    this.position =  new Vector2(
        Math.random() * this.bounds.x,
        Math.random() * this.bounds.y
    );

    this.prepare();
  }

  shader()
  {
    return PALETTE[0];
  }

  // For each boid we follow these steps
  mutate(stats)
  {
    // Calculate and sum correction vectors into 'accelerate' vector
    this.flock( stats.neighbours );

    // User seek / avoid
    this.interact( stats );

    // Apply the movement
    this.move();
  }

  interact(stats)
  {
    // Avoid the predator! (a mouse, ironically)
    //this.accelerate.tadd( this.flee( stats.mouse ) );

    // Seek the mouse!
    //this.accelerate.tadd( this.seek( stats.mouse ) );
  }

  move()
  {
    this.velocity.tadd( this.accelerate );
    let m = this.velocity.mag();

    if (m > this.maxVelocity)
      this.velocity.tdiv( m / this.maxVelocity );

    this.position.tadd( this.velocity );

    this.bound();

    this.accelerate.tmul( DECEL_RATE );

    this.dirty = true;
  }


  flock(neighbours)
  {
    this.accelerate = this.accelerate
                      .add(this.alignment( neighbours ))
                      .add(this.cohesion( neighbours ))
                      .add(this.separation( neighbours ));
  }

  // Head towards
  seek(target)
  {
    let d = this.position.dist( target );

    if (d > SEEK_INTEREST_RANGE)
      return new Vector2();

    return target.sub( this.position ).norm().mul( 0.1 );
  }

  // Steer away from, e.g. world boundary
  avoid(target)
  {
    return this.position
           .sub( target )
           .mul( 1 / this.position.distsq( target ));
  }

  // Run!
  flee(predator)
  {
    if (!predator) return new Vector2();

    let d = this.position.dist( predator );

    if (d > PREDATOR_DANGER)
      return new Vector2();

    let steer = this.position.sub( predator );

    return steer.mul( 0.5 / d );
  }

  // Head in the same direction
  alignment(neighbours)
  {
    let c = new Vector2();

    if (neighbours.length == 0)
      return c;

    let num = 0;

    for (let n of neighbours)
    {
      if (Math.random() > FUZZY_NEIGHBOURS) continue;
      c.tadd( n.velocity );
      num++;
    }

    if (num == 0)
      return c;

    c.tdiv( num );

    let force = c.mag();

    if (force > this.maxSteer)
      c.tdiv( force / this.maxSteer );

    return c;
  }

  // Bundle together
  cohesion(neighbours)
  {
    let c = new Vector2();

    if (neighbours.length == 0)
      return c;

    let num = 0;

    for (let n of neighbours)
    {
      if (Math.random() > FUZZY_NEIGHBOURS) continue;

      c.tadd( n.position );
      num++;
    }

    if (num == 0)
      return c;

    c.tdiv( num );

    let steer = c.sub( this.position );

    let force = steer.mag();

    if (force > this.maxSteer)
      steer.tdiv( force / this.maxSteer );

    return steer;
  }

  // Try not to collide
  separation(neighbours)
  {
    let c = new Vector2(); // summed correction vector

    if (neighbours.length == 0)
      return c;

    for (let n of neighbours)
    {
      if (Math.random() > FUZZY_NEIGHBOURS) continue;

      let d = n.position.dist(this.position);
      let r = this.position.sub(n.position);

      r.tnorm();
      r.tdiv(d);
      c.tadd(r);
    }

    return c;
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
  }

}
