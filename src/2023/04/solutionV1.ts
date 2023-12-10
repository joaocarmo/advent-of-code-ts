import type { State } from "."

const solution = (state: State): State => {
  for (const cardId in state.cards) {
    const card = state.cards[cardId][0]

    for (const numberWeHave of card.numbersWeHave) {
      if (card.winningNumbers.includes(numberWeHave)) {
        state.cards[cardId][0].points = 2 ** state.cards[cardId][0].numOfMatches
        state.cards[cardId][0].numOfMatches++
      }
    }
  }

  return state
}

export const findSolution = (state: State) => () => {
  const result = solution(state)
  const totalPoints = Object.values(result.cards).reduce(
    (acc, card) => acc + card[0].points,
    0,
  )

  console.log({ totalPoints })
}
