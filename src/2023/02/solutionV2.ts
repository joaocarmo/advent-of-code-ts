import type { State } from "."

export const solution = (state: State): State => {
  const gameIds = Object.keys(state)

  for (const gameId of gameIds) {
    state[gameId].minPossibleSet = {
      red: Math.max(...state[gameId].games.map((game) => game.red)),
      green: Math.max(...state[gameId].games.map((game) => game.green)),
      blue: Math.max(...state[gameId].games.map((game) => game.blue)),
    }
    state[gameId].power =
      state[gameId].minPossibleSet.red *
      state[gameId].minPossibleSet.green *
      state[gameId].minPossibleSet.blue
  }

  return state
}

export const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumGamePowers = Object.keys(result).reduce(
    (acc, gameId) => acc + state[gameId].power,
    0,
  )

  console.log({ sumGamePowers })
}
