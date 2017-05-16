

export default class Vector2
{
  constructor(x=0, y=0)
  {
    this.x = x;
    this.y = y;
  }

  set(x, y)
  {
    [this.x, this.y] = [x, y];
    return this;
  }

  // Create new vectors

  sub(b)
  {
    return new Vector2(this.x - b.x, this.y - b.y);
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

  // Arithmetic in-place

  tsub(b)
  {
    this.x -= b.x;
    this.y -= b.y;
    return this;
  }

  tadd(b)
  {
    this.x += b.x;
    this.y += b.y;
    return this;
  }

  tmul(s)
  {
    this.x *= s;
    this.y *= s;
    return this;
  }

  tdiv(s)
  {
    this.x /= s;
    this.y /= s;
    return this;
  }

  tnorm()
  {
    let m = this.mag();
    return m ? this.tdiv(m) : this;
  }

  norm()
  {
    let m = this.mag();
    return m ? this.div(m) : new Vector2(this.x, this.y);
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
