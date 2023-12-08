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
