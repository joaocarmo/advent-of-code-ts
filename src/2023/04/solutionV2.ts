import { cloneDeep } from "lodash"
import type { State } from "."

const solution = (state: State): State => {
  for (const cardId in state.cards) {
    const cards = state.cards[cardId]

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]

      for (const numberWeHave of card.numbersWeHave) {
        if (card.winningNumbers.includes(numberWeHave)) {
          state.cards[cardId][i].numOfMatches++
        }
      }

      for (let j = 1; j <= state.cards[cardId][i].numOfMatches; j++) {
        const nextCardId = parseInt(cardId, 10) + j
        const nextCard = state.cards?.[nextCardId][0]

        if (nextCard) {
          state.cards[nextCardId].push(cloneDeep(nextCard))
        }
      }
    }
  }

  return state
}

export const findSolution = (state: State) => () => {
  const result = solution(state)
  const totalNumOfScratchCards = Object.keys(result.cards).reduce(
    (acc, cardId) => acc + result.cards[cardId].length,
    0,
  )

  console.log({ totalNumOfScratchCards })
}
