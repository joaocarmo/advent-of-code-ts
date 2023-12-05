export const filterValuesAppearingTwice = <T>(
  arr: T[],
  valueGetter: (value: T) => string | number,
): T[] => {
  const frequencyMap = arr.reduce(
    (acc, currentValue: T) => {
      const value = valueGetter(currentValue)
      acc[value] = (acc[value] || 0) + 1
      return acc
    },
    {} as Record<string | number, number>,
  )

  return arr.filter((value) => frequencyMap[valueGetter(value)] === 2)
}
