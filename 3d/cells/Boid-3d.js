
import Vector3  from '../math/Vector3';

// How hard to put on the brakes; 0.0=hard, 0.99=soft
const DECEL_RATE = 0;

// How close to a predator until a boid gets scared
const PREDATOR_DANGER = 50;

// Between 0..1, lower means ignore more neighbours
const FUZZY_NEIGHBOURS = 0.6;

// Attraction radius of e.g. mouse cursor
const SEEK_INTEREST_RANGE = 75;

// How much of flock to wrap, the rest are bounded
const FLOCK_WRAP = 0.5;

const MAX_VELOCITY = 6;

// Optimisation note: could eliminate (re)calculation of square roots

export default class Boid
{
  constructor(position, bounds)
  {
    this.bounds = bounds;

    // Random shade of grey
    let c = (128 + Math.floor(Math.random()*127)).toString(16);
    this.shade = `0x${c}${c}${c}`;

    this.maxVelocity = MAX_VELOCITY + (Math.random() * MAX_VELOCITY / 2);
    this.maxSteer = 0.1;

    this.velocity = new Vector3(
      Math.random() * MAX_VELOCITY - MAX_VELOCITY / 2,
      Math.random() * MAX_VELOCITY - MAX_VELOCITY / 2,
      Math.random() * MAX_VELOCITY - MAX_VELOCITY / 2
    );

    this.accelerate = new Vector3();

    this.position = new Vector3(
      Math.random() * this.bounds.maxx,
      Math.random() * this.bounds.maxy,
      Math.random() * this.bounds.maxz
    );
    // this.position =  new Vector3(
    //   (Math.random() >=0.5) ? Math.random() * this.bounds.minx : Math.random() * this.bounds.maxx,
    //   (Math.random() >=0.5) ? Math.random() * this.bounds.miny : Math.random() * this.bounds.maxy,
    //   (Math.random() >=0.5) ? Math.random() * this.bounds.minz : Math.random() * this.bounds.maxz,
    // );

  }

  shader()
  {
    return this.shade;
  }

  // For each boid we follow these steps
  mutate(stats)
  {
    //console.log(stats.neighbours.length);
    // Calculate and sum correction vectors into 'accelerate' vector
    this.flock( stats.neighbours );

    // User seek / avoid
    this.interact( stats );

    //Random movements
    this.fuzzy();

    // Apply the movement
    this.move();
  }


  flock(neighbours)
  {
    this.accelerate = this.accelerate
                      .add(this.alignment( neighbours ))
                      .add(this.cohesion( neighbours ))
                      .add(this.separation( neighbours ));
  }

  interact(stats)
  {
    // Avoid the predator! (a mouse, ironically)
    //this.accelerate.tadd( this.flee( stats.mouse ) );

    // Seek the mouse!
    //this.accelerate.tadd( this.seek( stats.mouse ) );
  }

  fuzzy()
  {
    if (Math.random() < 0.001)
      this.accelerate.tmul(this.maxVelocity);
  }

  move()
  {
    // Move a portion of the boids away from the world edge, wrap the rest.
    // This makes it look more natural as if stray birds are joining the flock
    // whilst others are leaving and creates two or three big flocks.

    //if (Math.random() > FLOCK_WRAP)
      this.bound();

    this.velocity.tadd( this.accelerate );
    let m = this.velocity.mag();

    if (m > this.maxVelocity)
      this.velocity.tdiv( m / this.maxVelocity );


    this.position.tadd( this.velocity );

    this.bound2();

    this.accelerate.tmul( DECEL_RATE );

    this.dirty = true;
  }


  bound()
  {
    let buffer = 10;

    // World edges
    let minx = this.avoid( new Vector3( this.bounds.minx, this.position.y, this.position.z ) );
    let maxx = this.avoid( new Vector3( this.bounds.maxx, this.position.y, this.position.z ) );

    let miny = this.avoid( new Vector3( this.position.x, this.bounds.miny, this.position.z ) );
    let maxy = this.avoid( new Vector3( this.position.x, this.bounds.maxy, this.position.z ) );

    let minz = this.avoid( new Vector3( this.position.x, this.position.y, this.bounds.minz ) );
    let maxz = this.avoid( new Vector3( this.position.x, this.position.y, this.bounds.maxz ) );

    minx.tmul( buffer ); maxx.tmul( buffer );
    miny.tmul( buffer ); maxy.tmul( buffer );
    minz.tmul( buffer ); maxz.tmul( buffer );

    this.accelerate.tadd( minx.add(maxx).add(miny).add(maxy).add(minz).add(maxz) );

  }

  // Head towards
  seek(target)
  {
    let d = this.position.dist( target );

    if (d > SEEK_INTEREST_RANGE)
      return new Vector3();

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
    if (!predator) return new Vector3();

    let d = this.position.dist( predator );

    if (d > PREDATOR_DANGER)
      return new Vector3();

    let steer = this.position.sub( predator );

    return steer.mul( 0.4 / d );
  }


  // Head in the same direction
  alignment(neighbours)
  {
    let c = new Vector3();

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
    let c = new Vector3();

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
    let c = new Vector3(); // summed correction vector

    if (neighbours.length == 0)
      return c;

    for (let n of neighbours)
    {
      if (Math.random() > FUZZY_NEIGHBOURS) continue;

      let d = n.position.dist(this.position);

      // On the off-chance we have two boids at the exact coordinates (shouldn't be possible)
      // dodge the divbyzero just in case!
      if (d == 0)
        continue;

      let r = this.position.sub(n.position);

      r.tnorm();
      r.tdiv(d);
      c.tadd(r);
    }

    return c;
  }

  bound2()
  {
    this.position.x = this.wrap(this.position.x, this.bounds.minx, this.bounds.maxx);
    this.position.y = this.wrap(this.position.y, this.bounds.miny, this.bounds.maxy);
    this.position.z = this.wrap(this.position.z, this.bounds.minz, this.bounds.maxz);
  }

  wrap(v, min, max)
  {
    let d = (max - min);
    if ( v < min ) return v + d;
    if ( v > max) return v - d;
    return v;
  }

}
