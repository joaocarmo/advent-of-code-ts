import type { Game, State } from "."

const bag: Game = {
  red: 12,
  green: 13,
  blue: 14,
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

export const solution = (state: State): State => {
  const gameIds = Object.keys(state)

  for (const gameId of gameIds) {
    state[gameId].isPossible = !state[gameId].games.some(
      (game) => !isGamePossible(game),
    )
  }

  return state
}
