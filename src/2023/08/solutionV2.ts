import lcm from "compute-lcm"
import { Direction } from "."
import type { Network, Node, State } from "."

const getInitialNodes = (network: Network): Node[] =>
  Object.keys(network).filter((node) => node.endsWith("A"))

export const findSolution = (state: State) => () => {
  const nodesNumberOfSteps = solution(state)
  const numberOfSteps = lcm(Object.values(nodesNumberOfSteps))

  console.log({ numberOfSteps })
}

const solution = (state: State): Record<Node, number> => {
  const { input, network } = state
  let currentIndex = 0
  const initialNodes = getInitialNodes(network)
  const nodesNumberOfSteps: Record<Node, number> = {}

  for (const node of initialNodes) {
    nodesNumberOfSteps[node] = 0
    let currentNode = node

    while (!currentNode.endsWith("Z")) {
      const [leftNode, rightNode] = network[currentNode]
      const direction = input[currentIndex]

      if (direction === Direction.Left) {
        currentNode = leftNode
      } else {
        currentNode = rightNode
      }

      nodesNumberOfSteps[node] += 1
      currentIndex += 1
      if (currentIndex === input.length) {
        currentIndex = 0
      }
    }
  }

  return nodesNumberOfSteps
}
