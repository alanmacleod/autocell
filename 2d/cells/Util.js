

class Util
{
  constructor()
  {

  }

  // Linearly interpolates between an array of values
  // e.g. values = [5, 10, 1], p = 0..1

  ilinerp(values, position)
  {
    if (position >= 1) return values[values.length-1];
    if (position < 0) return values[0];

    let p = position * (values.length - 1);

    let i1 = Math.floor(p);
    let i2 = i1 + 1;
    let q = p - i1;

    let v = (values[i1] * (1-q)) + (values[i2] * (q));

    return Math.round(v);
  }
}

export default (new Util());
