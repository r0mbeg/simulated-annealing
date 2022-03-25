//"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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

function travelTime(crawlPath, timetable) {
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
function changeOneRandom(crawlPath, startTime, endTime, timetable) {
    
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

function shufflePath(array, startTime, endTime, timetable) {
      
    tempArray = array.slice();
    
    for (let i = 0; i < array.length * 2; i ++) {
        tempArray = changeOneRandom(tempArray, startTime, endTime, timetable);
    }
    return tempArray;
}

function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (10000000 * temperature))));
}
//задание расстояний между кабинетами 
//с помощью матрицы смежности

let originalAdjacencyMatrix = [[0, 3, 4, 1, 1, 1, 5],
                               [3, 0, 1, 3, 1, 2, 4], 
                               [4, 1, 0, 1, 1, 3, 3],
                               [1, 3, 1, 0, 1, 4, 2],
                               [1, 1, 1, 1, 0, 5, 1],
                               [1, 2, 3, 4, 5, 0, 1],
                               [5, 4, 3, 2, 1, 1, 0]];
/*let originalAdjacencyMatrix = [[0, 3, 4, 1, 1, 1],
                               [3, 0, 1, 3, 1, 2], 
                               [4, 1, 0, 1, 1, 3],
                               [1, 3, 1, 0, 1, 4],
                               [1, 1, 1, 1, 0, 5],
                               [1, 2, 3, 4, 5, 0]];
                               */

//import {originalAdjacencyMatrix} from './optimizedplanvizit_const.mjs';


window.addEventListener("load",function() {
    if (sessionStorage.getItem('funcStart') == 1) {
        getOptimizedPlanVizit();
    }
});

function clearOptimizedPlanVizit() {
    sessionStorage.clear();
    window.location.reload();
}

function selectCheckedDoctorsInMatrix(matrix, checkboxes) {
    
    let resMatrix = matrix.slice();
    
    //удаление строк
    for (let i = matrix.length - 1; i >= 0; i --) {
        if (!checkboxes[i].checked) {
            resMatrix.splice(i, 1);
        }
    }
    //удаление столбцов
    for (let i = resMatrix.length - 1; i >= 0; i --) {
        for (let j = resMatrix[0].length - 1; j >= 0; j --) {
            if (!checkboxes[j].checked) {
                resMatrix[i].splice(j, 1);
            }
        }
    }
    return resMatrix;
}





