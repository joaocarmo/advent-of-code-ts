import { Pattern } from "."

export const calculateColumnsFromRows = (
  patternWithoutColumns: Pattern,
): Pattern => {
  const { rows } = patternWithoutColumns
  const N = rows[0].length
  const columns: string[] = []

  for (let i = 0; i < N; i++) {
    columns.push(rows.reduce((acc, row) => acc + row[i], ""))
  }

  return {
    ...patternWithoutColumns,
    columns,
  }
}
