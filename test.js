const timeDivider = require('./timediv.js')

// test cases
// 5 jun 20 - 5 jun 21
// 1 july 20 - 31 july 20
// 17 jun 20 - 17 july 20
// 30 hun 20 - 16 sep 20
// 8 jun 20 - 10 jun 20

const result = [{
  daily: [{ start: 1591295400000, end: 1591554599999 }, { start: 1622485800000, end: 1622917799999 }],
  weekly: [{ start: 1591554600000, end: 1593541799999 }],
  monthly: [{ start: 1593541800000, end: 1622485799999 }]
},
{
  daily: [],
  weekly: [],
  monthly: [{ start: 1593541800000, end: 1596220199999 }]
},
{
  daily: [{ start: 1592332200000, end: 1592764199999 }, { start: 1594751400000, end: 1595010599999 }],
  weekly: [{ start: 1592764200000, end: 1594751399999 }],
  monthly: []
},
{
  daily: [{ start: 1593455400000, end: 1593541799999 }, { start: 1600108200000, end: 1600280999999 }],
  weekly: [{ start: 1598898600000, end: 1600108199999 }],
  monthly: [{ start: 1593541800000, end: 1598898599999 }]
},
{
  daily: [{ start: 1591554600000, end: 1591813799999 }],
  weekly: [],
  monthly: []
},
{
  daily: [],
  weekly: [{ start: 1581100200000, end: 1583000999999 }],
  monthly: []
},
{
  daily: [],
  weekly: [{ start: 1549564200000, end: 1551378599999 }],
  monthly: []
}]

const startArr = [1591332304000, 1593578411000, 1592371368000, 1593494568000, 1591593768000, 1581145671000, 1549564200000]
const endArr = [1622868304000, 1596170586000, 1594963368000, 1600233768000, 1591766568000, 1582960071000, 1551335399000]
for (let i = 0; i < startArr.length; i++) {
  console.log(JSON.stringify(timeDivider(startArr[i], endArr[i])) === JSON.stringify(result[i]))
  console.log(timeDivider(startArr[i], endArr[i]))
}
