
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
    this.alive = Math.round(Math.random());
  }

  shader()
  {
    return palette[ this.alive ];
  }

  // Assigns a generic 'value' to feedback into the Cell 'interface' counting method
  evaluate()
  {
    return this.alive ? 1 : 0;
  }

  mutate(cells)
  {
    let n = this.numNeighbours(cells);
    let me = new GameOfLife();
    let newState = DEAD;

    if (cells.subject.alive && n < 2)
      newState = DEAD;
    else if (cells.subject.alive && n > 3)
      newState = DEAD;
    else if (!cells.subject.alive && n == 3)
      newState = ALIVE;
    else
      newState = cells.subject.alive;

    me.alive = newState;
    return me;
  }

}
