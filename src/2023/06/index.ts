import { displacement, velocity } from "@/utils/motion"
import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

const ACCELERATION = 1 // mm/ms^2

interface RecordHolder {
  /** Time in milliseconds. */
  time: number
  /** Distance in millimeters. */
  distance: number
}

interface State {
  recordHolders: RecordHolder[]
  timesToWait: number[][]
}

const solution = (state: State): State => {
  for (const recordHolder of state.recordHolders) {
    const { time, distance } = recordHolder
    const availableTimes = Array.from({ length: time }, (_, i) => i)
    const recordHoldertimesToWait: number[] = []

    for (const time of availableTimes) {
      const timeRemaining = recordHolder.time - time
      const v = velocity(0, ACCELERATION, time)
      const d = displacement(0, v, 0, timeRemaining)

      if (d > distance) {
        recordHoldertimesToWait.push(timeRemaining)
      }
    }

    state.timesToWait.push(recordHoldertimesToWait)
  }

  return state
}

const recordHoldersTimes: number[] = []
const recordHoldersDistances: number[] = []
const timeMarker = "Time:"
const distanceMarker = "Distance:"
const markers: [string, number[]][] = [
  [timeMarker, recordHoldersTimes],
  [distanceMarker, recordHoldersDistances],
]
const parseLine = (line: string) => {
  for (const [marker, holder] of markers) {
    if (line.includes(marker)) {
      const [, recordsLine] = line.split(marker)
      const records = recordsLine
        .trim()
        .split(" ")
        .filter((n) => !!n.trim())
        .map((n) => parseInt(n.trim(), 10))

      for (const record of records) {
        holder.push(record)
      }
    }
  }
}

const populateRecordHolders = (
  state: State,
  times: number[],
  distances: number[],
) => {
  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const distance = distances[i]

    state.recordHolders.push({ time, distance })
  }
}

const findSolution = (state: State) => () => {
  populateRecordHolders(state, recordHoldersTimes, recordHoldersDistances)
  recordHoldersTimes.length = 0
  recordHoldersDistances.length = 0

  const result = solution(state)
  const numOfWaysToWin = result.timesToWait.map((times) => times.length)
  const numOfWaysToBeatTheRecord = numOfWaysToWin.reduce(
    (acc, waysToWin) => acc * waysToWin,
    1,
  )

  console.log({ numOfWaysToBeatTheRecord })
}

const main = async () => {
  const state: State = {
    recordHolders: [],
    timesToWait: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine),
    onClose: findSolution(state),
  })
}

export default main
