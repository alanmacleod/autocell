

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

    if (iteration > maxrow)
    {

      let x1 = 0, y1 = 1 * this.size;
      let xw = vwidth, yh = vheight - this.size;      
      this.canvas2d.context.drawImage(this.canvas2d.context.canvas, x1, y1, xw, yh, 0, 0, xw, yh);

      iteration = maxrow;
      y = iteration * this.size;
      this.canvas2d.block(0, y, vwidth, this.size, [255,255,255]);

    //  return;
    }

    //if (iteration > maxrow) return;




    for (let w=0; w<generation.data.length-1; w++)
    {
      let x = w * this.size;
      if (generation.data[w])
        this.canvas2d.block(x, y, this.size, this.size);
    }

  }

}
