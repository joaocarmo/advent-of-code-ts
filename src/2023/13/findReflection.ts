import { Pattern } from "."

const findReflectionInArray = (arr: string[]): number | null => {
  const N = arr.length
  let reflection: number | null = null

  for (let i = 0; i < N; i++) {
    let isReflection = true

    for (let j = 0; j < Math.floor(N / 2); j++) {
      const leftIndex = i - j - 1
      const rightIndex = i + j
      const row1 = arr[leftIndex]
      const row2 = arr[rightIndex]

      if (row1 !== row2) {
        isReflection = false
        break
      }
    }

    if (isReflection) {
      reflection = i
    }
  }

  return reflection
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
