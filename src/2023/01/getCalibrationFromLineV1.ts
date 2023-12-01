const isDigit = (char: string): boolean => {
  const code = char.charCodeAt(0)
  // ASCII codes for '0' to '9' are 48 to 57
  return code >= 48 && code <= 57
}

export const getCalibrationFromLine = (line: string): number => {
  const N = line.length
  let calibration: string = ""
  let foundLeftDigit = false
  let foundRightDigit = false

  for (let i = 0; i < N; i++) {
    const leftChar = line[i]
    const rightChar = line[N - 1 - i]

    if (!foundLeftDigit && isDigit(leftChar)) {
      calibration = `${leftChar}${calibration}`
      foundLeftDigit = true
    }

    if (!foundRightDigit && isDigit(rightChar)) {
      calibration = `${calibration}${rightChar}`
      foundRightDigit = true
    }

    // We're looking for a 2-digit number
    if (calibration.length === 2) {
      break
    }
  }

  return parseInt(calibration, 10)
}