function getOptimizedPlanVizit() {

    sessionStorage.setItem('funcStart', 1);

    let allFieldsets = document.querySelectorAll('fieldset');
    
    
    let fieldsets = [];

    for (let i = 0; i < allFieldsets.length; i++) {
        if (allFieldsets[i].querySelector('legend')) {
            if (allFieldsets[i].querySelector('legend').querySelector('input')) {
                fieldsets.push(allFieldsets[i]);
            }
        }
    }
   
    



    

     

    
    

    //двумерный массив кнопок,
    //где i-номер набора кнопок (номер врача) 
    //j - номер собственно кнопки
    let buttons = [];
    //заполняем массив кнопок
    for (let i = 0; i < fieldsets.length; i ++) {
        buttons[i] = fieldsets[i].querySelectorAll('button.buttonsmall');
    }
    //массив расписания врачей - достаём из кнопок времена (например, 8:00:00)
    var timetable = [];
    for (let i = 0; i < buttons.length; i ++) {
        timetable[i] = [];
    }
    let dateStr = document.getElementById('DATEMULTIVIZIT').value.split("/");    
    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < buttons[i].length; j++) {
            let currTime = buttons[i][j].innerHTML.split(":");
            timetable[i][j] = new Date(Number(dateStr[2]),
                                       Number(dateStr[1] - 1),
                                       Number(dateStr[0]),
                                       currTime[0],
                                       currTime[1], 
                                       currTime[2]);   
        }
    }   

    let doctors = [];
	    for (let i = 0; i < fieldsets.length; i ++) {
		    //doctors[i - 3] = fieldsets[i].querySelector('legend').innerHTML.trim();
            doctors[i] = fieldsets[i].querySelector('legend').innerText.trim();
    }
    //console.log(doctors);

    let checkboxes = [];
    
    //считываем отмеченных чекбоксами врачей
    //и заполняем массивы checked_*:

    let checkedDoctorsNumbers = [];
    let checkedDoctors = [];
    let checkedTimetable = [];
    let checkedButtons = [];

    for (let i = 0; i < fieldsets.length; i ++) {
        checkboxes[i] = document.getElementById("USEMED" + (i + 1));
        if (checkboxes[i].checked) {
            checkedDoctorsNumbers.push(i);
            checkedDoctors.push(doctors[i]);
            checkedTimetable.push(timetable[i]);
            checkedButtons.push(buttons[i]);

        }
    }

   let adjacencyMatrix = selectCheckedDoctorsInMatrix(originalAdjacencyMatrix, checkboxes);
   
    //считывание окна времени для составления опт. последовательности
    timeStartObj = document.getElementById("TIMEBEGINMULTIVIZIT");
    timeEndObj = document.getElementById("TIMEENDMULTIVIZIT");
    timeStartAttribute = timeStartObj.value.split(":");
    timeEndAttribute = timeEndObj.value.split(":");
   
    startTime = new Date(Number(dateStr[2]),
                         Number(dateStr[1] - 1),
                         Number(dateStr[0]), 
                         timeStartAttribute[0], 
                         timeStartAttribute[1],
                         timeStartAttribute[2]);

    endTime = new Date(Number(dateStr[2]), 
                       Number(dateStr[1] - 1), 
                       Number(dateStr[0]), 
                       timeEndAttribute[0], 
                       timeEndAttribute[1], 
                       timeEndAttribute[2]);



    

    //если количество элементов в хранилище сессии равно количеству врачей
    //то окрашиваем номерки
    if (sessionStorage.length > adjacencyMatrix.length) {
        let selectedButtons = [];
       
        
        for (let i = 0; i < allFieldsets.length; i++) {
            if (allFieldsets[i].querySelector('legend')) {
                //если у fieldset'a найден input, значит, предыдущий fieldset - 
                //- fieldset с выбранными номерками
                if (allFieldsets[i].querySelector('legend').querySelector('input')) {
                    selectedButtons = allFieldsets[i - 1].querySelectorAll('button.buttonsmall');
                    break;
                }
            }
        }




        
        console.log(selectedButtons);

        let selectedDoctors = [];
        //если врач выбран, то из массива doctors добавляем его в массивы selectedDoctors?????
        for (let i = 0; i < selectedButtons.length; i++) {             
            let tempDoc = selectedButtons[i].innerHTML.split(" ");
            selectedDoctors[i] = tempDoc[0] + " " + tempDoc[1] + " " + tempDoc[2];     
        }
        
        console.log(sessionStorage);
        
        
        //doctors и selectedDoctors имеют разный формат!

        //если какой-то из врачей уже выбран, то его номерок выделяться не будет
        for (let i = 0; i < doctors.length; i ++) {
            let flag = false;
            if (checkboxes[i].checked) {
                for (let j = 0; j < selectedDoctors.length; j++) {
                    if (doctors[i] == selectedDoctors[j]) { 
                        flag = true;
                    }
                }//исправить!!!
                if (flag == false) {
                    //console.log("The doctor number " + i + " was not selected");
                    for (let j = 0; j < checkedDoctorsNumbers.length; j++) {
                        if (i == checkedDoctorsNumbers[j]) {
                            //console.log("Doctor number " + i + " is checked!");
                            buttons[i][sessionStorage.getItem("resPath_" + i)].style.background = "red";
                        }
                    }
                }
            }
        }
    } 
    //если последовательность ещё не была составлена 
    //(т.е. sessionStorage пуста и нужно вычислять оптимальную последовательность)
    
    else {
    let attemptCounter = 0;
    let success = false;

    while (attemptCounter <= 5 && !success) {
    //последовательность обхода врачей
    let crawlPath = [];

    console.log("Finding the optimal sequence in the interval from " +
    displayTime(startTime) + " to " + displayTime(endTime));

    crawlPath[0] = [];
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        crawlPath[0][i] = 3*i;
    }    
        
        
        crawlPath[0] = shufflePath(crawlPath[0], startTime, endTime, checkedTimetable);
        
        //продолжительности посещений
        let pathTime = [];
              
        pathTime[0] = travelTime(crawlPath[0], checkedTimetable);
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
            console.log("Initial traversal sequence " + crawlPath[0] +
            " takes time " + displayTime(time) +
            " and has length " + travelLength(crawlPath[0], adjacencyMatrix));
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
            
            crawlPath[i] = changeOneRandom(crawlPath[i - 1], startTime, endTime, checkedTimetable);
                if (crawlPath[i] == null) {
                    //console.log("Подобрать оптимальную последовательность невозможно!");
                    break;
                } else {
                    //console.log("Последовательность обхода на итерации №" + i + ": " + crawlPath[i]);
                    pathTime[i] = travelTime(crawlPath[i], checkedTimetable);
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
            success = true;
            console.log("The optimal sequence of traversal in the interval from " +
            displayTime(startTime) + " to " + displayTime(endTime) + " - " + 
            crawlPath[res] + " takes " + displayTime(new Date(pathTime[res])) +
            ", achieved on iteration " + res + " and has length " + travelLength(crawlPath[res], adjacencyMatrix));
    
            console.log("Crawl sequence:");
            
            docCrawlPath = crawlPath[res].slice();
            


            let strRes = "";
            for (let i = 0; i < docCrawlPath.length; i++) {
                console.log(checkedDoctors[i] + " - " + displayTime(checkedTimetable[i][crawlPath[res][i]]));
                strRes += checkedDoctors[i] + " - " + displayTime(checkedTimetable[i][crawlPath[res][i]]) + "\n";
            }
    
            //alert(strRes);
            //раскрасим все кнопки в цвет по умолчанию 
            for (let i = 0; i < buttons.length; i ++) {
                for (let j = 0; j < buttons[i].length; j ++) {
                    buttons[i][j].style.background = "";
                }
            }
            
            //выделим цветом выбранные номерки
            for (let i = 0; i < adjacencyMatrix.length; i++) {
                    checkedButtons[i][crawlPath[res][i]].style.background = "red";  
            }    
    
            for (let i = 0; i < originalAdjacencyMatrix.length; i++) {
                for (let j = 0; j < checkedDoctorsNumbers.length; j++) {
                    if (i == checkedDoctorsNumbers[j]) {
                        sessionStorage.setItem("resPath_" + i, crawlPath[res][j]);
                    }
                }           
            }       
            console.log(sessionStorage);
        } else {
            console.log("It is impossible to choose the optimal sequence!");
            attemptCounter++;
            if (attemptCounter < 5) {
                console.log("Trying again...");
            } else if (attemptCounter == 5) {
                alert("It is impossible to choose the optimal sequence!");
            }

        }
    }
    }
}














