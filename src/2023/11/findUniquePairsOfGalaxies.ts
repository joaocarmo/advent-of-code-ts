import { Point } from "./Grid"

export const findUniquePairsOfGalaxies = (galaxies: Point[]): Point[][] => {
  const numOfGalaxies = galaxies.length
  const uniquePairsOfGalaxies: Point[][] = []

  for (let i = 0; i < numOfGalaxies; i++) {
    for (let j = i + 1; j < numOfGalaxies; j++) {
      uniquePairsOfGalaxies.push([galaxies[i], galaxies[j]])
    }
  }

  return uniquePairsOfGalaxies
}
