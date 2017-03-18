

export default class Rule
{
  constructor(seed)
  {
    this.seed = seed & 0xff;

  }

  apply(n)
  {
    // n is a number from 0 - 7 and indicates the Bit of our rule to apply
    //console.log(`Shifting value ${this.seed} >> ${n} times`);
    return ((this.seed >> n) & 1);
  }
}
