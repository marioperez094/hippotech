export function differenceInYears(date) {
  const currentDate = new Date()
  const calcDate = new Date(date)
  return Math.floor((currentDate - calcDate) / 31556952000)
}

export function differenceInDays(date) {
  const currentDate = new Date()
  const calcDate = new Date(date)
  return Math.floor((currentDate - calcDate) / 86400000)
}

export function utcConvert(date) {
  const d = new Date()
  return Date.parse(date) + d.getTimezoneOffset() * 60000
}

export function dateFormat(date) {
  const dateFormat = new Date(date);
  const formattedMinutes = (dateFormat.getMinutes() < 10 ?  '0' : '') + dateFormat.getMinutes()
  return [`${dateFormat.getMonth() + 1}/${dateFormat.getDate()}/${dateFormat.getFullYear()}`, `${dateFormat.getHours()}:${formattedMinutes}`]
}

export function capitalize(string) {
  const capitalString = string[0].toUpperCase().concat(string.slice(1).toLowerCase())
  return capitalString;
}

export function vitalsArrayToChart(vitalsArray, vitalName) {
  const vitals = vitalsArray.filter((vital) => {
    return vital[vitalName]
  }).map((vital) => {
    return (
      { x: vital.service_time, y: vital[vitalName] }
    )
  })
  return vitals;
}

export function arrayToString (list) {
  if (typeof list == 'string') { return list }
  
  let listCopy = [...list]
  listCopy = listCopy.map((item) => {
    return item.name
  }).join(', ');

  return listCopy
}