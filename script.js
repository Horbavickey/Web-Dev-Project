 const CANVAS_WIDTH = 800;
        const CANVAS_HEIGHT = 600;
        const CELL_SIZE = 20;
        const GRID_WIDTH = CANVAS_WIDTH / CELL_SIZE;
        const GRID_HEIGHT = CANVAS_HEIGHT / CELL_SIZE;

        const canvas = document.getElementById('simple-canvas');
        const ctx = canvas.getContext('2d');
        const startPointButton = document.getElementById('start-point');
        const wallsButton = document.getElementById('walls');
        const endPointButton = document.getElementById('end-point');
        const resetButton = document.getElementById('reset');
        const findPathButton = document.getElementById('find-path');

        let startPoint;
        let endPoint;

        const grid = Array.from({ length: GRID_HEIGHT }, (_, i) =>
            Array.from({ length: GRID_WIDTH }, (_, j) => ({
                x: j,
                y: i,
                isWall: false,
                isStart: false,
                isEnd: false,
                isVisited: false,
                distance: Infinity,
                heuristic: Infinity,
                previous: null,
            }))
        );

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

        function manhattan(node, end) {
            return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        }

        function findNode(grid, x, y) {
            return grid[x] && grid[x][y];
        }

        function updateGrid(grid, node) {
            // Implement grid update logic here
        }

        function aStarAlgorithm(grid, start, end) {
            //  A* algorithm here
          function aStarAlgorithm(grid, start, end) {
    // The set of nodes already evaluated
    const closedSet = new Set();
    // The set of currently discovered nodes that are not evaluated yet
    const openSet = new Set([start]);
    // For each node, which node it can most efficiently be reached from
    const cameFrom = new Map();
    // For each node, the cost of getting from the start node to that node
    const gScore = new Map([[start, 0]]);
    // The cost of going from start to start is zero
    const fScore = new Map([[start, manhattan(start, end)]]);

    while (openSet.size > 0) {
        // The node in this set that has the lowest fScore[] value
        let current = Array.from(openSet).reduce((a, b) => fScore.get(a) < fScore.get(b) ? a : b);

        // If the destination node is reached, reconstruct the path
        if (current === end) {
            reconstructPath(cameFrom, current);
            return;
        }

        openSet.delete(current);
        closedSet.add(current);

        // For each neighbor of the current node
        for (let neighbor of getNeighbors(grid, current)) {
            if (closedSet.has(neighbor)) continue;

            // The distance from start to a neighbor
            const tentativeGScore = gScore.get(current) + 1; // Assuming each step costs 1
            if (!openSet.has(neighbor)) openSet.add(neighbor);
            else if (tentativeGScore >= gScore.get(neighbor)) continue;

            // This path is the best until now, record it
            cameFrom.set(neighbor, current);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(neighbor, tentativeGScore + manhattan(neighbor, end));
        }
    }

    // If the end node is not reached, there's no path
    console.log("No path found.");
}

function getNeighbors(grid, node) {
    // Returns the neighbors of a node (up, down, left, right)
    const neighbors = [];
    const { x, y } = node;
    if (x > 0) neighbors.push(grid[y][x - 1]); // Left
    if (x < GRID_WIDTH - 1) neighbors.push(grid[y][x + 1]); // Right
    if (y > 0) neighbors.push(grid[y - 1][x]); // Up
    if (y < GRID_HEIGHT - 1) neighbors.push(grid[y + 1][x]); // Down
    return neighbors;
}

function reconstructPath(cameFrom, current) {
    // Reconstructs the path from the start node to the end node
    const totalPath = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        totalPath.unshift(current);
    }
    console.log("Path found:", totalPath);
    // Here you can also visualize the path on the grid
}

        }

        function createWalls(grid, wallCoordinates) {
            for (const [x, y] of wallCoordinates) {
                grid[x][y].isWall = true;
            }
        }

        function resetGrid(grid) {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    grid[i][j].isWall = false;
                    grid[i][j].isStart = false;
                    grid[i][j].isEnd = false;
                    grid[i][j].isVisited = false;
                    grid[i][j].distance = Infinity;
                    grid[i][j].heuristic = Infinity;
                    grid[i][j].previous = null;
                }
            }
        }

        startPointButton.addEventListener('click', () => {
            startPoint = [Math.floor(Math.random() * GRID_HEIGHT), Math.floor(Math.random() * GRID_WIDTH)];
            grid[startPoint[0]][startPoint[1]].isStart = true;
            renderGrid();
        });

        wallsButton.addEventListener('click', () => {
            const walls = [[Math.floor(Math.random() * GRID_HEIGHT), Math.floor(Math.random() * GRID_WIDTH)], [Math.floor(Math.random() * GRID_HEIGHT), Math.floor(Math.random() * GRID_WIDTH)], [Math.floor(Math.random() * GRID_HEIGHT), Math.floor(Math.random() * GRID_WIDTH)]];
            createWalls(grid, walls);
            renderGrid();
        });

        endPointButton.addEventListener('click', () => {
            endPoint = [Math.floor(Math.random() * GRID_HEIGHT), Math.floor(Math.random() * GRID_WIDTH)];
            grid[endPoint[0]][endPoint[1]].isEnd = true;
            renderGrid();
        });

        resetButton.addEventListener('click', () => {
            resetGrid(grid);
            renderGrid();
        });

        findPathButton.addEventListener('click', () => {
            if (startPoint && endPoint) {
                aStarAlgorithm(grid, grid[startPoint[0]][startPoint[1]], grid[endPoint[0]][endPoint[1]]);
            }
        });

        renderGrid();
