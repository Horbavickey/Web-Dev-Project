import { LIMIT_CLUSTERS, data_points } from "./main.js";
import { Point } from "./Objects.js";

const checkingOnError = (count_clusters) => {
    if ((count_clusters > LIMIT_CLUSTERS)) {
        alert("the limit of the cluster exceeded");
        return true;
    } else if ((count_clusters <= 0) || (count_clusters == NaN)) {
        alert("The number of clusters are incorrect");
        return true;
    } else if (data_points.length < count_clusters) {
        alert("You have entered more groups than points.  you will need to add more points or change the number of clusters");
        return true;
    } else {
        return false;
    }
}

const deepCopy = (mas) => {
    let new_mas = [];

    for (let i = 0; i < mas.length; i++) {
        if (typeof mas[i] === 'object') {
            new_mas[i] = new Point(mas[i].x, mas[i].y, 0);
        }
    }

    return new_mas;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export {
    checkingOnError,
    deepCopy,
    getRandomInt
}
