function aStar(grid, src, dest) {
    var isVisited = new Array(n);
    for (let i = 0; i < n; i++) {
        isVisited[i] = new Array(n).fill(false);
    }

    var cellDetails = new Array(n);
    for (let i = 0; i < n; i++) {
        cellDetails[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            cellDetails[i][j] = new CellDetails();
        }
    }

    var i = src.x;
    var j = src.y;
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;

    var openList = new Queue();
    openList.enqueue(new triple(0.0, i, j));

    var foundDest = false;

    while (!openList.isEmpty()) {
        var p = openList.dequeue();
        i = p.x;
        j = p.y;
        isVisited[i][j] = true;

        // Visiting the current cell
        console.log("Visiting:");
        console.log("i = ", i);
        console.log("j = ", j);
        console.log("f = ", p.f, " g =", cellDetails[i][j].g, " h = ", cellDetails[i][j].h);

        if (i !== src.x || j !== src.y) {
            drawAnimation(i, j, "#98FB98");
        }

        if (isDestination(i, j, dest)) {
            tracePath(cellDetails, dest);
            foundDest = true;
            return;
        }

        // Generate neighbors
        var neighbors = [
            [i - 1, j], [i + 1, j], [i, j + 1], [i, j - 1],
            [i + 1, j + 1], [i - 1, j + 1], [i - 1, j - 1], [i + 1, j - 1]
        ];

        for (let neighbor of neighbors) {
            var new_i = neighbor[0];
            var new_j = neighbor[1];
            
            if (isValid(new_i, new_j) && !isVisited[new_i][new_j] && grid[new_i][new_j] !== 1) {
                var gNew = cellDetails[i][j].g + (grid[new_i][new_j] === 2 ? 1.5 : 1) / weight;
                var hNew = calculateHValue(new_i, new_j, dest);
                var fNew = gNew + hNew;

                if (cellDetails[new_i][new_j].f === undefined || cellDetails[new_i][new_j].f > fNew) {
                    openList.enqueue(new triple(fNew, new_i, new_j));

                    if (new_i !== dest.x || new_j !== dest.y) {
                        drawAnimation(new_i, new_j, "#00D9FF");
                    }

                    cellDetails[new_i][new_j].f = fNew;
                    cellDetails[new_i][new_j].g = gNew;
                    cellDetails[new_i][new_j].h = hNew;
                    cellDetails[new_i][new_j].parent_i = i;
                    cellDetails[new_i][new_j].parent_j = j;
                }
            }
        }
    }

    if (!foundDest) {
        k++;
        timeoutID[k] = setTimeout(function () {
            const button = document.getElementById("clearPath");
            button.disabled = false;
        }, time);
    }
}
