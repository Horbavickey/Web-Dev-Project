import { LIMIT_CLUSTERS } from "./script.js";
import { data_points } from "./script.js";

import { Point } from "./tools.js";

export {
    checkingOnError,
    deepCopy,
    getRandomInt
}

function checkingOnError(count_clusters) {
    if (count_clusters > LIMIT_CLUSTERS) {
        alert("Cluster limit exceeded");
        return true;
    } else if (count_clusters <= 0 || isNaN(count_clusters)) {
        alert("The number of clusters are incorrect");
        return true;
    } else if (data_points.length < count_clusters) {
        alert("You have entered more groups than points. Add more points or change the number of clusters");
        return true;
    } else {
        return false;
    }
}

function deepCopy(mas) {
    return mas.map(point => new Point(point.x, point.y, 0));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
