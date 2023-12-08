import { getHandType } from "./rulesV1"
import { ALL_CARDS_WITHOUT_J, NUM_OF_CARDS_IN_HAND, Type } from "."
import type { Card } from "."

export const cardStrength = (card: Card): number => {
  switch (card) {
    case "A":
      return 14
    case "K":
      return 13
    case "Q":
      return 12
    case "J":
      return 1
    case "T":
      return 10
    default:
      return parseInt(card, 10)
  }
}

export const getHandTypeWithJoker = (cards: Card[]): Type => {
  let currentType = getHandType(cards)

  if (!cards.includes("J") || currentType === Type.FIVE_OF_A_KIND) {
    return currentType
  }

  for (let i = 0; i < NUM_OF_CARDS_IN_HAND; i++) {
    if (cards[i] === "J") {
      for (const card of ALL_CARDS_WITHOUT_J) {
        const newCards = cards.slice()
        newCards[i] = card as Card
        currentType = Math.max(currentType, getHandTypeWithJoker(newCards))
      }
    }
  }

  return currentType
}
