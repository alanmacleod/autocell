

export default class Rule
{
  constructor()
  {

  }

  numNeighbours(n)
  {
    let num = 0;

    for (let y = 0; y<n.cells.length; y++)
    {
      for (let x = 0; x<n.cells[y].length; x++)
      {
        if (n.cells[y][x] != 0) num ++;
      }
    }

    // don't include 'us' in the count!
    return num - (n.subject != 0 ? 1 : 0);
  }

}
