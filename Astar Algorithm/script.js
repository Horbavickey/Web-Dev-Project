// Assuming the HTML and CSS are already set up as per your previous code

// Initialize the array
var ar = new Array(100);
for (var i = 0; i < 100; i++) {
    ar[i] = new Array(100);
}

var ctx;
var canvas;
var n;
var cellSide;
var hasStart = false;
var hasEnd = false;
var startx = -1;
var starty = -1;
var endx = -1;
var endy = -1;
var painting = false;
var attribute;
var time = 0;
var weight;
var timeoutID = [];
var timeoutPathID = [];
var l = -1;
var k = -1;

// Creates gridded canvas
function createMapArray() {
    n = document.getElementById("numb").value;

    hasStart = false;
    hasEnd = false;
    startx = -1;
    starty = -1;
    endx = -1;
    endy = -1;

    var button = document.getElementById("reset");
    button.disabled = true;

    button = document.getElementById("find-path");
    button.disabled = true;

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            ar[i][j] = 0;
        }
    }

    canvas = document.querySelector("canvas");

    cellSide = Math.round(canvas.width / n);
    canvas.width = cellSide * n;
    canvas.height = cellSide * n;

    ctx = canvas.getContext("2d");

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            drawRec(i, j, "black");
        }
    }
}

// Function to draw a rectangle on the canvas
function drawRec(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSide, y * cellSide, cellSide, cellSide);
}

// Function to draw a flag or marker at the end point
function drawFlag(x, y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x * cellSide, y * cellSide, cellSide, cellSide);
}

// Add event listeners for buttons
document.getElementById("start-walls").addEventListener("click", addWalls);
document.getElementById("start-point").addEventListener("click", addStart);
document.getElementById("end-point").addEventListener("click", addEnd);
document.getElementById("find-path").addEventListener("click", search);

// Corrected addWalls function
function addWalls() {
    canvas.addEventListener("mousedown", startPos);
    canvas.addEventListener("mouseup", endPos);
    canvas.addEventListener("mousemove", clickwalls);
}

// Corrected addStart function
function addStart() {
    canvas.addEventListener("click", clickStart);
}

// Corrected addEnd function
function addEnd() {
    canvas.addEventListener("click", clickEnd);
}

// Placeholder for clearPath function
function clearPath() {
    // Implement logic to clear any previously drawn paths
}

// Placeholder for aStar function
function aStar(ar, src, dest) {
    // Implement A* pathfinding algorithm
    console.log("A* pathfinding algorithm not implemented.");
}

// Example of drawRec function
function drawRec(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSide, y * cellSide, cellSide, cellSide);
}

// Example of drawFlag function
function drawFlag(x, y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x * cellSide, y * cellSide, cellSide, cellSide);
}

// Placeholder for clearPath function
function clearPath() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Assuming the grid is initially black, so we redraw it as black.
            drawRec(i, j, "black");
        }
    }
}

// Implementing the A* algorithm
function aStar(ar, src, dest) {
    // This is a simplified version of the A* algorithm.
    // Assuming ar is a 2D array representing the grid, where 0 is walkable and 1 is a wall.

    // The open set initially contains only the start node.
    var openSet = [src];
    // The closed set is initially empty.
    var closedSet = [];

    // The g score is the cost of the path from the start node to the current node.
    // The h score is the heuristic estimate of the cost from the current node to the goal.
    // The f score is the sum of the g and h scores.
    var gScore = {};
    var fScore = {};
    var cameFrom = {};

    gScore[src] = 0;
    fScore[src] = heuristic(src, dest);

    while (openSet.length > 0) {
        // Find the node in the open set with the lowest f score.
        var current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);

        // If the current node is the destination, we have found the path.
        if (current.x === dest.x && current.y === dest.y) {
            // Reconstruct the path from the start to the goal.
            var path = [];
            while (current) {
                path.push(current);
                current = cameFrom[current];
            }
            path.reverse();
            return path; // Return the path.
        }

        // Move the current node from the open set to the closed set.
        openSet = openSet.filter(node => node !== current);
        closedSet.push(current);

        // For each neighbor of the current node...
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var neighbor = { x: current.x + i, y: current.y + j };

                // Skip the current node and any out-of-bounds neighbors.
                if (i === 0 && j === 0 || neighbor.x < 0 || neighbor.y < 0 || neighbor.x >= n || neighbor.y >= n) continue;

                // If the neighbor is a wall, skip it.
                if (ar[neighbor.x][neighbor.y] === 1) continue;

                // Calculate tentative scores for the neighbor.
                var tentativeGScore = gScore[current] + 1; // Assuming a cost of 1 to move to a neighbor.
                if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, dest);
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }

    // If we get here, there is no path.
    return null;
}

function heuristic(a, b) {
    // Use Manhattan distance as a simple heuristic.
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Placeholder functions for handling mouse events
function startPos(e) {
    painting = true;
}

function endPos(e) {
    painting = false;
}

function clickwalls(e) {
    if (!painting) return;
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left) / cellSide);
    var y = Math.floor((e.clientY - rect.top) / cellSide);
    ar[x][y] = 1; // Set the cell as a wall
