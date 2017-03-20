
import Cell from './Cell';
import Util from './Util';

const palette = [
  [255,255,255],
  [0,0,0]
];


export default class Burrow extends Cell
{
  constructor()
  {
    super();
    this.open = Math.random() > 0.4;
  }

  prepare()
  {
    this.wasOpen = this.open;
  }

  shader()
  {
    return palette [ this.value() ];
  }


  value(v)
  {
    return this.wasOpen ? 1 : 0;
  }


  mutate(entity)
  {
    let num = this.numLiveNeighbours(entity);
    this.open = (this.wasOpen && num >=4) || num >= 6;
    return this;
  }
}
