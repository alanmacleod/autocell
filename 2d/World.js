

export default class World
{
  constructor(size)
  {
    this.size = size; //cells, square
    this.data = null;

    this.init();
  }

  init()
  {
    // Create the array:
    for (this.data=[]; this.data.length < this.size; this.data.push([]));

    // Randomise the initial state:
    for (let y=0; y<this.size; y++)
      for (let x=0; x<this.size; x++)
        this.data[y][x] = Math.round(Math.random());
  }


}
