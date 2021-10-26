//"use strict";

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

function travelLength(crawlPath, adjacencyMatrix) {
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

function travelTime(crawlPath) {
    let min = timeTable[0][crawlPath[0]];
    let max = timeTable[0][crawlPath[0]];
    for (let i = 0; i < crawlPath.length; i++) {
        if (timeTable[i][crawlPath[i]] > max) {
            max = timeTable[i][crawlPath[i]];
        }
        if (timeTable[i][crawlPath[i]] < min) {
            min = timeTable[i][crawlPath[i]];
        }
    }
    return (max - min);
}

function changeOneRandom(crawlPath) {
    let tempCrawlPath = crawlPath.slice();
    //номер врача, у которого будем менять время
    let x = getRandomInt(timeTable.length);
    //количество миллисекунд в минуте
    let msMinutes = 1000 * 60;
    let diff = 0;
    //сформируем массив номерков, которые находятся не ближе 30 минут к остальным номеркам
    //в последовательности посещения
    let avaluable = [];
    let flag = true;
    //пробежим в цикле все номерки врача №x и проверим, какие из них подходят
    for (let i = 0; i < timeTable[x].length; i++) {
        flag = true;
        for (let j = 0; j < crawlPath.length; j++) {
            diff = (Math.abs(Math.floor(  (timeTable[x][i] - timeTable[j][crawlPath[j]]))) / msMinutes);
            if (diff < 30) {
                flag = false;
                //console.log("Время " + timeTable[x][i] + " не подходит!");
                break;
            }
        }
        if (flag == true) {
            avaluable.push(i);
            //console.log("Время " + timeTable[x][i] + " подходит!");
        }
    }

    //если таких номерков нет, то запишем в массив тот номерок, который уже был выбран
    if (avaluable.length == 0) {
        avaluable.push(x);
    }   

    //среди свободных номерков выберем случайным образом один
    let y = getRandomInt(avaluable.length);
    tempCrawlPath[x] = avaluable[y];

    return tempCrawlPath;
}

function shufflePath(array) {
    tempArray = array.slice();
    for (let i = 0; i < array.length * 2; i ++) {
        tempArray = changeOneRandom(tempArray);
    }
    return tempArray;

}

function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (10000000 * temperature))));
}


function simulatedAnnealingMethod(crawlPath) {
    
    crawlPath[0] = [0, 2, 4, 6, 8];
    crawlPath[0] = shufflePath(crawlPath[0]);
    //продолжительности посещений
    let pathTime = [];
    pathTime[0] = travelTime(crawlPath[0]);
    //длины путей между врачами
    let pathLength = [];
    pathLength[0] = travelLength(crawlPath[0], adjacencyMatrix);
    //сложности путей
    let difficulty = [];
    //коэффициент сложности пути
    //может быть увеличен если пациент, например, маломобилен
    let difficultyFactor = 700000;
    difficulty[0] = pathTime[0] + pathLength[0] * difficultyFactor;
    

    let time = new Date(pathTime[0]);
    console.log("Начальная последовательность обхода " + crawlPath[0] +
    " занимает время " + (time.getHours() - 3) + ":" + time.getMinutes() +
    " и имеет длину " + travelLength(crawlPath[0], adjacencyMatrix));

    //начальная температура
    let temperature = 100;

    //коэффициент снижения температуры
    let alpha = 0.999;

    //сложность пути - функция от времени и
    //расстояния между врачами


    //вероятность для выбора пути
    let p = 0;

    let i = 1;

    let testP = Math.random() * 100;

    //номер итогового пути
    let res = 0;

    //разница между продолжительностями посещений
    let deltaPathTime = 0;

    
    

    //разница между сложностями
    while (temperature >= 0.01) {
        crawlPath[i] = changeOneRandom(crawlPath[i - 1]);
        pathTime[i] = travelTime(crawlPath[i]);
        pathLength[i] = travelLength(crawlPath[i], adjacencyMatrix);
        difficulty[i] = pathTime[i] + pathLength[i] * difficultyFactor;

        deltaDifficulty = difficulty[i] - difficulty[i - 1];

        if (deltaDifficulty <= 0) {
            //console.log("Путь на итерации " + i + " удачный \n\n");
            res = i;
            i++;
        } else {
            p = probability(deltaDifficulty, temperature);
            //console.log("p = exp(-" + deltaPathTime + "/(10000000 * " + temperature + ")) = " +p);
            testP = Math.random() * 100;
    
            if (p > testP) {
                //console.log (p + " > " + testP + " - Путь на итерации " + i + " принят \n\n");
                res = i;
                i++;   
            } else {
                //console.log (p + " <= " + testP + " - Путь на итерации " + i + " не принят \n\n");
            }
            
        }
        temperature *= alpha;
    }
        
    console.log("Оптимальная последовательность обхода: " + crawlPath[res] + " занимает время " + 
    (new Date(pathTime[res]).getHours() - 3) + ":" + (new Date(pathTime[res]).getMinutes()) +
    ", достигнута на итерации " + res + " и имеет длину " + travelLength(crawlPath[res], adjacencyMatrix) + 
    " а время = " + pathTime[res] + ", сложность = " + difficulty[res]);
    
}


//задание расписания врачей
//массив из 5 врачей
let timeTable = new Array(5);
for (let i = 0; i < timeTable.length; i ++) {
    //у каждого врача 40 номерков с 8 до 17:45
    timeTable[i] = new Array(40);
    for (let j = 0; j < timeTable[i].length; j++) {
        timeTable[i][j] = new Date(2021, 9, 18, 8, j * 15);
    }   
}

//задание расстояний между кабинетами 
//с помощью матрицы смежности
let adjacencyMatrix = [[0, 3, 4, 1, 1],
                       [3, 0, 1, 3, 1],
                       [4, 1, 0, 1, 1],
                       [1, 3, 1, 0, 1],
                       [1, 1, 1, 1, 0]];


//последовательность обхода врачей
let crawlPath = [];


simulatedAnnealingMethod(crawlPath);















