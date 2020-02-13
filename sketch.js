var cols, rows;
var w = 20;
var grid = [];
var current;
var stack = [];

function setup() {
  createCanvas(600,600);
  cols = floor(width/w);
  rows = floor(width/w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  current.highlight();

  //STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    //STEP 2
    stack.push(current);
    current.isInStack = true;

    //STEP 3
    removeWalls(current, next);

    //STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
    current.isInStack = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

  function removeWalls(a, b) {
    var x = a.i - b.i;
    var y = a.j - b.j;
    if (x == 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    }
    if (x == -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    if (y == 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    }
    if (y == -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
}
