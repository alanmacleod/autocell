
import Cell from './Cell';
import Util from './Util';

const MAX_VALUES = 32;
const R=0, G=1, B=2;
//
// const palette = [
//   [10, 255, 96],
//   [255, 32, 255],
//   [172, 54, 255],
//   [32, 32, 255],
//   [32, 255, 255],
//   [32, 32, 255],
//   [255, 255, 32]
// ];

// nice clouds
// const palette = [
//   [53, 177, 255],
//   [200, 200, 215],
//   [255, 255, 255]
// ];

// fire ish
// const palette = [
//   [255, 0, 0],
//   [255, 255, 0],
//   [255, 255, 220]
// ];

const palette = [
  [255,0,0,1], [255,96,0,1], [255,191,0,1], [223,255,0,1],
  [128,255,0,1], [32,255,0,1], [0,255,64,1], [0,255,159,1],
  [0,255,255,1], [0,159,255,1], [0,64,255,1], [32,0,255,1],
  [127,0,255,1], [223,0,255,1], [255,0,191,1], [255,0,96,1]
];

const REDS = palette.map((e) => { return e[R] });
const GREENS = palette.map((e) => { return e[G] });
const BLUES = palette.map((e) => { return e[B] });

export default class Flood extends Cell
{
  constructor()
  {
    super();
    this.state = Math.floor(Math.random() * MAX_VALUES);
  }

  shader()
  {
    let i = this.value() / MAX_VALUES;

    return [
      Util.ilinerp(REDS, i) & 0xff,
      Util.ilinerp(GREENS, i) & 0xff,
      Util.ilinerp(BLUES, i) & 0xff
    ];

  }

  // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
  value(v)
  {
    if (v == undefined) return this.state;
    this.state = v;
  }


  mutate(entity)
  {

    let next = (this.value() + 1 + (Math.floor(Math.random() * 3))) % MAX_VALUES;
    //(this.value() + (Math.floor(Math.random() * 5))) % MAX_VALUES;

    let change = false;
    for (let t=0; t<entity.linear.length; t++)
    {
      if (entity.linear[t])
        change = change || entity.linear[t].value() === next;
    }

    if (!change)
    {
      let nc = this.averageValueNeighbours(entity);
      if (Math.abs(this.value() - nc) == 1)
        this.value(nc);

    }

    if (change)
      this.value(next);

    return this;
  }



}
