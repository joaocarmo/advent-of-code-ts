export const isDigit = (char: string): boolean => {
  const code = char.charCodeAt(0)
  // ASCII codes for '0' to '9' are 48 to 57
  return code >= 48 && code <= 57
}
