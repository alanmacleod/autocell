
import log from  'loglevel';
//
// Alan MacLeod 04-May-2017
//
// Grid.js
// Cheap *dynamic* spatial index (2D)
// Splits an area into a simple grid, each cell keeps track of a list of objects
// Generally performs better on modern hardware compared to reconstructing a quadtree etc
// add() or move() objects. Performs k nearest neighbour search with query()
// Worst case performance O(n) if all objects bunched into one cell (T_T)

export default class SpatialGrid
{
  constructor(minx, miny, maxx, maxy, cells, boundsChecking=false, prop=null)
  {
    this.grid = this.array2d(cells);

    this.width = (maxx - minx);
    this.height = (maxy - miny);
    this.numcells = cells;
    this.xcellsize = this.width  / cells;
    this.ycellsize = this.height / cells;
    this.prop = prop;

    this.bounds = {
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy
    };

    this.maxRadius = (Math.sqrt(this.width * this.width + this.height * this.height));

    this.boundsChecking = boundsChecking;

    this.foundObjects = [];
  }

  // Expects: `item` contains `x` and `y` properties
  add(item)
  {
    let pos = item;

    if (this.prop)
      pos = item[this.prop];

    if (!pos.x || !pos.y)
      throw Error("`item` type needs properties `x` and `y`");

    // Which cell
    let cellx = this.wrap((pos.x - this.mod(pos.x, this.xcellsize)) / this.xcellsize);
    let celly = this.wrap((pos.y - this.mod(pos.y, this.ycellsize)) / this.ycellsize);

    let cell = this.grid[celly][cellx] || [];

    if (!cell.includes(item))
      cell.push(item);

    this.grid[celly][cellx] = cell;
  }

  // FROM(fx,fy) -> TO(tx,ty)
  move(item, fx, fy, tx, ty)
  {
    let cellfx = (fx - (this.mod(fx, this.xcellsize))) / this.xcellsize;
    let cellfy = (fy - (this.mod(fy, this.ycellsize))) / this.ycellsize;
    let celltx = (tx - (this.mod(tx, this.xcellsize))) / this.xcellsize;
    let cellty = (ty - (this.mod(ty, this.ycellsize))) / this.ycellsize;

    // We haven't left the cell, carry on
    if ((cellfx == celltx) && (cellfy == cellty)) return;

    if (this.boundsChecking)
    {
      this.checkBounds(fx, fy);
      this.checkBounds(tx, ty);
    }

    // 12:51pm - Cell is null? Wtf why?

    // Remove us from the last cell
    let cell;
    cell = this.grid[cellfy][cellfx];

    // try {
    //   cell = this.grid[cellfy][cellfx];
    // } catch (error) {
    //   throw Error(`Invalid cell at ${cellfy}, ${cellfx} ${fx} ${fy} ${tx} ${ty}`);
    // }
    // if (!cell)
    // {
    //   throw Error(`Invalid cell at ${cellfy}, ${cellfx}`);
    // }
    cell.splice(cell.indexOf(item), 1);

    // Add us to the new cell
    cell = this.grid[this.wrap(cellty)][this.wrap(celltx)];
    cell.push(item);
  }

  checkBounds(x, y)
  {
    if (isNaN(x) || isNaN(y))
      throw Error(`Invalid coordinate pair ${x},${y}`);

    if (x < this.bounds.minx || x > this.bounds.maxx)
      throw Error(`${x} out of bounds [${this.bounds.minx}, ${this.bounds.maxx}]`);

    if (y < this.bounds.miny || y > this.bounds.maxy)
      throw Error(`${y} out of bounds [${this.bounds.miny},${this.bounds.maxy}]`);
  }

  mod(a,  b)
  {
    let r = a % b;
    return r < 0 ? r + b : r;
  }

