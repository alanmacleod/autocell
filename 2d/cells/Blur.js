
import Cell from './Cell';
import Util from './Util';

const MAX_VALUES = 32;
const R=0,G=1,B=2;
const palette = [
  [0,0,0,1], [255,0,0,0], [255,96,0,1], [255,191,0,1], [223,255,0,1],
  [128,255,0,1], [32,255,0,1], [0,255,64,1], [0,255,159,1],
  [0,255,255,1], [0,159,255,1], [0,64,255,1], [32,0,255,1],
  [127,0,255,1], [223,0,255,1], [255,0,191,1], [255,0,96,1]
];


const REDS = palette.map((e) => { return e[R] });
const GREENS = palette.map((e) => { return e[G] });
const BLUES = palette.map((e) => { return e[B] });



export default class Blur extends Cell
{
  constructor()
  {
    super();
    this.state = Math.floor(Math.random() * MAX_VALUES);
  }

  prepare()
  {

  }

  shader()
  {
    let i = this.state / MAX_VALUES;
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
    if (v < 0) v+= MAX_VALUES;
    this.state = Math.round(v);
  }


  mutate(entity)
  {
    // if (entity.cells[0][1].value() > this.value())
    // {
    //   let t = this.value();
    //   this.value(entity.cells[0][1].value());
    //   entity.cells[0][1].value(t);
    // } else {
    //   let t = this.value();
    //   this.value(entity.cells[1][2].value());
    //   entity.cells[1][2].value(t);
    // }
    let av = this.averageValueNeighbours(entity);
    this.value(av);

    // if (this.numNeighboursWithValue(entity, 0) >= 2)
    // {
    //   this.value(MAX_VALUES-1);
    // }

    //let av = this.averageValueNeighbours(entity) * 1.0;


    if (Math.random() < 0.01) this.value( 0);
    return this;
  }

}
