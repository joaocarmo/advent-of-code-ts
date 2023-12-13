import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Grid, UniverseObject } from "./Grid"
import type { UniverseTile } from "./Grid"
import { findUniquePairsOfGalaxies } from "./findUniquePairsOfGalaxies"
import { findShortestPathsBetweenPairsOfGalaxies } from "./findShortestPathsBetweenPairsOfGalaxies"

interface State {
  universe: Grid
}

const solution = (state: State): number[] => {
  state.universe.expand()
  state.universe.findGalaxies()

  const uniquePairsOfGalaxies = findUniquePairsOfGalaxies(
    state.universe.getGalaxies(),
  )
  const shortestPaths = findShortestPathsBetweenPairsOfGalaxies(
    uniquePairsOfGalaxies,
  )

  return shortestPaths
}

let galaxy = 0
const parseLine = (state: State) => (line: string) => {
  state.universe.addRow(
    line.split("").map(
      (type) =>
        ({
          type,
          galaxy: type === UniverseObject.Galaxy ? ++galaxy : null,
        }) as UniverseTile,
    ),
  )
}

const findSolution = (state: State) => () => {
  const shortestPaths = solution(state)
  const sumOfShortestPaths = shortestPaths.reduce(
    (sum, shortestPath) => sum + shortestPath,
    0,
  )

  console.log({ sumOfShortestPaths })
}

const main = async () => {
  const state: State = {
    universe: new Grid(),
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
