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

// Initialize starting and ending points
let startPoint;
let endPoint;

// Add event listeners to buttons
startPointButton.addEventListener('click', () => {
  // Set start point and toggle wall
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
function heuristic(node, end) {
  if (aStarSelect.value === 'euclidean') {
    return Math.sqrt(Math.pow(node.x - end.x, 2) + Math.pow(node.y - end.y, 2));
  }
  return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

function getLowestF(nodes) {
  return nodes.reduce((lowest, current) => (current.f < lowest.f ? current : lowest));
}

function reconstructPath(current) {
  const path = [current];
  while (current.previous) {
    current = current.previous;
    path.unshift(current);
  }
  return path;
}

function findPath() {
  const openSet = [startPoint];
  const closedSet = [];
  while (openSet.length) {
    const current = getLowestF(openSet);
    if (current.x === endPoint.x && current.y === endPoint.y) {
      const path = reconstructPath(current);
      // Display path on the canvas
      return path;
    }
  }
    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);
    const neighbors = [
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
    ];
    for (const neighbor of neighbors) {
      if (
        !grid[neighbor.y] ||
        grid[neighbor.y][neighbor.x].isWall ||
        closedSet.some((el) => el.x === neighbor.x && el.y === neighbor.y)
      )
        continue;

      const tempdistance = current.distance + 1;
      if (tempdistance < grid[neighbor.y][neighbor.x].distance) {
        grid[neighbor.y][neighbor.x].distance = tempdistance;
        grid[neighbor.y][neighbor.x].heuristic = heuristic(grid[neighbor.y][neighbor.x])}
        
      }
      }