  // (x, y) = Centre
  // r = Radius
  query(item, r)
  {
    if (r > this.maxRadius) r = this.maxRadius;

    let pos = item;
    if (this.prop)
      pos = item[this.prop];

    // Squared distance
    let rsq = r * r;

    // Use diagonal extent to find the cell range to search
    let cellminx = ((pos.x - r) - (this.mod((pos.x - r), this.xcellsize))) / this.xcellsize;
    let cellminy = ((pos.y - r) - (this.mod((pos.y - r), this.ycellsize))) / this.ycellsize;
    let cellmaxx = ((pos.x + r) - (this.mod((pos.x + r), this.xcellsize))) / this.xcellsize;
    let cellmaxy = ((pos.y + r) - (this.mod((pos.y + r), this.ycellsize))) / this.ycellsize;

  //  console.log(`Checking numcells ${cellmaxx - cellminx}, ${cellmaxy - cellminy}`);

    if (cellminx < 0) cellminx = 0;
    if (cellmaxx >= this.numcells) cellmaxx = this.numcells-1;

    if (cellminy < 0) cellminy = 0;
    if (cellmaxy >= this.numcells) cellmaxy = this.numcells - 1;

    let objs = [];

    for (let cy=cellminy; cy<=cellmaxy; cy++)
    {
      for (let cx=cellminx; cx<=cellmaxx; cx++)
      {
        let cell = this.grid[cy][cx];

        if (!cell) continue;

        for (let t=0; t<cell.length; t++)
        {
            let neighbour = cell[t];

            if (neighbour == item)
              continue;

            // Handle xy position stored in a child property of item
            let npos = neighbour;
            if (this.prop) npos = neighbour[this.prop];

            let d = this.distsq(npos.x, npos.y, pos.x, pos.y);

            if (d <= rsq)
              objs.push(neighbour);
        }
      }
    }

    return objs;
  }


  // returns all objects in radius r from point x,y
  querywrap(x, y, r)
  {
    if (r > this.maxRadius) r = this.maxRadius;

    // Squared distance
    let rsq = r * r;

    // Which cell are we in?
    let cellcentrex = (x - (this.mod(x, this.xcellsize))) / this.xcellsize;
    let cellcentrey = (y - (this.mod(y, this.ycellsize))) / this.ycellsize;

    // Use diagonal extent to find the cell range to search
    let cellminx = ((x - r) - (this.mod((x - r), this.xcellsize))) / this.xcellsize;
    let cellminy = ((y - r) - (this.mod((y - r), this.ycellsize))) / this.ycellsize;
    let cellmaxx = ((x + r) - (this.mod((x + r), this.xcellsize))) / this.xcellsize;
    let cellmaxy = ((y + r) - (this.mod((y + r), this.ycellsize))) / this.ycellsize;

  //  console.log(`Checking numcells ${cellmaxx - cellminx}, ${cellmaxy - cellminy}`);

    let objs = [];

    if ((cellmaxy - cellminy) >= this.numcells) cellmaxy = cellminy + this.numcells - 1;
    if ((cellmaxx - cellminx) >= this.numcells) cellmaxx = cellminx + this.numcells - 1;

    for (let cy=cellminy; cy<=cellmaxy; cy++)
    {
      for (let cx=cellminx; cx<=cellmaxx; cx++)
      {
        let wx = this.wrap(cx), wy = this.wrap(cy);

        // if (once[wy][wx]) continue;
        // once[wy][wx] = 1;

        let cell = this.grid[wy][wx]
        if (!cell) continue;

        for (let t=0; t<cell.length; t++)
        {
            let item = cell[t];
            let pos = item;
            if (this.prop) pos = item[this.prop]
            let d = this.distsq(pos.x, pos.y, x, y);
            if (d <= rsq) objs.push(item);
        }
      }
    }

    return objs;
  }

  distsq(x1, y1, x2, y2)
  {
    let xd = x2 - x1, yd = y2 - y1;
    return ((xd * xd) + (yd * yd));
  }

  wrap(a)
  {
    return this.mod(a, this.numcells);
    // // This needs to be more sophisticated to wrap multiple numcells widths!
    // if (a < 0) return a + this.numcells;
    // if (a >= this.numcells) return a - this.numcells;
    // return a;
  }

  array2d(size)
  {
    //for (var d=[]; d.length < size; d.push([]));
    //return d;
    let g = [];
    for (let y=0; y<size; y++)
    {
      g.push([]);
      for (let x=0; x<size; x++)
      {
        g[y][x] = [];
      }
    }
    return g;
  }


  __array2d(w, h, init=null)
  {
    let v = [];
    for (let y=0; y<h; y++)
    {
      let h = [];
      for (let x=0; x<w; x++)
        h[x] = init;
      v.push(h);
    }

    return v;
  }

}
