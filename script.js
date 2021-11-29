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

function displayTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes == 0) {
        return hours + ":00";
    } else {
        return hours + ":" + minutes;
    }
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
    return (max - min - 10800000);
}
}


//функция, меняющая у случайного врача время
//при этом учитывается промежуток времени, 
//в который пациент может посетить врачей
function changeOneRandom(crawlPath, startTime, endTime) {
    if (crawlPath == null) {
        //console.log("Подобрать оптимальную последовательность невозможно!");
        return crawlPath;
    } else {
    let tempCrawlPath = crawlPath.slice();
    //номер врача, у которого будем менять время
    let x = getRandomInt(timetable.length);
    //количество миллисекунд в минуте
    let msMinutes = 1000 * 60;
    let diff = 0;
    //сформируем массив номерков, которые находятся не ближе 30 минут к остальным номеркам
    //в последовательности посещения
    //(!!!)avaluable - это именно номерки, а не времена
    let avaluable = [];
    let flag = true;
    //пробежим в цикле все номерки врача №x и проверим, какие из них подходят
    for (let i = 0; i < timetable[x].length; i++) {
        flag = true;
        for (let j = 0; j < crawlPath.length; j++) {
            diff = (Math.abs(Math.floor(  (timetable[x][i] - timetable[j][crawlPath[j]]))) / msMinutes);
            //если промежуток между посещениями меньше 30мин
            //то такое время не добавляем в avaluable
            if (diff < 30) {
                flag = false;
                //console.log("Время " + timetable[x][i] + " не подходит!");
                break;
            }

        }
        if (flag == true) {
            avaluable.push(i);
            //console.log("Время " + timetable[x][i] + " подходит!");
        }
    }
    

    //если таких номерков нет, то запишем в массив тот номерок, который уже был выбран
    if (avaluable.length == 0) {
        avaluable.push(x);
    }   

    //если время посещения не находится в промежутке от startTime
    //до endTime то выводим сообщение об ошибке
  
    for (let i = 0; i < avaluable.length; i++) {
        if (timetable[x][avaluable[i]] > endTime || timetable[x][avaluable[i]] < startTime) {
           // console.log("Время " + (new Date(timetable[x][avaluable[i]]).getHours()) + 
           // ":" + (new Date(timetable[x][avaluable[i]]).getMinutes()) + " не подходит из-за промежутка!");
            avaluable.splice(i, 1);
            i--;
        } else {
            //console.log("Время " + (new Date(timetable[x][avaluable[i]]).getHours()) + 
            //":" + (new Date(timetable[x][avaluable[i]]).getMinutes()) + " ПОДХОДИТ!");
        }
    }

    if (avaluable.length > 0) {
    //среди свободных номерков выберем случайным образом один
    let y = getRandomInt(avaluable.length);
    tempCrawlPath[x] = avaluable[y];
    return tempCrawlPath;
    
    } else if (avaluable.length == 0) {
        //console.log("Подобрать оптимальную последовательность невозможно!");
        return null;
    }
}
}

function shufflePath(array, startTime, endTime) {
    tempArray = array.slice();
    for (let i = 0; i < array.length * 2; i ++) {
        tempArray = changeOneRandom(tempArray, startTime, endTime);
    }
    return tempArray;

}

function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (10000000 * temperature))));
}


