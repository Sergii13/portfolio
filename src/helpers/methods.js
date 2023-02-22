export const uppercaseFirstSymbol = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const lowercaseFirstSymbol = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}
export const chunk = (arr, size) => {
  const result = []
  if (arr.length <= size) {
    result.push(arr)
  } else {
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
  }

  return result
}
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (dateValue) => {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const day = date.getDate()
  const month = months[date.getMonth()]
  return `${day} ${month} / ${year} year`
}
