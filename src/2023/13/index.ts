import { parseArgs } from "@/utils/parseArgs"
import { readFileLine } from "@/utils/readFile"
import { calculateColumnsFromRows } from "./calculateColumnsFromRows"
import { findReflection } from "./findReflection"

export interface Pattern {
  rows: string[]
  columns: string[]
  reflection: number | null
  reflectionType: "rows" | "columns" | null
}

interface State {
  patterns: Pattern[]
}

const solution = (state: State): number => {
  state.patterns = state.patterns.map(calculateColumnsFromRows)
  state.patterns = state.patterns.map(findReflection)

  const summary = state.patterns.reduce(
    (acc, { reflection, reflectionType }) => {
      if (!reflection || !reflectionType) {
        return acc
      }

      const reflectionValue =
        reflectionType === "rows" ? reflection * 100 : reflection

      return acc + reflectionValue
    },
    0,
  )

  return summary
}

const parseLine = (state: State) => (line: string) => {
  const trimmedLine = line.trim()
  const N = state.patterns.length
  const lastPattern = state.patterns[N - 1]

  if (!trimmedLine) {
    state.patterns.push({
      rows: [],
      columns: [],
      reflection: null,
      reflectionType: null,
    })
  } else if (!lastPattern) {
    state.patterns.push({
      rows: [line],
      columns: [],
      reflection: null,
      reflectionType: null,
    })
  } else {
    state.patterns[N - 1].rows.push(line)
  }
}

const findSolution = (state: State) => () => {
  const result = solution(state)

  console.log({ result })
}

const main = async () => {
  const state: State = {
    patterns: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: parseLine(state),
    onClose: findSolution(state),
  })
}

export default main
