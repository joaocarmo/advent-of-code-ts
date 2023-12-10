import { extractNumber } from "@/utils/extractNumber"
import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { findSolution } from "./solutionV2"

type CardId = string | number

interface Card {
  winningNumbers: number[]
  numbersWeHave: number[]
  numOfMatches: number
  points: number
}

export interface State {
  cards: {
    [key: CardId]: Card[]
  }
}

const parseLine = (state: State) => (line: string) => {
  const [cardId, numbers] = line.split(":")
  const [winningNumbers, numbersWeHave] = numbers.split("|")
  state.cards[extractNumber(cardId)!] = [
    {
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
    },
  ]
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
