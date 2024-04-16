// Function to trace the path from end to start
function tracePath(cellDetails, dest) {
    let { x, y } = dest; // Destructure the destination object

    // Trace the path until the start cell is reached
    while (!(cellDetails[x][y].parent_i === x && cellDetails[x][y].parent_j === y)) {
        let { parent_i: temp_x, parent_j: temp_y } = cellDetails[x][y]; // Destructure parent indices
        drawPath(x, y, temp_x, temp_y); // Draw the path segment
        x = temp_x;
        y = temp_y;
    }

    // Enable the clear path button
    const button = document.getElementById("clearPath");
    button.disabled = false;
    l++; // Increment the counter
}

// Function to draw a path segment between two cells
function drawPath(x, y, temp_x, temp_y) {
    l++;
    timeoutPathID[l] = setTimeout(() => { // Use arrow function for timeout

        ctx.strokeStyle = "red"; // Set path color
        ctx.lineWidth = 3; // Set path width
        ctx.beginPath();
        ctx.moveTo(x * cellSide + cellSide / 2, y * cellSide + cellSide / 2); // Move to starting point

        // Determine direction of movement and draw the path segment accordingly
        if (y - temp_y > 0 && x - temp_x === 0) { // Going down
            ctx.lineTo(temp_x * cellSide + cellSide / 2, temp_y * cellSide + cellSide / 2 - ctx.lineWidth / 2);
        } else if (y - temp_y < 0 && x - temp_x === 0) { // Going up
            ctx.lineTo(temp_x * cellSide + cellSide / 2, temp_y * cellSide + cellSide / 2 + ctx.lineWidth / 2);
        } else if (x - temp_x < 0 && y - temp_y === 0) { // Going right
            ctx.lineTo(temp_x * cellSide + cellSide / 2 + ctx.lineWidth / 2, temp_y * cellSide + cellSide / 2);
        } else if (x - temp_x > 0 && y - temp_y === 0) { // Going left
            ctx.lineTo(temp_x * cellSide + cellSide / 2 - ctx.lineWidth / 2, temp_y * cellSide + cellSide / 2);
        } else { // No direction change
            ctx.lineTo(temp_x * cellSide + cellSide / 2, temp_y * cellSide + cellSide / 2);
        }

        ctx.stroke(); // Draw the path segment

    }, time);
}
