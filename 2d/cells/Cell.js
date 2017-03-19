

export default class Cell
{
  constructor()
  {

  }

  init(options)
  {
    if (!options) return;

  }

  mutate(neighbours)
  {

  }

  shader()
  {

  }

  evaluate()
  {

  }

  numNeighbours(n)
  {
    let num = 0;

    for (let y = 0; y<n.cells.length; y++)
      for (let x = 0; x<n.cells[y].length; x++)
        if (n.cells[y][x]) if (n.cells[y][x].evaluate() > 0) num ++;

    // don't include 'us' in the count!
    return num - (n.subject.evaluate() > 0 ? 1 : 0);
  }
}
