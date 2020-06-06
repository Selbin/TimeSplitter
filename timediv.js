//  8.64e+7 one day

let weekFlag = false
let dayFlag = false
let monthFlag = false

// Leap year check
const leapyear = (year) => year % 100 === 0 ? year % 400 === 0 : year % 4 === 0

// month parser

const monthSplitter = (startTime, endTime, time) => {
  const startDate = new Date(startTime)
  const month = startDate.getMonth() + 1
  if (!(startDate.getDate() === 1)) return null
  let daysInMonth = 0
  if (month === 2) {
    daysInMonth = leapyear(startDate.getFullYear()) ? 28 * 8.64e+7 : 27 * 8.64e+7
  } else {
    if (month < 8) {
      daysInMonth = month % 2 === 0 ? 29 * 8.64e+7 : 30 * 8.64e+7
    } else {
      daysInMonth = month % 2 === 0 ? 30 * 8.64e+7 : 29 * 8.64e+7
    }
  }
  if (!(endTime - startTime >= daysInMonth)) return null
  weekFlag = false
  dayFlag = false
  if (!monthFlag) {
    monthFlag = true
    time.monthly.push({ start: startTime, end: startTime + daysInMonth + 86399999 })
  } else {
    time.monthly[time.monthly.length - 1].end = startTime + daysInMonth + 86399999
  }
  return startTime + daysInMonth + 86400000
}

// Week parser

const weekSplitter = (startTime, endTime, time) => {
  const startDate = new Date(startTime)
  const month = startDate.getMonth() + 1
  let daysForEnding = 0
  if (month === 2) {
    daysForEnding = leapyear(startDate.getFullYear()) ? 8.64e+7 + 86399999 : 86399999
  } else {
    daysForEnding = month % 2 === 0 ? 2 * 8.64e+7 : 3 * 8.64e+7
  }
  if (!([1, 8, 15, 22].includes(startDate.getDate()))) return null
  if (!(endTime - startTime >= 6 * 8.64e+7)) return null
  dayFlag = monthFlag = false
  if (!weekFlag) {
    weekFlag = true
    time.weekly.push({ start: startTime, end: startTime + 6 * 8.64e+7 + 86399999 })
  } else {
    time.weekly[time.weekly.length - 1].end = startTime + 6 * 8.64e+7 + 86399999
  }
  if (new Date(time.weekly[time.weekly.length - 1].end).getDate() === 28) {
    if (time.weekly[time.weekly.length - 1].end + daysForEnding <= endTime) {
      time.weekly[time.weekly.length - 1].end = time.weekly[time.weekly.length - 1].end + daysForEnding
      return time.weekly[time.weekly.length - 1].end + 1
    }
  }
  return startTime + 6 * 8.64e+7 + 86400000
}

// day parser

const daySplitter = (startTime, endTime, time) => {
  if (!(endTime - startTime >= 86399999)) return null
  weekFlag = monthFlag = false
  if (!dayFlag) {
    dayFlag = true
    time.daily.push({ start: startTime, end: startTime + 86399999 })
  } else {
    time.daily[time.daily.length - 1].end = startTime + 86399999
  }
  return startTime + 86400000
}

// main Function
const timeDivider = (startTime, endTime) => {
  const time = {
    daily: [],
    weekly: [],
    monthly: []
  }
  const startDate = new Date(startTime)
  startTime = startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(endTime)
  endTime = endDate.setHours(23, 59, 59, 999)
  console.log(new Date(startTime), new Date(endTime))
  while (startTime < endTime) {
    startTime = monthSplitter(startTime, endTime, time) || weekSplitter(startTime, endTime, time) || daySplitter(startTime, endTime, time)
  }
  weekFlag = false
  dayFlag = false
  monthFlag = false
  return time
}

module.exports = timeDivider
