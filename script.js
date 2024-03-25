class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.neighbors = [];
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}

function manhattanHeuristic(node1, node2) {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}

function heuristic(node1, node2) {
  return manhattanHeuristic(node1, node2);
}

function aStar(grid, startNode, endNode) {
  const openSet = [startNode];
  const closedSet = [];

  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.g + startNode.h;

  while (openSet.length > 0) {
    let currentNode = openSet.reduce((a, b) => a.f < b.f ? a : b);

    if (currentNode === endNode) {
      return buildPath(endNode);
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.push(currentNode);

    for (const neighbor of currentNode.neighbors) {
      if (closedSet.includes(neighbor)) continue;

      const tentativeG = currentNode.g + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeG >= neighbor.g) {
        continue;
      }

      neighbor.g = tentativeG;
      neighbor.h = heuristic(neighbor, endNode);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.parent = currentNode;
    }
  }

  return [];
}

function buildPath(node) {
  const path = [node];

  while (node.parent) {
    path.unshift(node.parent);
    node = node.parent;
  }

  return path;
}

function createGrid(width, height, wallDensity) {
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];

    for (let x = 0; x < width; x++) {
      const node = new Node(x, y);

      if (Math.random() < wallDensity) {
        node.isWall = true;
      }

      row.push(node);
    }

    grid.push(row);
  }

  return grid;
}