
import Cell from './Cell';

const ALIVE = 1, DEAD = 0;

const palette = [
  [255,255,255],
  [0,0,0]
];

export default class GameOfLife extends Cell
{
  constructor()
  {
    super();
    this.alive = [Math.round(Math.random()), 0];
    this.alivei = 0;
  }

  shader()
  {
    return this.alive[this.alivei] ? palette[this.alive[this.alivei]] : null;
    //return palette[ this.alive ];
  }

  isAlive()
  {
    return this.alive[this.alivei];
  }

  evaluate()
  {
    return this.alive[this.alivei] ? 1 : 0;
  }

  // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
  // value(v)
  // {
  //   if (v === undefined) return this.alive ? 1 : 0;
  //   this.alive = (v == 0) ? DEAD : ALIVE;
  // }

  prepare()
  {
    this.needsUpdate = false;
  }

  mutate(cells)
  {
    let n = this.numLiveNeighbours(cells);

    let ai = cells.subject.alivei;
    let curState = cells.subject.alive[ai];
    let newState = DEAD;

    if (curState && n < 2)
      newState = DEAD;
    else if (curState && n > 3)
      newState = DEAD;
    else if (!curState && n == 3)
      newState = ALIVE;
    else
      newState = curState;

    cells.subject.alive[1 - ai] = newState;
    //cells.subject.alivei = 1 - ai;
    cells.subject.needsUpdate = (curState != newState);

    //return me;
  }

}
