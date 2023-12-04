/**
 * Extracts the first number from a string.
 */
export const extractNumber = (str: string): number | null => {
  const matches = str.match(/\d+/)

  if (matches && matches[0]) {
    return parseInt(matches[0], 10)
  }

  return null
}
