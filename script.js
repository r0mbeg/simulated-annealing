//"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function travelTime(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum += adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        
    }
    return sum;
    //console.log(sum);
}

function swapTwoRandom(crawlPath) {
    let x = getRandomInt(crawlPath.length);
    let y = getRandomInt(crawlPath.length);
    while (x == y) {
        console.log("Числа получились равные!");
        y = getRandomInt(crawlPath.length);
    }
    console.log(x + " " + y);
    let temp = crawlPath[x];
    crawlPath[x] = crawlPath[y];
    crawlPath[y] = temp;
    //console.log(crawlPath);
}

function shuffleArray(array) {
    let res = array;
    //console.log(array.length);
    for (let i = 0; i < array.length * 3; i++) {
        swapTwoRandom(res);
        console.log("Итерация свапа " + i);
    }
    return res;
}



function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(-deltaLengthPath / temperature));
}

let adjacencyMatrix = [[0, 3, 4, 1, 2, 1],
                       [3, 0, 1, 3, 4, 1],
                       [4, 1, 0, 1, 2, 1],
                       [1, 3, 1, 0, 1, 1],
                       [2, 4, 2, 1, 0, 2],
                       [1, 1, 1, 1, 2, 0]];

//console.log(adjacencyMatrix);    

let tempPath = [];

//задание пути обхода
let crawlPath = [];
crawlPath[0] = [];

//длина пути
let lengthPath = [];

for (let i = 0; i < adjacencyMatrix.length; i++) {
    tempPath[i] = i;
}



//стартовый путь
crawlPath[0] = shuffleArray(tempPath);
lengthPath[0] = travelTime(crawlPath[0], adjacencyMatrix);

console.log(crawlPath[0]);
console.log(lengthPath[0]);


//начальная температура
let temperature = 100;

//коэффициент снижения температуры
let alpha = 0.5;

//разница длин путей
let deltaLengthPath = [];

//вероятность для выбора пути
//let probability;

let P = 0;

let i = 1;

console.log("Текущая температура: " + temperature);
while (temperature >= 1) {
    
    //новый путь обхода
    crawlPath[i] = shuffleArray(crawlPath[i - 1]);
    //длина нового пути обхода
    lengthPath[i] = travelTime(crawlPath[i], adjacencyMatrix);
    //дельта путей обхода
    deltaLengthPath[i] = lengthPath[i] - lengthPath[i - 1];

    console.log("Путь на итерации " + i + ": " + crawlPath[i]);
    console.log("Длина пути на итерации " + i + ": " + lengthPath[i]);
    //вычисление вероятности для выбора пути
    P = probability(deltaLengthPath[i], temperature);

    //если P больше случайного числа от 0 до 100, выбираем этот путь
    if (P > Math.random * 100) {
        i++;
    }
    
    //снижаем температуру
    temperature = temperature * alpha;

}

console.log("Итоговый путь: " + crawlPath[crawlPath.length - 1]);





