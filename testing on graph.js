//"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function travelTime(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum = sum + adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
    }
    return sum;
}

function swapTwoRandom(crawlPath) {
    let tempCrawlPath = crawlPath.slice();
    let x = getRandomInt(crawlPath.length);
    let y = getRandomInt(crawlPath.length);
    while (x == y) {
        y = getRandomInt(crawlPath.length);
    }
    tempCrawlPath[x] = crawlPath[y];
    tempCrawlPath[y] = crawlPath[x];
    return tempCrawlPath;
}

function shuffleArray(array) {
    let res = array.slice();
    for (let i = 0; i < array.length * 3; i++) {
        res = swapTwoRandom(res);
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

///////////////////////////////




//////////////////////////////
                       

                       
//задание пути обхода
let crawlPath = [];
crawlPath[0] = [];

//задание начального пути обхода
for (let i = 0; i < adjacencyMatrix.length; i++) {
    crawlPath[0][i] = i;
}
let lengthPath = [];
lengthPath[0] = travelTime(crawlPath[0], adjacencyMatrix);
console.log("Стартовый путь: " + crawlPath[0] + " имеет длину " + lengthPath[0] + "\n\n");

//начальная температура
let temperature = 100;

//коэффициент снижения температуры
let alpha = 0.999;

//разница длин путей
let deltaLengthPath = 0;

//вероятность для выбора пути
let P = 0;

let i = 1;

let testP = Math.random() * 100;

//номер итогового пути
let res = 0;

while (temperature >= 0.01) {
    //новый путь обхода - меняему два случайных элемента
    crawlPath[i] = swapTwoRandom(crawlPath[i - 1]);
    //длина нового пути обхода
    lengthPath[i] = travelTime(crawlPath[i], adjacencyMatrix);


    
    //дельта путей обхода
    deltaLengthPath = lengthPath[i] - lengthPath[i - 1];
    
    console.log("Путь на итерации " + i + ": " + crawlPath[i] + " имеет длину " + lengthPath[i] + " дельта = " + deltaLengthPath);
    //если путь получился короче - переходим к следующей итерации
    if (deltaLengthPath <= 0) {
        console.log("Путь на итерации " + i +" удачный \n\n");
        res = i;
        i++;
    } else {//если путь получился длиннее - вычисляем P*
        //вычисление "вероятности"      для выбора пути
        P = probability(deltaLengthPath, temperature);
        //если P больше случайного числа от 0 до 100, выбираем этот путь
        testP = Math.random() * 100;
        console.log("P = exp(-" + deltaLengthPath + "/" + temperature + ")");
        //console.log("Текущая температура: " + temperature + " Величина P* равна " + P + " Величина testP равна " + testP);
        if (P > testP) {
            console.log (P + " > " + testP + " - Путь на итерации " + i + " принят \n\n");
            res = i;
            i++;   
        } else {
            
            console.log (P + " <= " + testP + " - Путь на итерации " + i + " не принят \n\n");
        }
    }
    temperature = temperature * alpha;
}

//настоящее решение - длина = 5

console.log("Итоговый путь: " + crawlPath[res] + " имеет длину " + 
lengthPath[res] + " достигнут на итерации " + (res) + "\n\n");




