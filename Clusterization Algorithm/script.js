import {
    handler,
    startDrawing,
    stopDrawing
} from "./canva.js";
import { buttonsHandler } from "./buttton.js";
import { buttonsRenderEvent } from "./button.js";

export {
    canvas,
    ctx,
    SIZE_HEIGHT,
    SIZE_WIDTH,
    POINT_RADIUS,
    RADIUS_CHANGE,
    COUNT_NEIGHBOURS_POINTS,
    LIMIT_CLUSTERS,
    count_clusters,
    data_points
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SIZE_WIDTH = 1000,
    SIZE_HEIGHT = 600,
    POINT_RADIUS = 10,
    LIMIT_CLUSTERS = 27;

const RADIUS_CHANGE = 50,
    COUNT_NEIGHBOURS_POINTS = 2;

export let activeMode = { value: 0};

let data_points = [],
    count_clusters;

canvas.width = SIZE_WIDTH;
canvas.height = SIZE_HEIGHT;

document.getElementById('simple-canvas').addEventListener('click', (e) => { handler(e) }); // Corrected to match the ID in your HTML
document.getElementById('choose_point').addEventListener('click', (e) => {
    buttonsHandler(1, e);
    buttonsRenderEvent(e)
});
document.getElementById('erase_point').addEventListener('click', (e) => {
    buttonsHandler(2, e);
    buttonsRenderEvent(e)
});
document.getElementById('Kmeans').addEventListener('click', (e) => { // Corrected case sensitivity
    buttonsHandler(3, e);
    buttonsRenderEvent(e)
});
document.getElementById('DBscan').addEventListener('click', (e) => { // Corrected case sensitivity
    buttonsHandler(4, e);
    buttonsRenderEvent(e)
});
document.getElementById('previous_points').addEventListener('click', (e) => {
    buttonsHandler(5, e);
    buttonsRenderEvent(e)
});
document.getElementById('delete').addEventListener('click', () => { window.location.reload() });

// to add points even while the right click button is been clicked
document.getElementById('canvas').addEventListener('mousedown', startDrawing); 
document.getElementById('canvas').addEventListener('mouseup', stopDrawing); 
document.getElementById('canvas').addEventListener('mouseleave', stopDrawing); 

document.getElementById('choose_point').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('erase_point').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('previous_points').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('delete').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('Kmeans').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });
document.getElementById('DBscan').addEventListener('mouseover', (e) => { buttonsRenderEvent(e) });


document.getElementById('choose_point').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('erase_point').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('previous_points').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('delete').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('Kmeans').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });
document.getElementById('DBscan').addEventListener('mouseout', (e) => { buttonsRenderEvent(e) });