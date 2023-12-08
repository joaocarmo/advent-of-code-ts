import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { get } from "lodash"
import { cardStrength } from "./cardStrengthV1"

const NUM_OF_CARDS_IN_HAND = 5

export type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"

enum Type {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

interface Hand {
  key: string
  cards: Card[]
  type: Type
  bid: number
  rank: number
}

interface State {
  hands: Hand[]
}

const getHandType = (cards: Card[]): Type => {
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

const solution = (state: State): State => {
  state.hands
    .sort((a, b) => {
      if (a.type === b.type) {
        for (let i = 0; i < NUM_OF_CARDS_IN_HAND; i++) {
          if (a.cards[i] !== b.cards[i]) {
            return cardStrength(a.cards[i]) - cardStrength(b.cards[i])
          }
        }
      }

      return a.type - b.type
    })
    .forEach((hand, index) => {
      hand.rank = index + 1
    })

  return state
}

const parseLine = (state: State) => (line: string) => {
  const [hand, bid] = line.split(" ")
  const cards = hand.split("") as Card[]
  const bidNumber = parseInt(bid, 10)

  state.hands.push({
    key: hand,
    cards,
    bid: bidNumber,
    type: getHandType(cards),
    rank: 0,
  })
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const totalWinnings = result.hands.reduce((acc, hand) => {
    return acc + hand.bid * hand.rank
  }, 0)

  console.log({ totalWinnings })
}

const main = async () => {
  const state: State = {
    hands: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
