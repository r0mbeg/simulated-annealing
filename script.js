function travelTime(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum += adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        
    }
    return sum;
    //console.log(sum);
}


function shuffleArray(array) {
    res = array;
    for (let i = 0; i < array.length * 3; i ++) {
        swapTwoRandom(res);
    }
    return res;
}

function swapTwoRandom(crawlPath) {
    res = crawlPath
    x = parseInt(Math.random() * res.length);
    do {
        y = parseInt(Math.random() * res.length);
    } while (x == y);
    //console.log(x + " " + y);
    let temp = res[x];
    res[x] = res[y];
    res[y] = temp;
    //console.log(crawlPath);
}



//задание весов рёбер
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

for (let i = 0; i < adjacencyMatrix.length; i++) {
    crawlPath[0][i] = i;
}
//console.log(crawlPath);
//console.log(travelTime(crawlPath[0], adjacencyMatrix));
let min = 9999999;
let minPath = 0;
//стартовый путь
crawlPath[0] = shuffleArray(crawlPath[0]);
console.log(crawlPath[0]);
console.log(travelTime(crawlPath[0], adjacencyMatrix));

for (let i = 1; i < 10; i++) {
    crawlPath[i] = shuffleArray(crawlPath[i - 1]);
    console.log("Путь на итерации " + i + ": " + crawlPath[i]);
    console.log("Длина пути на итерации " + i + ": " + travelTime(crawlPath[i], adjacencyMatrix));
    if (travelTime(crawlPath[i], adjacencyMatrix) < min) {
        min = travelTime(crawlPath[i], adjacencyMatrix);
        minPath = i;
    }
}

console.log("Кротчайший путь - №" + minPath + ", который имеет длину " + min);

//let L = [];//массив длин путей





