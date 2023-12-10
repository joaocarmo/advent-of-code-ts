import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { parseSeeds } from "./parseSeedsV2"
import { solution } from "./solutionV1"

export interface Seed {
  seedRangeStart: number
  seedRangeLength: number
}

export type Category = string

export interface Mapped {
  source: Category
  destination: Category
  sourceRangeStart: number
  destinationRangeStart: number
  rangeLength: number
}

export interface Path {
  seed: number
  [key: Category]: number
}

export interface State {
  seeds: Seed[]
  maps: Mapped[]
  paths: Path[]
}

let source: Category = ""
let destination: Category = ""
const parseLine = (state: State) => (line: string) => {
  if (line.includes("seeds")) {
    const [, seeds] = line.split(":")
    state.seeds = parseSeeds(seeds)
  } else if (line.includes("map")) {
    const [mapName] = line.split(" ")
    const [currentSource, currentDestination] = mapName.split("-to-")
    source = currentSource
    destination = currentDestination
  } else {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line
      .split(" ")
      .filter((n) => !!n.trim())
      .map((n) => parseInt(n))
    state.maps.push({
      source,
      destination,
      sourceRangeStart,
      destinationRangeStart,
      rangeLength,
    })
  }
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const lowersLocationNumber = Math.min(...result.paths.map((p) => p.location))

  console.log({ lowersLocationNumber })
}

const main = async () => {
  const state: State = {
    seeds: [],
    maps: [],
    paths: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
