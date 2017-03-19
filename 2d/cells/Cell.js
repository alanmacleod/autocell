
// This is the base type of Cell used for every CA type.
// It's more of a classical "Interface" than a class I suppose

export default class Cell
{
  constructor()
  {

  }

  mutate(neighbours)
  {

  }

  shader()
  {

  }


  value()
  {

  }

  numLiveNeighbours(n)
  {
    let num = 0;

    for (let y = 0; y<n.cells.length; y++)
      for (let x = 0; x<n.cells[y].length; x++)
        if (n.cells[y][x]) if (n.cells[y][x].value() > 0) num ++;

    // don't include 'us' in the count!
    return num - (n.subject.value() > 0 ? 1 : 0);
  }
}
