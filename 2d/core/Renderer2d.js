
import Canvas2d from '../../shared/Canvas2d';

export default class Renderer2d
{
  constructor(element)
  {
    this.canvas2d = new Canvas2d(element);
    this.scale = 1;
    this.size = 1;
  }

  resize(w, h)
  {
    this.canvas2d.resize(w, h);
    this.canvas2d.clear();
  }

  render(data)
  {

    if (data.length != this.size)
    {
      this.size = data.length;
      this.resize(this.size * this.scale, this.size * this.scale);
    }

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
      {
        if (data[y][x])
        {
          let col = data[y][x].shader();
        //let col = data[y][x] ? [0,0,0] : [255,255,255];
          this.canvas2d.block(x * this.scale, y * this.scale, this.scale, this.scale, col);
        }
      }
    }

  }

}
