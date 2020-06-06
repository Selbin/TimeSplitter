//  8.64e+7 one day
let weekFlag = false
let dayFlag = false
let monthFlag = false

const skipDay = 8.64e+7
const skipWeek = 6 * skipDay

/**
 * Main function
 * Returns time object
 *
 * @param {number} startTime
 * @param {number} endTime
 */

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
  while (startTime < endTime) {
    startTime = _monthSplitter(startTime, endTime, time) || _weekSplitter(startTime, endTime, time) || _daySplitter(startTime, endTime, time)
  }
  weekFlag = false
  dayFlag = false
  monthFlag = false
  return time
}

/**
 * Month parser
 * Returns updated startTime
 *
 * @param {number} startTime
 * @param {number} endTime
 * @param {{daily: array, weekly: array, monthly: array}} time
 */

const _monthSplitter = (startTime, endTime, time) => {
  const startDate = new Date(startTime)
  const month = startDate.getMonth() + 1
  if (!(startDate.getDate() === 1)) return null
  const monthSkip = (new Date(startDate.getFullYear(), month, 0).getDate() - 1) * 8.64e+7
  if (!_isTimeIncluded(startTime, endTime, monthSkip)) return null
  weekFlag = false
  dayFlag = false
  if (!monthFlag) {
    monthFlag = true
    time.monthly.push({ start: startTime, end: startTime + monthSkip + skipDay - 1 })
  } else {
    time.monthly[time.monthly.length - 1].end = startTime + monthSkip + skipDay - 1
  }
  return startTime + monthSkip + skipDay
}

/**
 * Week parser
 * Returns updated startTime
 *
 * @param {number} startTime
 * @param {number} endTime
 * @param {{daily: array, weekly: array, monthly: array}} time
 */

const _weekSplitter = (startTime, endTime, time) => {
  const startDate = new Date(startTime)
  const month = startDate.getMonth() + 1
  const lastDay = new Date(startDate.getFullYear(), month, 0).getDate()
  const remainingDays = lastDay - 28 ? ((lastDay - 28) * skipDay) : skipDay - 1
  const weekStart = [1, 8, 15, 22] // week should start with following
  if (!(weekStart.includes(startDate.getDate()))) return null
  if (!_isTimeIncluded(startTime, endTime, skipWeek)) return null
  dayFlag = monthFlag = false
  if (!weekFlag) {
    weekFlag = true
    time.weekly.push({ start: startTime, end: startTime + skipWeek + skipDay - 1 })
  } else {
    time.weekly[time.weekly.length - 1].end = startTime + skipWeek + skipDay - 1
  }
  if (new Date(time.weekly[time.weekly.length - 1].end).getDate() === 28) { // special case add remaining days
    if (time.weekly[time.weekly.length - 1].end + remainingDays <= endTime) {
      time.weekly[time.weekly.length - 1].end = time.weekly[time.weekly.length - 1].end + remainingDays
      return time.weekly[time.weekly.length - 1].end + 1
    }
  }
  return startTime + skipWeek + skipDay
}

/**
 * Day parser
 * Returns updated startTime
 *
 * @param {number} startTime
 * @param {number} endTime
 * @param {{daily: array, weekly: array, monthly: array}} time
 */

const _daySplitter = (startTime, endTime, time) => {
  if (!_isTimeIncluded(startTime, endTime, skipDay - 1)) return null
  weekFlag = monthFlag = false
  if (!dayFlag) {
    dayFlag = true
    time.daily.push({ start: startTime, end: startTime + skipDay - 1 })
  } else {
    time.daily[time.daily.length - 1].end = startTime + skipDay - 1
  }
  return startTime + skipDay
}

const _isTimeIncluded = (startTime, endTime, time) => endTime - startTime >= time

timeDivider(1581145671000, 1582960071000)

module.exports = timeDivider
