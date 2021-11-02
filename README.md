 # Simulated annealing method #
 
 Implementation of the metal annealing method for making the optimal sequence of visits to doctors in the polyclinic.

## Problem description ##

 The distances between the cabinets are set using the adjacency matrix:

![\begin{pmatrix}
0 & 3 & 4 & 1 & 1\\
3 & 0 & 1 & 3 & 1\\
4 & 1 & 0 & 1 & 1\\
1 & 3 & 1 & 0 & 1\\
1 & 1 & 1 & 1 & 0
\end{pmatrix}](https://latex.codecogs.com/gif.latex?%5Clarge%20%5Cbegin%7Bpmatrix%7D%200%20%26%203%20%26%204%20%26%201%20%26%201%5C%5C%203%20%26%200%20%26%201%20%26%203%20%26%201%5C%5C%204%20%26%201%20%26%200%20%26%201%20%26%201%5C%5C%201%20%26%203%20%26%201%20%26%200%20%26%201%5C%5C%201%20%26%201%20%26%201%20%26%201%20%26%200%20%5Cend%7Bpmatrix%7D)

Then, for example, the distance between cabinets 0 and 1 is 3.  

Each of the 5 doctors has 40 free time slots to visit from 8 am to 5:45 pm:

    let timetable = new Array(5);
    for (let i = 0; i < timetable.length; i ++) {
        timetable[i] = new Array(40);
        for (let j = 0; j < timetable[i].length; j++) {
          timetable[i][j] = new Date(2021, 9, 18, 8, j * 15);
        }   
    }

You also set the time interval for which you need to choose the optimal sequence of visits (In this case, it is 8 am and 12:30 am on October 18):

    startTime = new Date(2021, 9, 18, 8, 0);
    endTime = new Date(2021, 9, 18, 12, 30);
    simulatedAnnealingMethod(crawlPath, startTime, endTime);   

## Algorithm description ##
### Iteration 0 ###

The current temperature is `100`.

At the zero iteration of the algorithm, a sequence of visits to doctors `crawlPath[0]` is randomly compiled. The selected time interval and the time of the doctor's visit (30 minutes) are taken into account. You cannot select a visit time earlier than `startTime`, later than `endTime`, or closer than 30 minutes before or after another visit.

Let's say `crawlPath[0] = [2, 10, 0, 6, 4]`. This means that the second doctor is visited first at his zero time slot. Next, the zero doctor is visited in his second time slot and so on. 

The distance `pathLength[0]` the patient will travel is 9 units and the time `pathTime[0]` spent on these visits is two and a half hours (9000000 ms). 

Difficulty function:

    difficulty[0] = pathTime[0] + pathLength[0] * difficultyFactor;

Where difficultyFactor is a constant set depending on the patient's mobility (Here it is `700000`).

    difficulty[0] = 9000000 + 9 * 700000 = 15300000 

At the end of the each iteration, we reduce the temperature:

    temperature = temprature * 0.999;

### Iteration 1 ###

The current temperature is `99.9`.

At the first iteration of the algorithm, in the visit sequence `crawlPath[0]`, one doctor's visit time changes randomly. The selected time interval and the time of the doctor's visit (30 minutes) are also taken into account.

    crawlPath[1] = [2,10,8,6,4]
    pathLength[1] = 4
    pathTime[1] = 7200000 ms
    difficulty[1] = 7200000 + 4 * 700000 = 10000000

`difficulty[0] > difficulty[1]`, so we accept this sequence of visits and also reduce the temperature:

    temperature = temprature * 0.999;

### Iteration 2 ###

The current temperature is `99.8001`.

    crawlPath[2] = [2,10,8,6,4]
    pathLength[1]2] = 4
    pathTime[2] = 9000000 ms
    difficulty[2] = 9000000 + 4 * 700000 = 11800000

`difficulty[1] < difficulty[2]`, but we do not discard the sequence crawlPath[2], but calculate a special value:

![p = 100\cdot e^{\frac{difficulty[1] - difficulty[2]}{10000000 * temperature}}](https://latex.codecogs.com/gif.latex?%5CLARGE%20p%20%3D%20100%5Ccdot%20e%5E%7B%5Cfrac%7Bdifficulty%5B1%5D%20-%20difficulty%5B2%5D%7D%7B10000000%20*%20temperature%7D%7D)

![p = 100 \cdot e^{\frac{10000000 - 11800000}{99.8001 \cdot 10000000}} \approx 99.8198020](https://latex.codecogs.com/gif.latex?%5CLARGE%20p%20%3D%20100%20%5Ccdot%20e%5E%7B%5Cfrac%7B10000000%20-%2011800000%7D%7B99.8001%20%5Ccdot%2010000000%7D%7D%20%5Capprox%2099.8198020)











 







