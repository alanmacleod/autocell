
import PointRenderer from './Renderer-3d';

export default class World3d
{
  constructor(options)
  {
    this.size = options.size; //cells, square
    this.data = null;

    this.evolve = this.vertical;
    this.maxObj = this.init(options.type, options.spread);

    this.renderer = new PointRenderer3d(Object.assign(options, {maxParticles: this.maxObj}));
  }

  testPowerTwo(v)
  {
    return ((v & (v-1)) == 0);
  }

  init(CellType, spread)
  {
    // Create the array:
    this.data = this.array3d(this.size);
    let i = 0;

    let maxVisibleObjects = 0;

    for (let z=0; z<this.size; z++)
    {
      for (let y=0; y<this.size; y++)
      {
        for (let x=0; x<this.size; x++)
        {
          // Does CellType provide a static 'test'ing function?
          if (CellType.test)
          {
            // Is it ok if we place the cell here?
            if (Math.random() <= spread)
              this.data[z][y][x] = new CellType(
                CellType.test(x,y,this.size, this.size)
              );
          } else {
            if (Math.random() <= spread)
            {
              this.data[z][y][x] = new CellType();
              if (this.data[z][y][x].shader())
                maxVisibleObjects++;
            }
          }
        }
      }
    }

    return maxVisibleObjects;
  }

  render()
  {
    this.renderer.render(this.data);

  }

  neighbourhood3d(x, y, z, r)
  {
    let radius = r || 1;
    let num = (radius * 2) + 1;

    let vx = x - radius;
    let vy = y - radius;
    let vz = z - radius;

    //let n = this.array2d(num);
    let n = this.array3d(num);
    let l = [];

    for (let iz=0; iz<num; iz++)
    {
      vy = y - radius;
      for (let iy=0; iy<num; iy++)
      {
        vx = x - radius;
        for (let ix=0; ix<num; ix++)
        {
          n[iz][iy][ix] = this.data[this.wrap(vz)][this.wrap(vy)][this.wrap(vx)];
          l.push(this.data[this.wrap(vz)][this.wrap(vy)][this.wrap(vx)]);
          vx++;
        }
        vy++;
      }
      vz++;
    }

    return {
      cells: n,
      linear: l,
      radius: radius,
      subject: this.data[z][y][x]
    }
  }

  wrap(v)
  {
    if ( v < 0 ) return v + this.size;
    if ( v > this.size-1) return v - this.size;
    return v;
  }

  array3d(size)
  {
    // Slight scope hack, won't worth with `let`
    for (var z=[]; z.length< size;)
    {
      for (var d=[]; d.length < size; d.push([]));
      z.push(d);
    }
    return z;
  }

  // array2d(size)
  // {
  //   for (var d=[]; d.length < size; d.push([]));
  //   return d;
  // }

  vertical()
  {
    //let next = this.array2d(this.size);

    //this.prepare();

    for (let z=0; z<this.size; z++)
    {
      for (let y=0; y<this.size; y++)
      {
        for (let x=0; x<this.size; x++)
        {
          if (this.data[z][y][x])
              this.data[z][y][x].mutate(this.neighbourhood3d(x,y,z));
        }
      }
    }



    //this.data = next;
  }

  finish()
  {
    for (let y=0; y<this.size; y++)
      for (let x=0; x<this.size; x++)
        this.data[y][x].alivei = 1 - this.data[y][x].alivei;
  }

  prepare()
  {
    let n = 0;
    for (let y=0; y<this.size; y++)
      for (let x=0; x<this.size; x++)
        if (this.data[y][x]) this.data[y][x].prepare();

  }

}
