import {
    RADIUS_CHANGE,
    COUNT_NEIGHBOURS_POINTS,
    data_points,
    POINT_RADIUS,
    activeMode,
} from "./main.js";

import { deepCopy } from "./func_for_algo.js";

import { disableButtons, enableButtons } from "./buttons_handler.js";

import { calculateDistance, showOldPoints } from "./canvas_handler.js";

export { startDBSCAN };

const startDBSCAN = () => {
    showOldPoints();

    if (data_points.length > 0) {
        disableButtons();
        DBSCAN(deepCopy(data_points));
        enableButtons();
    } else {
        alert("Draw at least one point in the cluster");
    }
};

const DBSCAN = (points) => {
    let count_clusters = 0;

    points.forEach((point, i) => {
        if (point.cluster === 0 && point.core === false) {
            const neighbours = findNeighbours(point, count_clusters, points);

            if (neighbours.length !== 0) {
                point.core = true;
                count_clusters++;

                point.cluster = count_clusters;
                point.draw();

                const queue = deepCopy(neighbours);

                queue.forEach((queuePoint) => {
                    if (queuePoint.core === false) {
                        queuePoint.core = true;
                    }

                    queuePoint.cluster = count_clusters;
                    queuePoint.draw();

                    const newNeighbours = findNeighbours(queuePoint, count_clusters, points);
                    if (newNeighbours.length !== 0) {
                        queue.push(...newNeighbours);
                    }
                });
            } else {
                point.cluster = -1;
            }
        }
    });

    if (!checkingOnChange(points)) {
        alert("Failed to allocate points to clusters");
    }
};

const findNeighbours = (point, current_cluster, points) => {
    let count_neighbours = 0;
    const neighbours = [];

    points.forEach((pointCandidate) => {
        if (
            point.x !== pointCandidate.x &&
            point.y !== pointCandidate.y &&
            pointCandidate.cluster < 1
        ) {
            if (
                calculateDistance(point.x, point.y, pointCandidate.x, pointCandidate.y) -
                    POINT_RADIUS <=
                RADIUS_CHANGE
            ) {
                neighbours.push(pointCandidate);
                count_neighbours++;
            }

        } else if (pointCandidate.cluster === current_cluster && current_cluster !== 0) {
            count_neighbours++;
        }
    });

    if (count_neighbours >= COUNT_NEIGHBOURS_POINTS) {
        return neighbours;
    }

    return [];
};

const checkingOnChange = (points) => {
    for (let i = 0; i < points.length; i++) {
        if (points[i].cluster !== -1) {
            return true;
        }
    }

    return false;
};