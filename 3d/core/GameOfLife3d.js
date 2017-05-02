
import Renderer     from './Renderer3d';

export default class GameOfLife3d
{
  constructor(options)
  {
    this.size = options.size;
    this.renderer = new Renderer(options);
    this.renderFrom = null;
    this.writeBufferIndex = null;

    this.init(options.spread);
  }

  init(spread)
  {
    this.buffers = [
      this.array3d(this.size),
      this.array3d(this.size)
    ];

    this.writeBufferIndex = 0;
    let writeTo = this.buffers[this.writeBufferIndex];

    for (let z=0; z<this.size; z++)
      for (let y=0; y<this.size; y++)
        for (let x=0; x<this.size; x++)
        {
          if (Math.random() < spread)
            writeTo[z][y][x] = Math.round(Math.random());
        }

    this.renderFrom = writeTo;
    this.writeBufferIndex = 1 - this.writeBufferIndex;
  }

  evolve()
  {
    return;
    // 
    // let writeTo = this.buffers[this.writeBufferIndex];
    // let readFrom = this.buffers[1 - this.writeBufferIndex];
    //
    // // Use current
    // for (let z=0; z<this.size; z++)
    //   for (let y=0; y<this.size; y++)
    //     for (let x=0; x<this.size; x++)
    //     {
    //       //this.currentWorld[y][]
    //     }
    //
    // this.renderFrom = writeTo;
    // this.writeBufferIndex = 1 - writeBufferIndex;
  }

  render()
  {
    if (this.renderFrom)
      this.renderer.render(this.renderFrom);
  }

  array3d(size)
  {
    for (var z=[]; z.length<size;)
    {
      for (var d=[]; d.length < size; d.push([]))
      z.push(d);
    }

    return z;
  }
}
