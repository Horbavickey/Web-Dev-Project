import { LIMIT_CLUSTERS } from "./main.js";
import { data_points } from "./main.js";

import { Point } from "./Objects.js";

export {
    checkingOnError,
    deepCopy,
    getRandomInt
}

const checkForErrors = (count_clusters) => {
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

const deepCopyArray = (mas) => {
    const new_mas = [];

    for (let i = 0; i < mas.length; i++) {
        if (typeof mas[i] === 'object') {
            new_mas[i] = new Point(mas[i].x, mas[i].y, 0);
        }
    }

    return new_mas;
}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { checkForErrors as checkingOnError, deepCopyArray as deepCopy, getRandomIntInclusive as getRandomInt };