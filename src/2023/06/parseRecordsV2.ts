export const parseRecords = (line: string): number[] => [
  parseInt(
    line
      .trim()
      .split(" ")
      .filter((n) => !!n.trim())
      .join(""),
    10,
  ),
]
