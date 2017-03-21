

export default class Vector2
{
  constructor(x, y)
  {
    this.x = 0 || x;
    this.y = 0 || y;
  }

  sub(b)
  {
    return new Vector2(b.x - this.x, b.y - this.y);
  }

  add(b)
  {
    return new Vector2(b.x + this.x, b.y + this.y);
  }

  mul(s)
  {
    return new Vector2(this.x * s, this.y * s);
  }

  div(s)
  {
    return new Vector2(this.x / s, this.y / s);
  }

  norm()
  {
    let m = this.mag();
    return m ? this.div(m) : this;
  }

  mag()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dist(b)
  {
    let [xd, yd] = [ b.x - this.x, b.y - this.y];
    return Math.sqrt(xd*xd + yd*yd);
  }

  distsq(b)
  {
    let [xd, yd] = [ b.x - this.x, b.y - this.y];
    return (xd*xd + yd*yd);
  }

}
