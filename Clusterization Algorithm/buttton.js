// Importing necessary functions from other modules
import { startkMeans } from "./Kmeans Algo.js";
import { startDBSCAN } from "./DBscan Algo.js";
import { showOldPoints } from "./canva.js";
import { activeMode } from "./script.js";

// Exporting functions for use in other modules
export {
    buttonsHandler,
    buttonsRenderEvent,
    buttonsRender,
    disableButtons,
    enableButtons
};

// Constants for button colors
const COLOR_ACTIVE = '#080D0D';
const COLOR_UNACTIVE = '#A449D8';

// Function to handle button clicks and execute corresponding actions
function buttonsHandler(activeNumber, e) {
    activeMode.value = activeNumber;
    buttonsRender();

    if (activeNumber === 3) {
        startkMeans();
    } else if (activeNumber === 4) {
        startDBSCAN();
    } else if (activeNumber === 5) {
        showOldPoints();
        activeMode.value = 0;
    }
}

// Function to render visual feedback for buttons based on mouse events
function buttonsRenderEvent(e) {
    const targetId = e.target.id;
    const buttons = ['choose_point', 'erase_point', 'Kmeans', 'DBscan', 'previous_points'];
    buttons.forEach(id => {
        document.getElementById(id).style.backgroundColor = (id === targetId && e.type === 'mouseover') ? COLOR_ACTIVE : COLOR_UNACTIVE;
    });
}

// Function to update button colors based on the active mode
function buttonsRender() {
    const buttons = ['choose_point', 'erase_point', 'Kmeans', 'DBscan', 'previous_points'];
    buttons.forEach((id, index) => {
        document.getElementById(id).style.backgroundColor = (activeMode.value === 0 || index === activeMode.value - 1) ? COLOR_ACTIVE : COLOR_UNACTIVE;
    });
}

// Functions to disable and enable buttons
function disableButtons() {
    const buttons = ['choose_point', 'erase_point', 'previous_points', 'takeclusters', 'Kmeans', 'DBscan'];
    buttons.forEach(id => {
        document.getElementById(id).disabled = true;
    });
}

function enableButtons() {
    const buttons = ['choose_point', 'erase_point', 'previous_points', 'takeclusters', 'Kmeans', 'DBscan'];
    buttons.forEach(id => {
        document.getElementById(id).disabled = false;
    });
}
