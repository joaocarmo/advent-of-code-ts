import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Direction, Grid, Point, TileType } from "./Grid"

interface State {
  grid: Grid
}

const solution = (state: State) => {
  const startingPoint = new Point(0, 0)
  const [startingDirection] = state.grid.getNextDirection(
    startingPoint,
    Direction.Right,
  )
  state.grid.moveBeam(startingPoint, startingDirection)
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
  solution(state)

  const numOfEnergisedTiles = state.grid.getNumOfEnergisedTiles()

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
