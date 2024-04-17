// Define the cities array
const cities = [];
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Define the genetic algorithm parameters
const populationSize = 100;
const mutationRate = 0.02;
const iterationLimit = 1000;

// Define the genetic algorithm variables
let population;
let bestSolution;
let bestFitness;
let iteration;
let iterationInterval;

// Define the fitness function for a TSP solution
const fitness = (solution) => {
  let totalDistance = 0;
  solution.forEach((city1, i) => {
    const city2 = solution[(i + 1) % solution.length];
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += distance;
  });
  return totalDistance;
};

// Define the mutation operator for a TSP solution
const mutate = (solution) => {
  solution.forEach((_, i) => {
    if (Math.random() < mutationRate) {
      const j = Math.floor(Math.random() * solution.length);
      [solution[i], solution[j]] = [solution[j], solution[i]];
    }
  });
};

// Define the tournament selection operator for the genetic algorithm
const tournamentSelection = (population, size) => {
  const candidates = Array.from({ length: size }, () => population[Math.floor(Math.random() * population.length)]);
  return candidates.reduce((best, candidate) => fitness(candidate) < fitness(best) ? candidate : best);
};

const crossover = (parent1, parent2) => {
  const child = Array.from({ length: parent1.length });
  const startPos = Math.floor(Math.random() * parent1.length);
  const endPos = Math.floor(Math.random() * (parent1.length - startPos)) + startPos;
  for (let i = startPos; i <= endPos; i++) {
    child[i] = parent1[i];
  }
  parent2.forEach((element, i) => {
    if (!child.includes(element)) {
      child[child.indexOf(undefined)] = element;
    }
  });
  return child;
};

// Define the initialization function for the genetic algorithm
const initializeGA = () => {
  clearInterval(iterationInterval);

  if (cities.length < 2) {
    alert("You should add at least 2 cities.");
    return;
  }

  population = Array.from({ length: populationSize }, () => {
    const path = [...cities];
    path.forEach((_, j) => {
      const k = Math.floor(Math.random() * path.length);
      [path[j], path[k]] = [path[k], path[j]];
    });
    return path;
  });

  bestSolution = null;
  bestFitness = Infinity;
  iteration = 0;

  iterationInterval = setInterval(iterateGA, 1);
};

// Define the main iteration function for the genetic algorithm
const iterateGA = () => {
  if (iteration >= iterationLimit) {
    clearInterval(iterationInterval);
    return;
  }

  const parent1 = tournamentSelection(population, 5);
  const parent2 = tournamentSelection(population, 5);
  const child = crossover(parent1, parent2);
  mutate(child);

  const worstIndex = population.findIndex((path) => fitness(path) === Math.max(...population.map(fitness)));
  population[worstIndex] = child;

  const childFitness = fitness(child);
  if (childFitness < bestFitness) {
    bestSolution = child;
    bestFitness = childFitness;
    drawBestSolution();
  }

  iteration++;
};

// Define the function to clear the canvas and draw the cities
const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();
};

// Define the function to draw the cities on the canvas
const drawCities = () => {
  cities.forEach((city) => {
    context.beginPath();
    context.arc(city.x, city.y, 3, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
  });
};

// Define the function to draw the best solution path on the canvas
const drawBestSolution = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCities();

  context.beginPath();
  context.moveTo(bestSolution[0].x, bestSolution[0].y);
  bestSolution.slice(1).forEach((city) => {
    context.lineTo(city.x, city.y);
  });
  context.strokeStyle = "green";
  context.lineWidth = 3;
  context.stroke();
  context.closePath();
};

// Define the function to handle the click event on the canvas
const addCity = (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  cities.push({ x, y });
  drawCities();
};

// Define the function to clear the cities
const clearCities = () => {
  cities.length = 0;
  clearCanvas();
  clearInterval(iterationInterval);
  bestSolution = null;
  bestFitness = Infinity;
};

// Add event listeners
canvas.addEventListener("click", addCity);
document.getElementById("start-button").addEventListener("click", initializeGA);
document.getElementById("clear-button").addEventListener("click", clearCities);
