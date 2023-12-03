import { isDigit } from "./isDigit"

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
