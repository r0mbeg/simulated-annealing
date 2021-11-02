
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function minIndexArray(array) {
    let min = array[0];
    let minIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (min > array[i]) {
            min = array[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function maxIndexArray(array) {
    let max = array[0];
    let maxIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

function travelTime(crawlPath) {
    if (crawlPath == null) {
        //console.log("Невозможно посчитать время пустой последовательности!");
        return null;
    } else {
    let min = timetable[0][crawlPath[0]];
    let max = timetable[0][crawlPath[0]];
    for (let i = 0; i < crawlPath.length; i++) {
        if (timetable[i][crawlPath[i]] > max) {
            max = timetable[i][crawlPath[i]];
        }
        if (timetable[i][crawlPath[i]] < min) {
            min = timetable[i][crawlPath[i]];
        }
    }
    //отнимаем 3 часа в миллисекундах из-за часового пояса
    return (max - min);
    }
}

function travelLength(crawlPath, adjacencyMatrix) {
    if (crawlPath == null) {
        //console.log("Невозможно посчитать длину пустой последовательности обхода!");
        return null;
    } else {
        let sum = 0;
        let tempCrawlPath = crawlPath.slice();
        //массив последователности обхода, формирующийся на основе crawlPath
        let crawlSequnce = [];
    
        for (let i = 0; i < tempCrawlPath.length; i++) {
            crawlSequnce[i] =  minIndexArray(tempCrawlPath);
            //console.log("Минимум на итерации " + i + " равен элементу с индексом " + crawlSequnce[i]);
            //console.log(tempCrawlPath);
            tempCrawlPath[crawlSequnce[i]] = 9999;
            
            
        }
        
        for (let i = 0; i < crawlPath.length - 1; i++) {
            sum = sum + adjacencyMatrix[crawlSequnce[i]][crawlSequnce[i + 1]];
        }
        //console.log("Длина пути [" + crawlSequnce + "] равна " + sum);
        return sum;
    }
    
}


let timetable = new Array(5);
for (let i = 0; i < timetable.length; i ++) {
    //у каждого врача 40 номерков с 8 до 17:45
    timetable[i] = new Array(40);
    for (let j = 0; j < timetable[i].length; j++) {
        timetable[i][j] = new Date(2021, 9, 18, 8, j * 15);
    }   
}

let adjacencyMatrix = [[0, 3, 4, 1, 1],
                       [3, 0, 1, 3, 1],
                       [4, 1, 0, 1, 1],
                       [1, 3, 1, 0, 1],
                       [1, 1, 1, 1, 0]];



let crawlPath = [2,10,8,6,0];
console.log("travelLength = " + travelLength(crawlPath, adjacencyMatrix));
console.log("travelTime = " + travelTime(crawlPath));





    