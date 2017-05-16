

export default class Vector3
{
  constructor(x=0, y=0, z=0)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z)
  {
    [this.x, this.y, this.z] = [x, y, z];
    return this;
  }

  // Create new vectors

  sub(b)
  {
    return new Vector3(this.x - b.x, this.y - b.y, this.z - b.z);
  }

  add(b)
  {
    return new Vector3(b.x + this.x, b.y + this.y, b.z + this.z);
  }

  mul(s)
  {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }


  div(s)
  {
    return new Vector3(this.x / s, this.y / s, this.z / s);
  }

  // Arithmetic in-place

  tsub(b)
  {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
    return this;
  }

  tadd(b)
  {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
    return this;
  }

  tmul(s)
  {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  tdiv(s)
  {
    this.x /= s;
    this.y /= s;
    this.z /= s;
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
    return m ? this.div(m) : new Vector3(this.x, this.y, this.z);
  }

  mag()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dist(b)
  {
    let [xd, yd, zd] = [ b.x - this.x, b.y - this.y, b.z - this.z];
    return Math.sqrt(xd*xd + yd*yd + zd*zd);
  }

  distsq(b)
  {
    let [xd, yd, zd] = [ b.x - this.x, b.y - this.y, b.z - this.z];
    return (xd*xd + yd*yd + zd*zd);
  }

}
