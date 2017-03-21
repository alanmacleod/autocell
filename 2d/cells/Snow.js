
import Cell from './Cell';
import Util from './Util';

const MAX_VALUES = 16;

const palette = [
  [0, 0, 0],
  [255, 255, 255]
];

const bwpalette = [ 0, 255 ];

class Snow extends Cell
{
  constructor(pass)
  {
    super();

    this.snowing = false;
    this.value(0);

    if (pass)
        this.startSnowing();
  }

  prepare()
  {

  }

  startSnowing()
  {
    this.snowing = true;
    this.value ((Math.random() > 0.6) ? MAX_VALUES : 0);
  }

  shader()
  {
    let i = Util.ilinerp(bwpalette, this.value() / MAX_VALUES);
    return [ i, i, i ];

    //return palette [ this.value() ];
  }

  value(v)
  {
    if (v == undefined) return this.state;
    this.state = v;
  }

  mutate(entity)
  {
    if (this.snowing)
    {
      this.value( this.value() - Math.round(Math.random() * 3));
      //
      if (this.value() < 8)
      {
          entity.cells[2][1].snowing = true;
          entity.cells[2][1].value(this.value() + 4);
          this.value(MAX_VALUES);
      }
      //
      // if (this.value() <= 0)
      // {
      //   this.value(0);
      //   this.snowing = false;
      // }
    }

    return this;

  }

}

Snow.test = (x, y, w, h) => {
  return y == 0;
  //return true;
}

export default Snow;