function simulatedAnnealingMethod(crawlPath, startTime, endTime) {
    
    console.log("Подбираем оптимальную последовательность в промежутке от " +
    displayTime(startTime) + " до " + displayTime(endTime));

    crawlPath[0] = [];
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        crawlPath[0][i] = 3*i;
    }
    
    
    
    crawlPath[0] = shufflePath(crawlPath[0], startTime, endTime);
    
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

    if (crawlPath[0] != null) {
        console.log("Начальная последовательность обхода " + crawlPath[0] +
        " занимает время " + displayTime(time) +
        " и имеет длину " + travelLength(crawlPath[0], adjacencyMatrix));
    }
    
    
    


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
    

    //разница между сложностями
    let deltaDifficulty = 0;

    while (temperature >= 0.01) {
        crawlPath[i] = changeOneRandom(crawlPath[i - 1], startTime, endTime);
            if (crawlPath[i] == null) {
                //console.log("Подобрать оптимальную последовательность невозможно!");
                break;
            } else {
                //console.log("Последовательность обхода на итерации №" + i + ": " + crawlPath[i]);
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

        } 
        temperature *= alpha;    
    }
    
    
        
    if (travelLength(crawlPath[res], adjacencyMatrix) != null) {
        console.log("Оптимальная последовательность обхода в промежутке от " +
        displayTime(startTime) + " до " + displayTime(endTime) + " - " + 
        crawlPath[res] + " занимает время " + displayTime(new Date(pathTime[res])) +
        ", достигнута на итерации " + res + " и имеет длину " + travelLength(crawlPath[res], adjacencyMatrix));

        console.log("Последовательность обхода:");

        docCrawlPath = crawlPath[res].slice();



        let strRes = "";
        for (let i = 0; i < docCrawlPath.length; i++) {
            console.log(doctors[i] + " - " + displayTime(timetable[i][crawlPath[res][i]]));
            strRes += doctors[i] + " - " + displayTime(timetable[i][crawlPath[res][i]]) + "\n";
        }

        //alert(strRes);
        //раскрасим все кнопки в цвет по умолчанию 
        for (let i = 0; i < buttons.length; i ++) {
            for (let j = 0; j < buttons[i].length; j ++) {
                buttons[i][j].style.background = "";
            }
        }

        //выделим цветом выбранные номерки
        for (let i = 0; i < docCrawlPath.length; i++) {
            buttons[i][crawlPath[res][i]].style.background = "red";//"#F4FDAD";
        }    
        
    } else {
        console.log("Подобрать оптимальную последовательность невозможно!");
    }


        
    
    
}


//задание расписания врачей
//считываем все элементы fieldset
let fieldsets = document.querySelectorAll('fieldset');
//console.log(fieldset);
let buttons = [];//двумерный массив кнопок i-номер набора кнопок (номер врача) 
//j - номер собственно кнопки
//console.log(fieldset[2].length);
//for (let i = 1; i < )

for (let i = 3; i < fieldsets.length; i ++) {
    buttons[i - 3] = fieldsets[i].querySelectorAll('button.buttonsmall');
    
}
//console.log(buttons.length);
let timetable = [];
for (let i = 0; i < buttons.length; i ++) {
    timetable[i] = [];
}


for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {
        timetable[i][j] = new Date('November 8, 2021 ' + buttons[i][j].innerHTML);
        
    }
}

let doctors = [];
	for (let i = 3; i < fieldsets.length; i ++) {
		doctors[i - 3] = fieldsets[i].querySelector('legend').innerHTML.trim();
}


//задание расстояний между кабинетами 
//с помощью матрицы смежности
let adjacencyMatrix = [[0, 3, 4, 1, 1],
                       [3, 0, 1, 3, 1], 
                       [4, 1, 0, 1, 1],
                       [1, 3, 1, 0, 1],
                       [1, 1, 1, 1, 0]];


console.log(adjacencyMatrix);

//последовательность обхода врачей
let crawlPath = [];




function test() {
    timeStartAttribute = document.getElementById("timeStart").getAttribute("value").split(":");
    timeEndAttribute = document.getElementById("timeEnd").getAttribute("value").split(":");

    timeStart = new Date(2021, 10, 8, timeStartAttribute[0], timeStartAttribute[1]);
    timeEnd = new Date(2021, 10, 8, timeEndAttribute[0], timeEndAttribute[1]);

    //simulatedAnnealingMethod(crawlPath, timeStart, timeEnd);
    
    console.log(timeStartAttribute);
    console.log(timeEndAttribute);
    
}














