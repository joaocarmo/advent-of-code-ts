import { extractNumber } from "@/utils/extractNumber"
import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlackLine, readFileLine } from "@/utils/readFile"

type GameId = number | string

interface Game {
  red: number
  green: number
  blue: number
}

interface GameResult {
  isPossible: boolean
  games: Game[]
}

interface State {
  [key: GameId]: GameResult
}

const bag: Game = {
  red: 12,
  green: 13,
  blue: 14,
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

const isGamePossible = (game: Game): boolean => {
  if (game.red > bag.red) {
    return false
  }

  if (game.green > bag.green) {
    return false
  }

  if (game.blue > bag.blue) {
    return false
  }

  return true
}

const solution = (state: State): State => {
  const gameIds = Object.keys(state)

  for (const gameId of gameIds) {
    state[gameId].isPossible = !state[gameId].games.some(
      (game) => !isGamePossible(game),
    )
  }

  return state
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
    isPossible: false,
    games: gameIterations.split(";").map(parseGame),
  }
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumPossibleGameIds = Object.keys(result).reduce(
    (acc, gameId) =>
      result[gameId].isPossible ? acc + parseInt(gameId, 10) : acc,
    0,
  )

  console.log({ sumPossibleGameIds })
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
