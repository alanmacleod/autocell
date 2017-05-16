
import Vector2            from '../../2d/math/Vector2';
import Vector3            from '../math/Vector3';
import GeomRenderer3d    from '../core/GeomRenderer-3d'
import SpatialGrid3d      from '../core/SpatialGrid-3d'

const NEIGHBOUR_RADIUS = 250;

export default class OpenWorld
{
  constructor(options)
  {
    this.size = options.size; // World size
    this.data = null;
    this.scale = options.scale || 1;

    this.pause = false;

    let hmax = this.size / 2;

    this.bounds = {
      minx: 0, maxx: this.size-1,
      miny: 0, maxy: this.size-1,
      minz: 0, maxz: this.size-1
    };

    this.grid = new SpatialGrid3d(this.bounds, 10, false, 'position');

    this.element = document.getElementById(options.render);

    document.onkeyup = (e) => {
      if (e.code == "Space")
      {
        this.pause = !this.pause;
      }
    };

    this.mouse = new Vector2(0,0);

    this.element.onmousemove = (e) => { this.mouse.set(e.clientX, e.clientY); }

    this.maxObj = this.init(options.type, options.spread);

    this.renderer = new GeomRenderer3d(Object.assign(options, {
      maxParticles: this.maxObj,
      worldWidth: this.size,
      worldHeight: this.size,
      worldDepth: this.size,
      skyBox: "./img/cloudySea.jpg" // 4x3
    }))
  }

  // Create and save a list of entities
  init(CellType, spread)
  {
    this.data = [];
    this.graphics = [];

    for (let t=0; t<spread; t++)
    {
      let cell = new CellType(new Vector3(), this.bounds);

      this.data.push(cell);
      this.grid.add(cell);
    }

    return this.data.length;
  }

  render()
  {
    this.renderer.render(this.data, 'position', 'velocity');
  }


  wrap(v)
  {
    if ( v < 0 ) return v + this.size;
    if ( v > this.size-1) return v - this.size;
    return v;
  }

  array2d(size)
  {
    for (var d=[]; d.length < size; d.push([]));
    return d;
  }

  evolve()
  {
    if (this.pause) return;

    let statistics = {
      centroid: this.centroid(),
      number: this.data.length,
      mouse: this.mouse.div(this.scale),
      all: this.data
    }

    for (let t=0,l=this.data.length; t<l;t++)
    {
      // statistics.neighbours = this.neighbourhoodBruteForce(t, NEIGHBOUR_RADIUS);
      statistics.neighbours = this.grid.query(this.data[t], NEIGHBOUR_RADIUS);

      let x = this.data[t].position.x;
      let y = this.data[t].position.y;
      let z = this.data[t].position.z;

      this.data[t].mutate(statistics);

      // Update spatial index
      this.grid.move(this.data[t],
                     x, y, z,
                     this.data[t].position.x,
                     this.data[t].position.y,
                     this.data[t].position.z
                   );
    }

  }

  neighbourhoodBruteForce(index, r)
  {
    let rs = r * r;
    let n = [];
    let test = this.data[index].position;

    for (let t=0, l=this.data.length; t<l; t++)
    {
      if ( t == index ) continue;
      let d = this.data[t].position.distsq(test);
      if ( d <= rs ) n.push(this.data[t]);
    }

    return n;
  }

  centroid()
  {
    let sx = 0, sy = 0, sz = 0;
    for (let t=0,l=this.data.length; t<l; t++)
    {
      sx += this.data[t].position.x;
      sy += this.data[t].position.y;
      sz += this.data[t].position.z;
    }

    return new Vector3(sx / this.data.length, sy / this.data.length, sz / this.data.length);
  }

}
