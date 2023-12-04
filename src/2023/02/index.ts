import { extractNumber } from "@/utils/extractNumber"
import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlackLine, readFileLine } from "@/utils/readFile"
import { findSolution } from "./solutionV2"

type GameId = number | string

export interface Game {
  red: number
  green: number
  blue: number
}

interface GameResult {
  games: Game[]
  isPossible: boolean
  minPossibleSet: Game
  power: number
}

export interface State {
  [key: GameId]: GameResult
}

const getColor = (color: string): keyof Game => {
  switch (color) {
    case "red":
      return "red"
    case "green":
      return "green"
    case "blue":
      return "blue"
    default:
      throw new Error(`Unknown color: ${color}`)
  }
}

const parseGame = (gameResult: string): Game => {
  const game: Game = {
    red: 0,
    green: 0,
    blue: 0,
  }

  const results = gameResult.split(",")

  for (const result of results) {
    const [value, color] = result.trim().split(" ")
    const colorKey = getColor(color.trim())
    const colorValue = extractNumber(value)

    if (!colorValue) {
      continue
    }

    game[colorKey] = colorValue
  }

  return game
}

const parseLine = (state: State) => (line: string) => {
  const [gameFullId, gameIterations] = line.split(":")
  const gameId = extractNumber(gameFullId)

  if (!gameId) {
    return
  }

  state[gameId] = {
    games: gameIterations.split(";").map(parseGame),
    isPossible: false,
    minPossibleSet: {
      red: 0,
      green: 0,
      blue: 0,
    },
    power: 0,
  }
}

const main = async () => {
  const state: State = {}
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlackLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
