import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Grid, TileType } from "./Grid"
import { solution } from "./solutionV2"

export interface State {
  grid: Grid
}

const parseLine = (state: State) => (line: string) => {
  state.grid.addRow(
    line.split("").map((tileType) => {
      const tile = {
        beams: [],
      }

      switch (tileType) {
        case TileType.Empty:
          return { ...tile, type: TileType.Empty }
        case TileType.ForwardMirror:
          return { ...tile, type: TileType.ForwardMirror }
        case TileType.BackwardMirror:
          return { ...tile, type: TileType.BackwardMirror }
        case TileType.VerticalSplitter:
          return { ...tile, type: TileType.VerticalSplitter }
        case TileType.HoritonzalSplitter:
          return { ...tile, type: TileType.HoritonzalSplitter }
        default:
          throw new Error(`Unknown tile type: ${tile}`)
      }
    }),
  )
}

const findSolution = (state: State) => () => {
  const numOfEnergisedTiles = solution(state)

  console.log(JSON.stringify({ numOfEnergisedTiles }, null, 2))
}

const main = async () => {
  const state: State = {
    grid: new Grid(),
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
