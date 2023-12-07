export const parseRecords = (line: string): number[] =>
  line
    .trim()
    .split(" ")
    .filter((n) => !!n.trim())
    .map((n) => parseInt(n.trim(), 10))
