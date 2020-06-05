//  8.64e+7 one day

// structure

const time = {
  daily: { ds: [], de: [] },
  weekly: { ws: [], we: [] },
  monthly: { ms: [], me: [] }
}

// Leap year check
const leapyear = (year) => year % 100 === 0 ? year % 400 === 0 : year % 4 === 0

// month parser

const monthSplitter = (startTime, endTime) => {
  const startDate = new Date(startTime)
  const month = startDate.getMonth() + 1
  if (!(startDate.getDate() === 1)) return null
  let daysInMonth = 0
  if (month === 2) {
    daysInMonth = leapyear(startDate.getFullYear()) ? 28 * 8.64e+7 : 27 * 8.64e+7
  } else {
    daysInMonth = month % 2 === 0 ? 29 * 8.64e+7 : 30 * 8.64e+7
  }
  if (!(endTime - startTime >= daysInMonth)) return null
  time.monthly.ms.push(startTime)
  time.monthly.me.push(startTime + daysInMonth + 86399999)
  return startTime + daysInMonth + 86400000
}

// Week parser

const weekSplitter = (startTime, endTime) => {
  const startDate = new Date(startTime)
  if (startDate.getDay()) return null
  if (!(endTime - startTime >= 6 * 8.64e+7)) return null
  time.weekly.ws.push(startTime)
  time.weekly.we.push(startTime + 6 * 8.64e+7 + 86399999)
  return startTime + 6 * 8.64e+7 + 86400000
}

// day parser

const daySplitter = (startTime, endTime) => {
  if (!(endTime - startTime >= 86399999)) return null
  time.daily.ds.push(startTime)
  time.daily.de.push(startTime + 86399999)
  return startTime + 86400000
}

// main Function
const timeDivider = (startTime, endTime) => {
  const startDate = new Date(startTime)
  startTime = startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(endTime)
  endTime = endDate.setHours(23, 59, 59, 999)
  while (startTime < endTime) {
    startTime = monthSplitter(startTime, endTime) || weekSplitter(startTime, endTime) || daySplitter(startTime, endTime)
  }
  join(time.daily.ds, time.daily.de, time.weekly.ws, time.weekly.we, time.monthly.ms, time.monthly.me)
  return time
}

// join start and ends
const join = (ds, de, ws, we, ms, me) => {
  if (ds) {
    time.daily.ds = ds[0]
    time.daily.de = de[de.length - 1]
  }
  if (ws) {
    time.weekly.ws = ws[0]
    time.weekly.we = we[we.length - 1]
  }
  if (ms) {
    time.monthly.ms = ms[0]
    time.monthly.me = me[me.length - 1]
  }
}

module.exports = timeDivider
