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
for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
    ctx.fillStyle = 'white';
    ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

// Add event listeners to buttons
startPointButton.addEventListener('click', () => {
  function setStartAndEndPoint(start, end) {
  // Code to handle the start and end points
  console.log("Start point:", start);
  console.log("End point:", end);
}
});

wallsButton.addEventListener('click', () => {
  // Toggle wall
});

endPointButton.addEventListener('click', () => {
  // Set end point
});

resetButton.addEventListener('click', () => {
  // Reset all values
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
}
