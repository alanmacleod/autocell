

// Boilerplate functions to write to the Canvas 

export default class Canvas2d
{
  constructor(parent)
  {
    this.parent = typeof parent == 'string' ? document.getElementById(parent) : parent;
    this.element = document.createElement("canvas");
    this.parent.appendChild(this.element);
    this.context = this.element.getContext("2d");
    this.clear();

  }

  block(x,y,w,h,c)
  {
    let t = this.context;
    t.beginPath();
    t.rect(x, y, w, h);
    t.fillStyle = c ? `rgb(${c[0]},${c[1]},${c[2]})` : "black";
    t.fill();
  }

  clear(c)
  {
    let t = this.context;
    t.beginPath();
    t.rect(0, 0, this.element.width, this.element.height);
    t.fillStyle = c ? `rgb(${c[0]},${c[1]},${c[2]})` : "white";
    t.fill();
  }

  width()
  {
    return this.element.width;
  }

  height()
  {
    return this.element.height;
  }

  fitwindow()
  {
    this.resize(this.parent.clientWidth, this.parent.clientHeight);
  }

  resize(w, h)
  {

    this.element.width = w;
    this.element.height = h;

    // draw()
  }
}
