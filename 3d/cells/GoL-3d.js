
import Cell3d from './Cell-3d';

const ALIVE = 1, DEAD = 0;

const PALETTE = [
  null,
  [255,255,255]
];

export default class GameOfLife3d extends Cell3d
{
  constructor()
  {
    super();
    this.alive = Math.round(Math.random());
  }

  value()
  {
    return this.alive;
  }

  shader()
  {
    return PALETTE[this.alive];
  }

  prepare()
  {
    // this.needsUpdate = false;
  }

  mutate(cells)
  {
    let n = this.numLiveNeighbours(cells);

    let curState = cells.subject.alive;
    let newState = DEAD;

    // use normalised fractions? or actual integer counts?

    // 2d: num neighbours == 8
    // 3d: num neighbours == 26

    // 26 * [0.25] == 6.5 == 7 or 6 (alternate randomly?)
    // 26 * [0.375] == 9.75 == 10

    if (curState && n < 6)  // 2d: < 2 ( / 8 = [0.25])
      newState = DEAD;
    else if (curState && n > 10) // 2d: > 3 ( / 8 = [0.375])
      newState = DEAD;
    else if (!curState && n == 10) // 2d: == 3 ( / 8 = 0.375)
      newState = ALIVE;
    else
      newState = curState;

    cells.subject.alive = newState;
    // cells.subject.needsUpdate = (curState != newState);
  }

}
