import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

interface Report {
  sequence: number[]
  differences: Report | null
  nextValue: number | null
}

interface State {
  reports: Report[]
}

const areAllDifferencesZero = (differences: number[]) =>
  differences.every((diff) => diff === 0)

const findDifferences = (report: Report): Report => {
  const differences: number[] = []

  for (let i = 0; i < report.sequence.length - 1; i++) {
    const diff = report.sequence[i + 1] - report.sequence[i]

    differences.push(diff)
  }

  report.differences = {
    sequence: differences,
    differences: null,
    nextValue: null,
  }

  if (!areAllDifferencesZero(differences)) {
    report.differences.differences = findDifferences(report.differences)
  }

  return report.differences
}

const findNextValue = (report: Report | null): number => {
  if (!report?.differences) {
    return 0
  }

  if (!report.differences.nextValue) {
    report.differences.nextValue = findNextValue(report.differences)
  }

  report.nextValue =
    report.sequence[report.sequence.length - 1] + report.differences.nextValue
  return report.nextValue
}

const solution = (state: State): State => {
  state.reports.forEach(findDifferences)
  state.reports.forEach(findNextValue)

  return state
}

const parseLine = (state: State) => (line: string) => {
  state.reports.push({
    sequence: line.split(" ").map((n) => parseInt(n, 10)),
    differences: null,
    nextValue: null,
  })
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumOfAllPredictions = result.reports.reduce(
    (acc, report) => acc + (report.nextValue ?? 0),
    0,
  )

  console.log({ sumOfAllPredictions })
}

const main = async () => {
  const state: State = {
    reports: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
