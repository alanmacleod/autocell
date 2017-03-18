

export default class Renderer1d
{
  // size = square size of the block in pixels
  constructor(canvas2d, size)
  {
    this.canvas2d = canvas2d;
    this.size = size;
  }

  // Draw a row of blocks 
  render(generation, iteration)
  {
    let y = iteration * this.size;

    for (let w=0; w<generation.data.length-1; w++)
    {
      let x = w * this.size;
      if (generation.data[w])
        this.canvas2d.block(x, y, this.size, this.size);
    }

  }

}
