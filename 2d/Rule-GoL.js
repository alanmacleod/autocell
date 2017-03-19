
import Rule from "./Rule";

const ALIVE = 1, DEAD = 0;

export default class GameOfLife extends Rule
{
  constructor()
  {
    super();
  }

  apply(cells)
  {
    let n = this.numNeighbours(cells);
    let newState;

    if (cells.subject == ALIVE && n < 2)
      newState = DEAD;
    else if (cells.subject == ALIVE && n > 3)
      newState = DEAD;
    else if (cells.subject == DEAD && n == 3)
      newState = ALIVE;
    else
      newState = cells.subject;

    return newState;

    // if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;
    //     else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;
    //     else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
    //     else next[x][y] = board[x][y];

  }

}
