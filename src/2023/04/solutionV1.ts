import type { State } from "."

const solution = (state: State): State => {
  for (const cardId in state.cards) {
    const cards = state.cards[cardId]

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]

      for (const numberWeHave of card.numbersWeHave) {
        if (card.winningNumbers.includes(numberWeHave)) {
          state.cards[cardId][i].points =
            2 ** state.cards[cardId][i].numOfMatches
          state.cards[cardId][i].numOfMatches++
        }
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
