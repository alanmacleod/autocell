
import Renderer     from './Renderer3d';

export default class World
{
  constructor(options)
  {
    this.size = options.size; //cells, square
    this.data = null;
    this.ptype = {};

    this.evolve = this.vertical;

    this.renderer = new Renderer(options);
    //this.renderer.scale = options.scale;

    this.init(options.type, options.spread);
  }

  init(CellType, spread)
  {
    // Create the array:
    this.data = this.array2d(this.size);
    let i = 0;

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
      {
        // Does CellType provide a static 'test'ing function?
        if (CellType.test)
        {
          // Is it ok if we place the cell here?
          //if ()
          if (Math.random() <= spread)
            this.data[y][x] = new CellType(
              CellType.test(x,y,this.size, this.size)
            );
        } else {
          if (Math.random() <= spread)
            this.data[y][x] = new CellType();
        }
      }
    }
  }

  render()
  {
    this.renderer.render(this.data);
  }

  neighbourhood(x, y, r)
  {
    let radius = r || 1;
    let num = (radius * 2) + 1;

    let vx = x - radius;
    let vy = y - radius;

    let n = this.array2d(num);
    let l = [];

    for (let iy=0; iy<num; iy++)
    {
      vx = x - radius;
      for (let ix=0; ix<num; ix++)
      {
        n[iy][ix] = this.data[this.wrap(vy)][this.wrap(vx)];
        l.push(this.data[this.wrap(vy)][this.wrap(vx)]);
        vx++;
      }
      vy++;
    }

    return {
      cells: n,
      linear: l,
      radius: radius,
      subject: this.data[y][x]
    }
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

  vertical()
  {
    let next = this.array2d(this.size);

    this.prepare();

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
      {
        if (this.data[y][x])
          next[y][x] = this.data[y][x].mutate(this.neighbourhood(x,y));
      }
    }

    this.data = next;
  }

  prepare()
  {
    let n = 0;
    for (let y=0; y<this.size; y++)
      for (let x=0; x<this.size; x++)
        if (this.data[y][x]) this.data[y][x].prepare();

  }

}
