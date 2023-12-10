import { extractNumber } from "@/utils/extractNumber"
import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

type CardId = string | number

interface Card {
  winningNumbers: number[]
  numbersWeHave: number[]
  numOfMatches: number
  points: number
}

interface State {
  cards: {
    [key: CardId]: Card
  }
}

const solution = (state: State): State => {
  for (const cardId in state.cards) {
    const card = state.cards[cardId]

    for (const numberWeHave of card.numbersWeHave) {
      if (card.winningNumbers.includes(numberWeHave)) {
        state.cards[cardId].points = 2 ** state.cards[cardId].numOfMatches
        state.cards[cardId].numOfMatches++
      }
    }
  }

  return state
}

const parseLine = (state: State) => (line: string) => {
  const [cardId, numbers] = line.split(":")
  const [winningNumbers, numbersWeHave] = numbers.split("|")
  state.cards[extractNumber(cardId)!] = {
    winningNumbers: winningNumbers
      .split(" ")
      .filter((n) => !!n.trim())
      .map(Number),
    numbersWeHave: numbersWeHave
      .split(" ")
      .filter((n) => !!n.trim())
      .map(Number),
    numOfMatches: 0,
    points: 0,
  }
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const totalPoints = Object.values(result.cards).reduce(
    (acc, card) => acc + card.points,
    0,
  )

  console.log({ totalPoints })
}

const main = async () => {
  const state: State = {
    cards: {},
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
