import { get } from "lodash"
import { Type } from "."
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
      return 11
    case "T":
      return 10
    default:
      return parseInt(card, 10)
  }
}

export const getHandType = (cards: Card[]): Type => {
  const cardCount = cards.reduce((acc, card) => {
    const count = get(acc, card, 0)

    return {
      ...acc,
      [card]: count + 1,
    }
  }, {})

  const cardCountValues = Object.values<number>(cardCount).sort((a, b) => b - a)

  if (cardCountValues[0] === 5) {
    return Type.FIVE_OF_A_KIND
  }

  if (cardCountValues[0] === 4) {
    return Type.FOUR_OF_A_KIND
  }

  if (cardCountValues[0] === 3 && cardCountValues[1] === 2) {
    return Type.FULL_HOUSE
  }

  if (cardCountValues[0] === 3) {
    return Type.THREE_OF_A_KIND
  }

  if (cardCountValues[0] === 2 && cardCountValues[1] === 2) {
    return Type.TWO_PAIR
  }

  if (cardCountValues[0] === 2) {
    return Type.ONE_PAIR
  }

  return Type.HIGH_CARD
}
