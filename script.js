// Define constants for grid dimensions and properties
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CELL_SIZE = 20;
const GRID_WIDTH = CANVAS_WIDTH / CELL_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / CELL_SIZE;

// DOM elements
const canvas = document.getElementById('simple-canvas');
const ctx = canvas.getContext('2d');
const startPointButton = document.getElementById('start-point');
const wallsButton = document.getElementById('walls');
const endPointButton = document.getElementById('end-point');
const resetButton = document.getElementById('reset');
const aStarSelect = document.getElementById('a-star-algorithms');
const findPathButton = document.getElementById('find-path');

// Initialize starting and ending points
let startPoint;
let endPoint;

// Function for rendering the grid
function renderGrid() {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      ctx.fillStyle = 'white';
      ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);

      if (grid[i][j].isWall) {
        ctx.fillStyle = 'black';
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      if (grid[i][j].isStart) {
        ctx.fillStyle = 'green';
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      if (grid[i][j].isEnd) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      ctx.strokeStyle = 'black';
      ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

// Initialize the grid
const grid = Array.from({ length: GRID_HEIGHT }, () =>
  Array.from({ length: GRID_WIDTH }, () => ({
    isWall: false,
    isStart: false,
    isEnd: false,
    isVisited: false,
    distance: Infinity,
    heuristic: Infinity,
    previous: null,
  }))
);

// Rendering the starting grid
renderGrid();

// Add event listeners to buttons
startPointButton.addEventListener('click', () => {
  startPoint = [1, 1];
  renderGrid();
  console.log("Start point:", startPoint);
});

wallsButton.addEventListener('click', () => {
  const walls = [[1, 1], [1, 2], [1, 3]];
  createWalls(grid, walls);
  renderGrid();
  console.log(grid);
});

endPointButton.addEventListener('click', () => {
  endPoint = [2, 3];
  renderGrid();
  console.log("End point:", endPoint);
});

resetButton.addEventListener('click', () => {
  resetGrid(grid);
  renderGrid();
  console.log(grid);
});

// Set up A* algorithm

// Utility function for manhattan distance
function manhattan(node, end) {
  return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

// Function to find a node in the grid
function findNode(grid, x, y) {
  return grid[x] && grid[x][y];
}

// Function to update the grid
function updateGrid(grid, node) {
  // Add your implementation here
}

function aStarAlgorithm(grid, start, end) {
  // Code for the A* algorithm
  console.log("Start point:", start);
  console.log("End point:", end);
  // Rest of the algorithm implementation
}

function createWalls(grid, wallCoordinates) {
  for (const [x, y] of wallCoordinates) {
    grid[x][y].isWall = true; // Set the value of the cell to indicate a wall
  }
}

function resetGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].isWall = false; // Set the value of each cell to indicate an open space
    }
  }
}

// Example usage of A* algorithm
const exampleGrid = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1]
];

const exampleStartPoint = [1, 1];
const exampleEndPoint = [2, 3];
aStarAlgorithm(exampleGrid, exampleStartPoint, exampleEndPoint);
