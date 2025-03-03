export const formatDateToISO = (date: string) => {
  // Converte DD/MM/AAAA para YYYY-MM-DD
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

export const formatDateToBR = (isoDate: string) => {
  // Converte ISO para DD/MM/AAAA considerando UTC
  const date = new Date(isoDate)
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

  return utcDate.toLocaleDateString('pt-BR', {
    timeZone: 'UTC'
  })
} 