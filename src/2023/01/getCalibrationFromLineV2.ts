import { isDigit } from "./isDigit"

enum Direction {
  left,
  right,
}

enum NumberEnum {
  zero = "0",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
}

type NumberMap = {
  [key in keyof typeof NumberEnum]: NumberEnum
}

const numberMap: NumberMap = {
  zero: NumberEnum.zero,
  one: NumberEnum.one,
  two: NumberEnum.two,
  three: NumberEnum.three,
  four: NumberEnum.four,
  five: NumberEnum.five,
  six: NumberEnum.six,
  seven: NumberEnum.seven,
  eight: NumberEnum.eight,
  nine: NumberEnum.nine,
}

const MAX_KEY_LENGTH = 5

const getFromSpelled = (
  line: string,
  direction: Direction = Direction.left,
): string | undefined => {
  if (!line.length) {
    return
  }

  const N = line.length
  const K = Math.max(N, MAX_KEY_LENGTH)

  for (let i = 0; i <= K; i++) {
    const key =
      direction === Direction.left
        ? line.slice(0, i + 1)
        : line.slice(N - 1 - i, N)

    if (key in numberMap) {
      return numberMap[key as keyof typeof numberMap]
    }
  }
}

export const getCalibrationFromLine = (line: string): number => {
  const N = line.length
  let calibration: string = ""
  let foundLeftDigit = false
  let foundRightDigit = false

  for (let i = 0; i < N; i++) {
    const leftChar = line[i]
    const leftRest = line.slice(i)
    const rightChar = line[N - 1 - i]
    const rightRest = line.slice(0, N - i)

    if (!foundLeftDigit) {
      if (isDigit(leftChar)) {
        calibration = `${leftChar}${calibration}`
        foundLeftDigit = true
      } else {
        const leftCharFromSpelled = getFromSpelled(leftRest, Direction.left)
        if (leftCharFromSpelled) {
          calibration = `${leftCharFromSpelled}${calibration}`
          foundLeftDigit = true
        }
      }
    }

    if (!foundRightDigit) {
      if (isDigit(rightChar)) {
        calibration = `${calibration}${rightChar}`
        foundRightDigit = true
      } else {
        const rightCharFromSpelled = getFromSpelled(rightRest, Direction.right)
        if (rightCharFromSpelled) {
          calibration = `${calibration}${rightCharFromSpelled}`
          foundRightDigit = true
        }
      }
    }

    // We're looking for a 2-digit number
    if (calibration.length === 2) {
      break
    }
  }

  return parseInt(calibration, 10)
}
