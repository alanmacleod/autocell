

export default class World
{
  constructor(size)
  {
    this.size = size; //cells, square
    this.data = null;

    this.init();
  }

  init()
  {
    // Create the array:
    this.data = this.array2d(this.size);
    let i = 0;
    // Randomise the initial state:
    for (let y=0; y<this.size; y++)
      for (let x=0; x<this.size; x++)
        this.data[y][x] = Math.round(Math.random());
  }

  neighbourhood(x, y, r)
  {
    let radius = r || 1;
    let num = (radius * 2) + 1;

    let vx = x - radius;
    let vy = y - radius;

    let n = this.array2d(num);

    for (let iy=0; iy<num; iy++)
    {
      vx = x - radius;
      for (let ix=0; ix<num; ix++)
      {
        n[iy][ix] = this.data[this.wrap(vy)][this.wrap(vx)];
        vx++;
      }
      vy++;
    }

    return {
      cells: n,
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

  mutate(rule)
  {
    let next = this.array2d(this.size);

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
        next[y][x] = rule.apply(this.neighbourhood(x,y));
    }

    this.data = next;
  }

}
