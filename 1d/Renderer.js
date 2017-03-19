

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
    let vheight = this.canvas2d.height();
    let vwidth = this.canvas2d.width();

    let maxrow = (Math.floor(vheight / this.size)) - 1;

    let y = iteration * this.size;

    // Iteration exceeds screen space...
    if (iteration > maxrow)
    {
      // Copy the whole screen and shift it up one block size
      let x1 = 0, y1 = this.size;
      let w = vwidth, h = vheight - this.size;
      this.canvas2d.selfblit(x1, y1, w, h, 0, 0, w, h);

      // adjust iteration to the bottom most row
      iteration = maxrow;
      y = iteration * this.size;

      // Clear the last row ready for drawing
      this.canvas2d.block(0, y, vwidth, this.size, [255,255,255]);
    }

    for (let w=0; w<generation.data.length-1; w++)
    {
      let x = w * this.size;
      if (generation.data[w])
        this.canvas2d.block(x, y, this.size, this.size);
    }

  }

}
