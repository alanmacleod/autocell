

// Simple bird geometry composed of two triangles

let BirdSimple = {
  vertices: [
    [-3.5, 0, 0],
    [0, 0, 1],
    [3.5, 0, 0],
    [0, 0, -1]
  ],
  faces: [
    //Left wing
    [0, 1, 3],
    //Right wing
    [1, 2, 3]
  ]
};

export {BirdSimple};
