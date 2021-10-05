//"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function travelTime(crawlPath, adjacencyMatrix) {
    let str = "";
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum += adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        str = str + " + " + adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        
    }
    console.log(str);
    return sum;
    //console.log(sum);
}

function swapTwoRandom(crawlPath) {
    let x = getRandomInt(crawlPath.length);
    let y = getRandomInt(crawlPath.length);
    while (x == y) {
        y = getRandomInt(crawlPath.length);
    }
    //console.log(x + " " + y);
    let temp = crawlPath[x];
    crawlPath[x] = crawlPath[y];
    crawlPath[y] = temp;
}

function shuffleArray(array) {
    let res = array;
    for (let i = 0; i < array.length * 3; i++) {
        swapTwoRandom(res);
    }
    return res;
}



function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / temperature)));
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
crawlPath[0] = tempPath;//shuffleArray(tempPath);
lengthPath[0] = travelTime(crawlPath[0], adjacencyMatrix);
let min = lengthPath[0];
let minNumber = 0;

console.log("Стартовый путь: " + crawlPath[0] + " имеет длину " + lengthPath[0]);



//начальная температура
let temperature = 1000;

//коэффициент снижения температуры
let alpha = 0.9;

//разница длин путей
let deltaLengthPath = [];

//вероятность для выбора пути
let P = 0;

let i = 1   ;

let testP = Math.random() * 100;

while (temperature >= 1) {
    console.log("Текущая температура: " + temperature);
    //новый путь обхода
    crawlPath[i] = shuffleArray(crawlPath[i - 1]);
    //длина нового пути обхода
    lengthPath[i] = travelTime(crawlPath[i], adjacencyMatrix);
    //дельта путей обхода
    deltaLengthPath[i] = lengthPath[i] - lengthPath[i - 1];

    //console.log("Путь на итерации " + i + ": " + crawlPath[i] + " имеет длину " + lengthPath[i]);

    //вычисление вероятности для выбора пути
    P = probability(deltaLengthPath[i], temperature);
    console.log("Величина P* равна " + P);
    
    //если P больше случайного числа от 0 до 100, выбираем этот путь
    testP = Math.random() * 100;
    console.log("Величина testP равна " + testP);
    //console.log("Случайное число для сравнения с P* = " + testP);
    if (P > testP) {
        if (lengthPath[i] < min) {
            minNumber = i;
        }
        i++;
        //console.log("Путь на итерации " + i + " принят")
    } else {
        //console.log("Путь на итерации " + i + " не принят, откат на предыдущую итерацию");
    }
    



    //снижаем температуру
    temperature = temperature * alpha;
}

console.log("Итоговый путь: " + crawlPath[crawlPath.length - 1] + " имеет длину " + lengthPath[crawlPath.length - 1] + " достигнут на итерации " + (crawlPath.length - 1));
console.log("Лучший путь: " + crawlPath[minNumber] + " имеет длину " + lengthPath[minNumber] + " достигнут на итерации " + minNumber);
//настоящее решение - 5


