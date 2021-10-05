"use strict";

function travelTime(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum += adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        
    }
    return sum;
    //console.log(sum);
}


function shuffleArray(array) {
    let res = array;
    for (let i = 0; i < array.length * 3; i ++) {
        swapTwoRandom(res);
    }
    return res;
}

function swapTwoRandom(crawlPath) {
    let res = crawlPath;
    let x = parseInt(Math.random() * res.length);
    let y = parseInt(Math.random() * res.length);
    while (x == y) {
        let y = parseInt(Math.random() * res.length);
    }
    //console.log(x + " " + y);
    let temp = res[x];
    res[x] = res[y];
    res[y] = temp;
    //console.log(crawlPath);
}

function probability(deltaLengthPath, temperature) {
    return 100 * Math.exp(-deltaLengthPath / temperature);
}



let adjacencyMatrix = [[0, 3, 4, 1, 2, 1],
                       [3, 0, 1, 3, 4, 1],
                       [4, 1, 0, 1, 2, 1],
                       [1, 3, 1, 0, 1, 1],
                       [2, 4, 2, 1, 0, 2],
                       [1, 1, 1, 1, 2, 0]];

console.log(adjacencyMatrix);    

//задание пути обхода
let crawlPath = [];
crawlPath[0] = [];

//длина пути
let lengthPath = [];

for (let i = 0; i < adjacencyMatrix.length; i++) {
    crawlPath[0][i] = i;
}
//console.log(crawlPath);
//console.log(travelTime(crawlPath[0], adjacencyMatrix));
//let min = 9999999;
//let minPath = 0;
//стартовый путь
crawlPath[0] = shuffleArray(crawlPath[0]);
lengthPath[0] = travelTime(crawlPath[0], adjacencyMatrix);
console.log(crawlPath[0]);
console.log(lengthPath[0]);

//начальная температура
let temperature = 100;

//коэффициент снижения температуры
let alpha = 0.95;

//разница длин путей
let deltaLengthPath = [];

//вероятность для выбора пути
//let probability;



for (let i = 1; i < 15; i++) {
    //новый путь обхода
    crawlPath[i] = shuffleArray(crawlPath[i - 1]);
    //длина нового пути обхода
    lengthPath[i] = travelTime(crawlPath[i], adjacencyMatrix);
    //дельта путей обхода
    deltaLengthPath[i] = lengthPath[i] - lengthPath[i - 1];

    console.log("Путь на итерации " + i + ": " + crawlPath[i]);
    console.log("Длина пути на итерации " + i + ": " + lengthPath[i]);


    
    //if (travelTime(crawlPath[i], adjacencyMatrix) < min) {
       // min = lengthPath[i];
       // minPath = i;
    //}
    //снижаем температуру
    temperature = temperature * alpha;
}

//console.log("Кротчайший путь " + crawlPath[minPath] + ", который имеет длину " + min);

//let L = [];//массив длин путей





