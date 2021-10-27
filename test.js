let timeTable = new Array(40);
for (let i = 0; i < timeTable.length; i ++) {
    //у каждого врача 40 номерков с 8 до 17:45

    timeTable[i] = new Date(2021, 9, 18, 5, i * 15);
}

console.log(timeTable);

let startTime = new Date(2021, 9, 18, 6, 0);
let endTime = new Date(2021, 9, 18, 8, 0);


for (let i = 0; i < timeTable.length; i++) {
    if (timeTable[i] > endTime) {
        
        console.log(endTime + " < " + timeTable[i] + " конечное время меньше!");
        
        timeTable.splice(i, 1);
        i--;


    } else if (timeTable[i] < startTime) {
        console.log(timeTable[i] + " < " + startTime + " начальное время больше!");
        timeTable.splice(i, 1);
        i--;
        
    }
    else {
        console.log(timeTable[i] + " подходит");
    }

}


console.log(timeTable);