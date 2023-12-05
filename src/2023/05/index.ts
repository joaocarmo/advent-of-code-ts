import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

type Seed = number

type Category = string

interface Mapped {
  source: Category
  destination: Category
  sourceRangeStart: number
  destinationRangeStart: number
  rangeLength: number
}

interface Path {
  seed: Seed
  [key: Category]: number
}

interface State {
  seeds: Seed[]
  maps: Mapped[]
  paths: Path[]
}

const getCategoryNumberFromMappings = (
  currentCategoryNumber: number,
  currentMappings: Mapped[],
): number => {
  const currentMapping = currentMappings.find(
    (m) =>
      currentCategoryNumber >= m.sourceRangeStart &&
      currentCategoryNumber <= m.sourceRangeStart + m.rangeLength,
  )

  if (!currentMapping) {
    return currentCategoryNumber
  }

  const { sourceRangeStart, destinationRangeStart, rangeLength } =
    currentMapping

  return (
    destinationRangeStart +
    ((currentCategoryNumber - sourceRangeStart) % rangeLength)
  )
}

const solution = (state: State): State => {
  for (const seed of state.seeds) {
    const path: Path = {
      seed,
    }

    let currentCategory = "seed"
    let currentCategoryNumber = seed

    while (currentCategory !== "location") {
      const currentMappings = state.maps.filter(
        (m) => m.source === currentCategory,
      )

      currentCategory = currentMappings[0].destination
      currentCategoryNumber = getCategoryNumberFromMappings(
        currentCategoryNumber,
        currentMappings,
      )
      path[currentCategory] = currentCategoryNumber
    }

    state.paths.push(path)
  }

  return state
}

let source: Category = ""
let destination: Category = ""
const parseLine = (state: State) => (line: string) => {
  if (line.includes("seeds")) {
    const [, seeds] = line.split(":")
    state.seeds = seeds
      .split(" ")
      .filter((n) => !!n.trim())
      .map((seed) => parseInt(seed))
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
