
//
// Alan MacLeod 04-May-2017
//
// Grid.js
// Cheap *dynamic* spatial index (2D)
// Splits an area into a simple grid, each cell keeps track of a list of objects
// Generally performs better on modern hardware compared to reconstructing a quadtree etc
// add() or move() objects. Performce nearest neighbour search with query()
// Worst case performance O(n) if all objects bunched into one cell (T_T)

export default class SpatialGrid
{
  constructor(minx, miny, maxx, maxy, cells)
  {
    this.grid = this.array2d(cells, cells);

    this.width = (maxx - minx);
    this.height = (maxy - miny);
    this.numcells = cells;
    this.xcellsize = this.width  / cells;
    this.ycellsize = this.height / cells;

    this.maxRadius = (Math.sqrt(this.width * this.width + this.height * this.height));

    this.foundObjects = [];
  }

  // Expects: `item` contains `x` and `y` properties
  add(item)
  {
    // Which cell
    let cellx = this.wrap((item.x - this.mod(item.x, this.xcellsize)) / this.xcellsize);
    let celly = this.wrap((item.y - this.mod(item.y, this.ycellsize)) / this.ycellsize);

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

    // Remove us from the last cell
    let cell = this.grid[cellfy][cellfx];
    cell.splice(cell.indexOf(item), 1);

    // Add us to the new cell
    cell = this.grid[this.wrap(cellty)][this.wrap(celltx)];
    cell.push(item);
  }

  mod(a,  b)
  {
      let r = a % b;
      return r < 0 ? r + b : r;
  }

  query(x, y, r)
  {
    if (r > this.maxRadius) r = this.maxRadius;

    // Squared distance
    let rsq = r * r;

    // Which cell are we in?
    // let cellcentrex = (x - (this.mod(x, this.xcellsize))) / this.xcellsize;
    // let cellcentrey = (y - (this.mod(y, this.ycellsize))) / this.ycellsize;

    // Use diagonal extent to find the cell range to search
    let cellminx = ((x - r) - (this.mod((x - r), this.xcellsize))) / this.xcellsize;
    let cellminy = ((y - r) - (this.mod((y - r), this.ycellsize))) / this.ycellsize;
    let cellmaxx = ((x + r) - (this.mod((x + r), this.xcellsize))) / this.xcellsize;
    let cellmaxy = ((y + r) - (this.mod((y + r), this.ycellsize))) / this.ycellsize;

  //  console.log(`Checking numcells ${cellmaxx - cellminx}, ${cellmaxy - cellminy}`);

    if (cellminx < 0) cellminx = 0;
    if (cellmaxx >= this.xcellsize) cellmaxx = this.xcellsize-1;

    if (cellminy < 0) cellminy = 0;
    if (cellmaxy >= this.ycellsize) cellmaxy = this.ycellsize - 1;

    this.foundObjects = [];
    //
    // if ((cellmaxy - cellminy) >= this.numcells) cellmaxy = cellminy + this.numcells - 1;
    // if ((cellmaxx - cellminx) >= this.numcells) cellmaxx = cellminx + this.numcells - 1;

    for (let cy=cellminy; cy<=cellmaxy; cy++)
    {
      for (let cx=cellminx; cx<=cellmaxx; cx++)
      {
        // let wx = this.wrap(cx), wy = this.wrap(cy);

        // if (once[wy][wx]) continue;
        // once[wy][wx] = 1;

        let cell = this.grid[cy][cx]
        if (!cell) continue;

        for (let t=0; t<cell.length; t++)
        {
            let item = cell[t];
            let d = this.distsq(item.x, item.y, x, y);
            if (d <= rsq) this.foundObjects.push(item);
        }
      }
    }

    return this.foundObjects;
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
            let d = this.distsq(item.x, item.y, x, y);
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

  array2d(w, h, init=null)
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
