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
\end{pmatrix}](https://latex.codecogs.com/gif.latex?%5CLARGE%20%5Cbegin%7Bpmatrix%7D%200%20%26%203%20%26%204%20%26%201%20%26%201%5C%5C%203%20%26%200%20%26%201%20%26%203%20%26%201%5C%5C%204%20%26%201%20%26%200%20%26%201%20%26%201%5C%5C%201%20%26%203%20%26%201%20%26%200%20%26%201%5C%5C%201%20%26%201%20%26%201%20%26%201%20%26%200%20%5Cend%7Bpmatrix%7D)

Then, for example, the distance between cabinets 0 and 1 is 3.  

Each of the 5 doctors has 40 free slots to visit from 8 am to 5:45 pm:

    let timetable = new Array(5);
    for (let i = 0; i < timetable.length; i ++) {
        timetable[i] = new Array(40);
        for (let j = 0; j < timetable[i].length; j++) {
          timetable[i][j] = new Date(2021, 9, 18, 8, j * 15);
        }   
    }

You also set the time interval for which you need to choose the optimal sequence of visits (In this case, it is 8 am and 10:30 am on October 18):

    startTime = new Date(2021, 9, 18, 8, 0);
    endTime = new Date(2021, 9, 18, 10, 30);
    simulatedAnnealingMethod(crawlPath, startTime, endTime);   

