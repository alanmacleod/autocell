

export default class Generation
{
  constructor(size, randomise)
  {
    this.size = size;
    this.init(!!randomise);
  }

  init(randomise)
  {
    this.data = Array.from(new Array(this.size), () => 0);
    this.data[Math.round(this.size/2)] = 1;

    if (randomise) // wow
      for (let t=0; t<this.data.length; t++)
        this.data[t] = Math.round(Math.random());
  }


  mutate(rule)
  {
    let n = new Generation(this.size);

    for (let t=0; t<this.data.length; t++)
    {
      let prev = t-1 < 0 ? this.data.length-1 : t-1;
      let next = t+1 > this.data.length-1 ? 0 : t+1;

      let l = this.data[prev];
      let c = this.data[t];
      let r = this.data[next];

      let pattern = ((l&1) << 2) | ((c&1) << 1) | (r&1);
      let nextgen = rule.apply(pattern);

      n.data[t] = nextgen;
    }

    n.data[0] = this.data[0];
    n.data[n.data.length-1] = this.data[this.data.length-1];

    return n;

  }


}
