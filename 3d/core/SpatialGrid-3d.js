
import log from  'loglevel';
//
// Alan MacLeod 13-May-2017
//
// Grid.js
// Cheap *dynamic* spatial index (3D)
// Splits an area into a simple grid, each cell keeps track of a list of objects
// Generally performs better on modern hardware compared to reconstructing a quadtree etc
// add() or move() objects. Performs k nearest neighbour search with query()
// Worst case performance O(n) if all objects bunched into one cell (T_T)

// 3D note:
//      For simplicity's sake, the grid only accepts Natural numbers (positive
//      integers) for item positional data. Obviously in 3d it's desirable to
//      have the items centered around the origin, so will simply do this inside
//      the 3d renderer by subtracting half the axes' extent from the position

export default class SpatialGrid3d
{
  constructor(bounds, cells, boundsChecking=false, prop=null)
  {
    this.grid = this.array3d(cells);

    this.bounds = this.verifybounds(bounds);

    this.width = (this.bounds.maxx - this.bounds.minx) + 1;
    this.height = (this.bounds.maxy - this.bounds.miny) + 1;
    this.depth = (this.bounds.maxz - this.bounds.minz) + 1;

    this.numcells = cells;
    this.xcellsize = this.width  / cells;
    this.ycellsize = this.height / cells;
    this.zcellsize = this.depth / cells;

    this.prop = prop;

    this.maxRadius = (Math.sqrt(this.width * this.width + this.height * this.height + this.depth * this.depth));

    this.boundsChecking = boundsChecking;

    this.foundObjects = [];

    //console.log(`[Init SpatialGrid()] Bounds: (${this.bounds.minx}, ${this.bounds.miny}, ${this.bounds.minz}) -> (${this.bounds.maxx}, ${this.bounds.maxy}, ${this.bounds.maxz})`);
  }

  verifybounds(b)
  {
    if (isNaN(b.minx) || isNaN(b.maxx) || isNaN(b.miny) ||
        isNaN(b.maxy) || isNaN(b.minz) || isNaN(b.maxz))
      throw Error("Invalid bounds, need minx -> maxz");

    return b;
  }

  // Expects: `item` contains `x` and `y` properties
  add(item)
  {
    let pos = item;

    if (this.prop)
      pos = item[this.prop];

    if (!pos.x || !pos.y || !pos.z)
      throw Error("`item` type needs properties `x`, `y` and `z`");

    // Which cell
    let cellx = this.wrap((pos.x - this.mod(pos.x, this.xcellsize)) / this.xcellsize);
    let celly = this.wrap((pos.y - this.mod(pos.y, this.ycellsize)) / this.ycellsize);
    let cellz = this.wrap((pos.z - this.mod(pos.z, this.zcellsize)) / this.zcellsize);

    let cell = this.grid[cellz][celly][cellx] || [];

    if (!cell.includes(item))
      cell.push(item);

    this.grid[cellz][celly][cellx] = cell;

  }

  // FROM(fx,fy) -> TO(tx,ty)
  move(item, fx, fy, fz, tx, ty, tz)
  {
    let cellfx = (fx - (this.mod(fx, this.xcellsize))) / this.xcellsize;
    let cellfy = (fy - (this.mod(fy, this.ycellsize))) / this.ycellsize;
    let cellfz = (fz - (this.mod(fz, this.zcellsize))) / this.zcellsize;

    let celltx = (tx - (this.mod(tx, this.xcellsize))) / this.xcellsize;
    let cellty = (ty - (this.mod(ty, this.ycellsize))) / this.ycellsize;
    let celltz = (tz - (this.mod(tz, this.zcellsize))) / this.zcellsize;

    // We haven't left the cell, carry on
    if ((cellfx == celltx) && (cellfy == cellty) && (cellfz == celltz)) return;

    if (this.boundsChecking)
    {
      this.checkBounds(fx, fy, fz);
      this.checkBounds(tx, ty, tz);
    }

    // Remove us from the last cell
    let cell;
    cell = this.grid[cellfz][cellfy][cellfx];

    cell.splice(cell.indexOf(item), 1);

    // Add us to the new cell
    cell = this.grid[this.wrap(celltz)][this.wrap(cellty)][this.wrap(celltx)];
    cell.push(item);
  }

  checkBounds(x, y, z)
  {
    if (x < this.bounds.minx || x > this.bounds.maxx)
      throw Error(`${x} out of bounds [${this.bounds.minx}, ${this.bounds.maxx}]`);

    if (y < this.bounds.miny || y > this.bounds.maxy)
      throw Error(`${y} out of bounds [${this.bounds.miny},${this.bounds.maxy}]`);

    if (z < this.bounds.minz || z > this.bounds.maxz)
      throw Error(`${y} out of bounds [${this.bounds.minz},${this.bounds.maxz}]`);
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
    let cellminz = ((pos.z - r) - (this.mod((pos.z - r), this.zcellsize))) / this.zcellsize;

    let cellmaxx = ((pos.x + r) - (this.mod((pos.x + r), this.xcellsize))) / this.xcellsize;
    let cellmaxy = ((pos.y + r) - (this.mod((pos.y + r), this.ycellsize))) / this.ycellsize;
    let cellmaxz = ((pos.z + r) - (this.mod((pos.z + r), this.zcellsize))) / this.zcellsize;

    if (cellminx < 0) cellminx = 0;
    if (cellmaxx >= this.numcells) cellmaxx = this.numcells-1;

    if (cellminy < 0) cellminy = 0;
    if (cellmaxy >= this.numcells) cellmaxy = this.numcells - 1;

    if (cellminz < 0) cellminz = 0;
    if (cellmaxz >= this.numcells) cellmaxz = this.numcells - 1;

    let objs = [];

    for (let cz=cellminz; cz<=cellmaxz; cz++)
    {
      for (let cy=cellminy; cy<=cellmaxy; cy++)
      {
        for (let cx=cellminx; cx<=cellmaxx; cx++)
        {
          let cell = this.grid[cz][cy][cx];

          if (!cell) continue;

          for (let t=0; t<cell.length; t++)
          {
              let neighbour = cell[t];

              if (neighbour == item)
                continue;

              // Handle xy position stored in a child property of item
              let npos = neighbour;
              if (this.prop) npos = neighbour[this.prop];

              let d = this.distsq(npos.x, npos.y, npos.z, pos.x, pos.y, pos.z);

              if (d <= rsq)
                objs.push(neighbour);
          }
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

  distsq(x1, y1, z1, x2, y2, z2)
  {
    let xd = x2 - x1, yd = y2 - y1, zd = z2 - z1;
    return ((xd * xd) + (yd * yd) + (zd * zd));
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

  array3d(size)
  {
    let g = []
    for (let z=0; z<size; z++)
    {
      g[z] = [];
      for (let y=0; y<size; y++)
      {
        g[z][y] = [];
        for (let x=0; x<size; x++)
        {
          g[z][y][x] = [];
        }
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
