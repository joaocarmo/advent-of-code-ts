export enum UniverseObject {
  EmptySpace = ".",
  Galaxy = "#",
}

export interface UniverseTile {
  type: UniverseObject
  galaxy: number | null
}

export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public toString(): string {
    return `(${this.x}, ${this.y})`
  }
}

export class Grid {
  private grid: UniverseTile[][] = []
  private galaxies: Point[] = []

  constructor() {}

  getGalaxies() {
    return this.galaxies
  }

  addRow(row: UniverseTile[]) {
    this.grid.push(row)
  }

  findGalaxies() {
    const numOfRows = this.grid.length
    const numOfCols = this.grid[0].length

    for (let y = 0; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        const tile = this.grid[y][x]

        if (tile.type === UniverseObject.Galaxy) {
          this.galaxies.push(new Point(x, y))
        }
      }
    }
  }

  expand() {
    const numOfRows = this.grid.length
    let numOfCols = this.grid[0].length
    const emptyRowsIndexes: number[] = []
    const emptyTile = { type: UniverseObject.EmptySpace, galaxy: null }
    let acc = 0

    // Expand the columns
    const emptyColsIndexes: number[] = []

    for (let i = 0; i < numOfCols; i++) {
      const col = this.grid.map((row) => row[i])
      const colContainsGalaxies = col.some(isGalaxy)

      if (!colContainsGalaxies) {
        emptyColsIndexes.push(i)
      }
    }

    acc = 0
    for (const index of emptyColsIndexes) {
      for (let i = 0; i < numOfRows; i++) {
        this.grid[i].splice(acc + index, 0, emptyTile)
      }
      acc++
    }

    // Expand the rows
    numOfCols = this.grid[0].length
    const emptyRow = Array(numOfCols).fill(emptyTile)

    for (let i = 0; i < numOfRows; i++) {
      const row = this.grid[i]
      const rowContainsGalaxies = row.some(isGalaxy)

      if (!rowContainsGalaxies) {
        emptyRowsIndexes.push(i)
      }
    }

    acc = 0
    for (const index of emptyRowsIndexes) {
      this.grid.splice(acc + index, 0, emptyRow)
      acc++
    }
  }

  public toString(): string {
    return this.grid
      .map((row) => row.map(({ type }) => type).join(""))
      .join("\n")
  }

  public toNumber(): string {
    return this.grid
      .map((row) => row.map(({ type, galaxy }) => galaxy ?? type).join(""))
      .join("\n")
  }
}

const isGalaxy = ({ type }: UniverseTile) => type === UniverseObject.Galaxy
