

export default class Generation
{
  constructor(size, randomise)
  {
    this.size = size;
    this.init();
  }

  init(randomise)
  {
    // Array of zeroes
    this.data = Array.from(new Array(this.size), () => 0);

    // Stick a 1 in the middle
    this.data[Math.round(this.size/2)] = 1;

    if (randomise) // wow
      for (let t=0; t<this.data.length; t++)
        this.data[t] = Math.round(Math.random());
  }


  mutate(rule, wrap)
  {
    // Create a new, blank, generation to write into
    let n = new Generation(this.size);

    // Look at each 'lifeform' in our generation's world
    for (let t=0; t<this.data.length; t++)
    {
      // Get its neighbours, wrapping the edge cases
      let prev = t-1 < 0 ? this.data.length-1 : t-1;
      let next = t+1 > this.data.length-1 ? 0 : t+1;

      let l = this.data[prev];
      let c = this.data[t];
      let r = this.data[next];

      // Create a 3-bit integer from the bit pattern
      let pattern = ((l&1) << 2) | ((c&1) << 1) | (r&1);

      // Apply the rule to this pattern
      let nextgen = rule.apply(pattern);

      // Put the mutated 'lifeform' into the next generation
      n.data[t] = nextgen;
    }

    // Disable wrapping
    if (!wrap)
    {
      n.data[0] = this.data[0];
      n.data[n.data.length-1] = this.data[this.data.length-1];
    }

    // return the next generation
    return n;
  }


}
