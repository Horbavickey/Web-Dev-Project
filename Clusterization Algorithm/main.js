import { handler, startDrawing, stopDrawing } from "./canvas_handler.js";
import { buttonsHandler, buttonsRenderEvent } from "./buttons_handler.js";

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

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const SIZE_WIDTH = 1000,
    SIZE_HEIGHT = 600,
    POINT_RADIUS = 10,
    LIMIT_CLUSTERS = 27;

const RADIUS_CHANGE = 50,
    COUNT_NEIGHBOURS_POINTS = 2;

export let activeMode = { value: 0 };

let data_points = [],
    count_clusters;

canvas.width = SIZE_WIDTH;
canvas.height = SIZE_HEIGHT;

const buttonIds = ['canvas', 'add_point', 'remove_point', 'kMeans', 'DBSCAN', 'show_old_points', 'clear'];

buttonIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', (e) => {
            if (id === 'canvas') {
                handler(e);
            } else {
                buttonsHandler(buttonIds.indexOf(id) + 1, e);
                buttonsRenderEvent(e);
            }
        });

        element.addEventListener('mouseover', buttonsRenderEvent);
        element.addEventListener('mouseout', buttonsRenderEvent);
    }
});

canvas.addEventListener('mousedown', startDrawing); // To add points while pressing right click
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

document.getElementById('clear').addEventListener('click', () => { window.location.reload() });
