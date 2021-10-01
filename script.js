//задание весов рёбер
let adjacencyMatrix = [[0, 3, 4, 1, 2, 1],
                       [3, 0, 1, 3, 4, 1],
                       [4, 1, 0, 1, 2, 1],
                       [1, 3, 1, 0, 1, 1],
                       [2, 4, 2, 1, 0, 2],
                       [1, 1, 1, 1, 2, 0]];

console.log(adjacencyMatrix);                       
let crawlPath = [];

for (let i = 0; i < adjacencyMatrix.length; i++) {
    crawlPath.push(i);
}
console.log(crawlPath);
//travelTime(crawlPath, adjacencyMatrix);

shuffleArray(crawlPath);
console.log(crawlPath);
travelTime(crawlPath, adjacencyMatrix);

function travelTime(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum += adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
        
    }
    //return sum;
    console.log(sum);
}


function shuffleArray(array) {
    for (let i = 0; i < array.length * 3; i ++) {
        swapTwoRandom(array);
    }
}

function swapTwoRandom(crawlPath) {
    x = parseInt(Math.random() * crawlPath.length);
    do {
        y = parseInt(Math.random() * crawlPath.length);
    } while (x == y);
    //console.log(x + " " + y);
    let temp = crawlPath[x];
    crawlPath[x] = crawlPath[y];
    crawlPath[y] = temp;
    //console.log(crawlPath);
}




