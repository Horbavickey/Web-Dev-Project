import { activeMode, data_points } from "./main.js";
import { calculateDistance, showOldPoints } from "./canvas_handler.js";
import { disableButtons, enableButtons } from "./button.js";
import { checkingOnError, deepCopy, getRandomInt } from "./func_for_algo.js";
import { Point } from "./Objects.js";

export { startkMeans };

export let count_clusters;

function startkMeans() {
    count_clusters = Number(document.getElementById('takeclusters').value);

    if (!checkingOnError(count_clusters)) {
        showOldPoints();
        disableButtons();

        kMeans(deepCopy(data_points));
        enableButtons();
    }
}

function kMeans(points) {
    let centroids = [];
    points = findFirstCentroids(deepCopy(points), centroids); // Create array of the first centroids

    let counter = 0;
    while (counter < 100) {
        assignPointsToCluster(points, centroids.slice());
        centroids = calculateNewPositionClusters(points.slice(), centroids.slice());
        counter++;
    }
}

function findFirstCentroids(points, centroids) {
    let ind = getRandomInt(0, points.length);
    points[ind].cluster = 1;
    centroids[0] = copyPoint(points[ind]);
    centroids[0].draw();

    for (let i = 1; i < count_clusters; i++) {
        let ind_next_centr = findNextCentroidIndex(points, centroids);
        points[ind_next_centr].cluster = i + 1;
        centroids[i] = copyPoint(points[ind_next_centr]);
        centroids[i].draw();
    }

    return points;
}

function assignPointsToCluster(points, centroids) {
    points.forEach(point => {
        let nearestCentroid = centroids.reduce((nearest, centroid) => 
            calculateDistance(point.x, point.y, centroid.x, centroid.y) < calculateDistance(point.x, point.y, nearest.x, nearest.y) ? centroid : nearest
        );

        if (point.cluster !== nearestCentroid.cluster) {
            point.cluster = nearestCentroid.cluster;
            point.draw();
        }
    });
}

function calculateNewPositionClusters(points, centroids) {
    let centroids_new = centroids.slice();
    let SumX = Array(count_clusters).fill(0),
        SumY = Array(count_clusters).fill(0),
        count = Array(count_clusters).fill(0);

    points.forEach(point => {
        SumX[point.cluster - 1] += point.x;
        SumY[point.cluster - 1] += point.y;
        count[point.cluster - 1]++;
    });

    centroids_new.forEach((centroid, i) => {
        centroid.x = SumX[i] / count[i];
        centroid.y = SumY[i] / count[i];
    });

    return centroids_new;
}

function isCanCentroids(point, centroids) {
    return !centroids.some(centroid => centroid.x === point.x && centroid.y === point.y);
}

function copyPoint(point) {
    return new Point(point.x, point.y, point.cluster);
}

function findNextCentroidIndex(points, centroids) {
    let maxDist = 0;
    let ind_next_centr;

    points.forEach((point, index) => {
        if (isCanCentroids(point, centroids)) {
            let dist = centroids.reduce((acc, centroid) => 
                acc + calculateDistance(point.x, point.y, centroid.x, centroid.y), 0);

            if (dist > maxDist) {
                maxDist = dist;
                ind_next_centr = index;
            }
        }
    });

    return ind_next_centr;
}
