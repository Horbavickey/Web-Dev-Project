// Queue function
class Queue {
    constructor() {
        this.queue = [];
    }

    getLength() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    enqueue(item) {
        this.queue.push(item);
        this.queue.sort((a, b) => a.f - b.f);
    }

    dequeue() {
        return this.queue.shift();
    }
}

// Triple class for storing f, x, y values
class Triple {
    constructor(f, x, y) {
        this.f = f;
        this.x = x;
        this.y = y;
    }
}

// CellDetails class for storing cell details
class CellDetails {
    constructor() {
        this.f = 0; // f = g + h
        this.g = 0; // Cost from source
        this.h = 0; // Heuristic (manhattan distance)
        this.parent_i = 0; // x coords of parent cell
        this.parent_j = 0; // y coords of parent cell
    }
}

// Checks if cell is not out of bounds
function isValid(x, y, n) {
    return x >= 0 && x < n && y >= 0 && y < n;
}

// Checks if cell is destination cell
function isDestination(x, y, dest) {
    return x === dest.x && y === dest.y;
}

// Returns heuristic distance
function calculateHValue(x, y, dest, n) {
    let Hvalue;
    if (document.getElementById("manhattan").checked) {
        Hvalue = Math.abs(x - dest.x) + Math.abs(y - dest.y);
    } else {
        Hvalue = Math.sqrt(Math.pow(x - dest.x, 2) + Math.pow(y - dest.y, 2));
    }
    return Hvalue;
}

// A* function
function aStar(grid, src, dest, n) {
    const isVisited = Array.from({ length: n }, () => Array(n).fill(false));
    const cellDetails = Array.from({ length: n }, () => Array.from({ length: n }, () => new CellDetails()));

    let i = src.x;
    let j = src.y;
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;

    const openList = new Queue();
    const triplet = new Triple(0.0, i, j);
    openList.enqueue(triplet);

    let foundDest = false;

    while (!openList.isEmpty()) {
        const p = openList.dequeue();
        i = p.x;
        j = p.y;
        isVisited[i][j] = true;

        if (i !== src.x || j !== src.y) {
            drawAnimation(i, j, "#98FB98");
        }

        console.log(`Visiting: i = ${i}, j = ${j}, f = ${p.f}, g = ${cellDetails[i][j].g}, h = ${cellDetails[i][j].h}`);

        // Generate all neighbors of cell[i][j]
        const directions = [
            {dx: -1, dy: 0}, // Left
            {dx: 1, dy: 0}, // Right
            {dx: 0, dy: -1}, // Up
            {dx: 0, dy: 1}, // Down
            // Add diagonal directions if allowed
        ];

        directions.forEach(({dx, dy}) => {
            const newX = i + dx;
            const newY = j + dy;

            if (isValid(newX, newY, n) && !isVisited[newX][newY] && grid[newX][newY] !== 1) {
                const gNew = cellDetails[i][j].g + 1; // Adjust the cost as needed
                const hNew = calculateHValue(newX, newY, dest, n);
                const fNew = hNew + gNew;

                if (cellDetails[newX][newY].f === undefined || cellDetails[newX][newY].f > fNew) {
                    cellDetails[newX][newY].f = fNew;
                    cellDetails[newX][newY].g = gNew;
                    cellDetails[newX][newY].h = hNew;
                    cellDetails[newX][newY].parent_i = i;
                    cellDetails[newX][newY].parent_j = j;

                    const triplet = new Triple(fNew, newX, newY);
                    openList.enqueue(triplet);
                }
            }
        });

        // Check if destination is reached
        if (isDestination(i, j, dest)) {
            tracePath(cellDetails, dest);
            foundDest = true;
            break;
        }
    }

    if (!foundDest) {
        // Handle case when destination is not found
        console.log("Destination not found.");
    }
}

// Placeholder for drawAnimation function
function drawAnimation(i, j, color) {
    // Implement the logic to draw or animate the path
}

// Placeholder for tracePath function
function tracePath(cellDetails, dest) {
    // Implement the logic to trace the path from the source to the destination
}
