import { Timestamp } from 'firebase/firestore'

export const useTimestamp = (timestamp: Timestamp): string => {
  // Convert the Timestamp to a Date object
  const date = timestamp.toDate()

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12

  return `${day} ${month} ${year} | ${formattedHours}:${minutes} ${ampm}`
}
