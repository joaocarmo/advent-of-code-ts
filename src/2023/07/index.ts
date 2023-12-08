import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { cardStrength, getHandType } from "./rulesV1"

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

export enum Type {
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
