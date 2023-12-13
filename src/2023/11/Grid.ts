const DISTANCE_APART = 1

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
    const emptyTile = { type: UniverseObject.EmptySpace, galaxy: null }
    const emptyRowsIndexes: number[] = []
    const emptyColsIndexes: number[] = []
    let acc = 0

    for (let x = 0; x < numOfCols; x++) {
      const col = this.grid.map((row) => row[x])
      const colContainsGalaxies = col.some(isGalaxy)

      if (!colContainsGalaxies) {
        emptyColsIndexes.push(x)
      }
    }

    for (let y = 0; y < numOfRows; y++) {
      const row = this.grid[y]
      const rowContainsGalaxies = row.some(isGalaxy)

      if (!rowContainsGalaxies) {
        emptyRowsIndexes.push(y)
      }
    }

    // Expand the columns
    acc = 0
    for (const index of emptyColsIndexes) {
      for (let i = 0; i < numOfRows; i++) {
        this.grid[i].splice(
          acc + index,
          0,
          ...Array.from({ length: DISTANCE_APART }).map(() => emptyTile),
        )
      }
      acc += DISTANCE_APART
    }

    // Expand the rows
    numOfCols = this.grid[0].length
    const emptyRow = Array.from({ length: numOfCols }).fill(
      emptyTile,
    ) as UniverseTile[]

    acc = 0
    for (const index of emptyRowsIndexes) {
      this.grid.splice(
        acc + index,
        0,
        ...Array.from({ length: DISTANCE_APART }).map(() => emptyRow),
      )
      acc += DISTANCE_APART
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
