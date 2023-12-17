import { Pattern } from "."

const findReflectionInArray = (arr: string[]): number | null => {
  const N = arr.length

  for (let i = 1; i < N; i++) {
    let isReflection = true

    for (let j = 0; j < Math.min(N - i, i); j++) {
      const leftSide = arr[i - j - 1]
      const rightSide = arr[i + j]

      if (leftSide !== rightSide) {
        isReflection = false
        break
      }
    }

    if (isReflection) {
      return i
    }
  }

  return null
}

export const findReflection = (pattern: Pattern): Pattern => {
  const { rows, columns } = pattern

  const reflectionInRows = findReflectionInArray(rows)
  const reflectionInColumns = findReflectionInArray(columns)
  const reflection = reflectionInRows ?? reflectionInColumns

  return {
    ...pattern,
    reflection,
    reflectionType: reflectionInRows ? "rows" : "columns",
  }
}
