//"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

    //console.log("min = " + min + ", max = " + max);

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
    //console.log("Список доступных номерков" + avaluable);
    
    
    //среди свободных номерков выберем случайным образом один
    let y = getRandomInt(avaluable.length);

  //  console.log("У врача №" + x + " время изменено с " + crawlPath[x] + " : " 
    //+ timeTable[x][crawlPath[x]] + " на " + avaluable[y] + " : " + timeTable[x][avaluable[y]]);
    tempCrawlPath[x] = avaluable[y];


    
    return tempCrawlPath;

    

}

function shufflePath(array) {
    
}

function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (10000000 * temperature))));
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

/*
for (let i = 0; i < timeTable.length; i ++) {
    console.log("Расписание врача № " + i);
    for (let j = 0; j < timeTable[i].length; j++) {
        console.log("   " + j + ": " + timeTable[i][j]);
    }
}*/



//последовательность обхода врачей
let crawlPath = [];
crawlPath[0] = [0, 2, 4, 6, 8];
let pathTime = [];
pathTime[0] = travelTime(crawlPath[0]);

let time = new Date(pathTime[0]);
console.log("Последовательность обхода " + crawlPath[0] + " займёт время " + (time.getHours() - 3) + ":" + time.getMinutes());

/*
console.log("Исходная последовательность:");
console.log("Врач №0 " + timeTable[0][crawlPath[0][0]]);
console.log("Врач №1 " + timeTable[0][crawlPath[0][1]]);
console.log("Врач №2 " + timeTable[0][crawlPath[0][2]]);
console.log("Врач №3 " + timeTable[0][crawlPath[0][3]]);
console.log("Врач №4 " + timeTable[0][crawlPath[0][4]]);
*/

//crawlPath[1] = changeOneRandom(crawlPath[0]);
//console.log("\n");
//pathTime[1] = travelTime(crawlPath[1]);
//time = new Date(pathTime[1]);

//console.log("Последовательность обхода " + crawlPath[1] + " займёт время " + (time.getHours() - 3) + ":" + time.getMinutes());

//начальная температура
let temperature = 100;

//коэффициент снижения температуры
let alpha = 0.999;

//разница длин путей
let deltaLengthPath = 0;

//вероятность для выбора пути
let p = 0;

let i = 1;

let testP = Math.random() * 100;

//номер итогового пути
let res = 0;

while (temperature >= 0.01) {
    crawlPath[i] = changeOneRandom(crawlPath[i - 1]);
    pathTime[i] = travelTime(crawlPath[i]);

    deltaPathTime = (pathTime[i] - pathTime[i - 1]);
    
    if (deltaPathTime <= 0) {
        console.log("Путь на итерации " + i + " удачный \n\n");
        res = i;
        i++;
    } else {
        p = probability(deltaPathTime, temperature);
        console.log("p = exp(-" + deltaPathTime + "/(1000000 * " + temperature + ")) = " +p);
        testP = Math.random() * 100;

        if (p > testP) {
            console.log (p + " > " + testP + " - Путь на итерации " + i + " принят \n\n");
            res = i;
            i++;   
        } else {
            console.log (p + " <= " + testP + " - Путь на итерации " + i + " не принят \n\n");
        }
        
    }
    temperature *= alpha;
}

console.log("Итоговый путь: " + crawlPath[res] + " имеет длину " + 
(new Date(pathTime[res]).getHours() - 3) + ":" + (new Date(pathTime[res]).getMinutes()) +
" достигнут на итерации " + (res) + "\n\n");









