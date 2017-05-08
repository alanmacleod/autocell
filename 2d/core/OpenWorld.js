
//import Renderer     from './Renderer2d';

import Vector2      from '../math/Vector2';
import SpatialGrid  from '../core/SpatialGrid'

let PIXI = require('pixi.js');    // ffs update your module defs, PIXI

const NEIGHBOUR_RADIUS = 75;

export default class OpenWorld
{
  constructor(options)
  {
    this.size = options.size; // World size
    this.data = null;
    this.scale = options.scale || 1;
    this.grid = new SpatialGrid(0, 0, this.size, this.size, 10);

    this.element = document.getElementById(options.render);

    this.renderer = PIXI.autoDetectRenderer(this.size * this.scale, this.size * this.scale);
    this.stage = new PIXI.Container();
    this.element.appendChild(this.renderer.view);
    this.mouse = new Vector2(0,0);

    this.element.onmousemove = (e) => { this.mouse.set(e.clientX, e.clientY); }

    this.init(options.type, options.spread);
  }

  // Create and save a list of entities
  init(CellType, spread)
  {
    this.data = [];
    this.graphics = [];

    let done = 0, max = 100;

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
      {
        if (Math.random() < spread)
        {
          let c = new CellType(new Vector2(x, y), new Vector2(this.size, this.size))

          this.data.push(c);

          // Add to spatial index, optionally telling it where the xy data is
          this.grid.add(c, 'position')

          var r = new PIXI.Graphics();

          r.beginFill(c.shader());
          r.drawRect(0,0,this.scale, this.scale);
          r.endFill();
          r.x = c.position.x * this.scale;
          r.y = c.position.y * this.scale;
          this.graphics.push(r);
          this.stage.addChild(r);

          done++;
        }
        if (done == max) break;
      }
      if (done == max) break;
    }

  }

  render()
  {
    // for (let l=this.data.length, i=0; i<l; i++)
    // {
    //   let e = this.data[i];
    //   let c = e.shader();
    //
    // }
    this.renderer.render(this.stage);
  }



  wrap(v)
  {
    if ( v < 0 ) return v + this.size;
    if ( v > this.size-1) return v - this.size;
    return v;
  }

  array2d(size)
  {
    for (var d=[]; d.length < size; d.push([]));
    return d;
  }

  evolve()
  {
    this.prepare();

    let statistics = {
      centroid: this.centroid(),
      number: this.data.length,
      mouse: this.mouse.div(this.scale),
      all: this.data
    }

    for (let t=0,l=this.data.length; t<l;t++)
    {
      statistics.neighbours = this.neighbourhood(t, NEIGHBOUR_RADIUS);

      let x = this.data[t].position.x;
      let y = this.data[t].position.y;

      this.data[t].mutate(statistics);

      // if (isNaN(this.data[t].position.x) || isNaN(this.data[t].positiony.y))
      // {
      //   console.log(this.data[t]);
      // }

      // Update spatial index
      this.grid.move(this.data[t], x, y,
                     this.data[t].position.x,
                     this.data[t].position.y
                   );

      if (this.data[t].dirty)
      {
        this.graphics[t].x = Math.round(this.data[t].position.x * this.scale);
        this.graphics[t].y = Math.round(this.data[t].position.y * this.scale);
      }
    }

  }

  // index = lookup for this.data[] (to skip self-test), r = radius in world units
  neighbourhood(index, r)
  {
    let item = this.data[index].position;
    return this.grid.query(item.x, item.y, r);
  }

  neighbourhoodBruteForce(index, r)
  {
    let rs = r * r;
    let n = [];
    let test = this.data[index].position;

    for (let t=0, l=this.data.length; t<l; t++)
    {
      if ( t == index ) continue;
      let d = this.data[t].position.distsq(test);
      if ( d <= rs ) n.push(this.data[t]);
    }

    return n;
  }

  centroid()
  {
    let sx = 0, sy = 0;
    for (let t=0,l=this.data.length; t<l; t++)
    {
      sx += this.data[t].position.x;
      sy += this.data[t].position.y;
    }

    return new Vector2(sx / this.data.length, sy / this.data.length);
  }


  prepare()
  {
    for (let t=0,l=this.data.length; t<l; t++)
      this.data[t].prepare();
    // let n = 0;
    // for (let y=0; y<this.size; y++)
    //   for (let x=0; x<this.size; x++)
    //     if (this.data[y][x]) this.data[y][x].prepare();
  }

}
