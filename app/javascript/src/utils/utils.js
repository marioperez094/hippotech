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