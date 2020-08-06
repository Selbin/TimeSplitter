# Time splitter
### Splits start and end time stamps to days, weeks and months
## How to use
1. Run npm install time-splitter
2. const timeSplitter = require('time-splitter')
3. const timeObj = timeSplitter(1591332304000, 1622868304000)) <!-- Function takes timestamp as argument -->

#### Output
{ daily:
   [ { start: 1591295400000, end: 1591554599999 },
     { start: 1622485800000, end: 1622917799999 } 
   ],
  weekly: [ { start: 1591554600000, end: 1593541799999 } ],
  monthly: [ { start: 1593541800000, end: 1622485799999 } ] }