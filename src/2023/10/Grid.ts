type TileSymbol = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S"

interface Tile {
  symbol: TileSymbol
  distance: number | null
  visited: boolean
}

export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public static fromString(str: string): Point {
    const [x, y] = str.split(",").map((s) => parseInt(s, 10))

    return new Point(x, y)
  }

  public north(): Point {
    return new Point(this.x, this.y - 1)
  }

  public south(): Point {
    return new Point(this.x, this.y + 1)
  }

  public east(): Point {
    return new Point(this.x + 1, this.y)
  }

  public west(): Point {
    return new Point(this.x - 1, this.y)
  }

  public equals(p: Point): boolean {
    return this.x === p.x && this.y === p.y
  }

  public toString(): string {
    return `${this.x},${this.y}`
  }
}

export class Grid {
  private grid: Tile[][] = []
  public start: Point | null = null
  public startSymbol: TileSymbol | null = null

  public constructor() {}

  public get(p: Point): Tile {
    return this.grid[p.y][p.x]
  }

  public set(p: Point, tile: Tile): void {
    this.grid[p.y][p.x] = tile
  }

  public getDimensions(): [number, number] {
    return [this.grid[0].length, this.grid.length]
  }

  public addRow(row: Tile[]): void {
    this.grid.push(row)
  }

  public setStart(p: Point | null): void {
    if (p === null) {
      return
    }

    this.start = p

    // Set start distance to 0
    this.set(this.start, {
      ...this.get(p),
      distance: 0,
    })
  }

  public getNextNeighbors(p: Point): Point[] {
    const neighbors: Point[] = []
    const symbol =
      this.start && p.equals(this.start) ? this.startSymbol : this.get(p).symbol

    switch (symbol) {
      case "|":
        neighbors.push(p.north())
        neighbors.push(p.south())
        break
      case "-":
        neighbors.push(p.east())
        neighbors.push(p.west())
        break
      case "L":
        neighbors.push(p.north())
        neighbors.push(p.east())
        break
      case "J":
        neighbors.push(p.north())
        neighbors.push(p.west())
        break
      case "7":
        neighbors.push(p.south())
        neighbors.push(p.west())
        break
      case "F":
        neighbors.push(p.south())
        neighbors.push(p.east())
        break
      default:
        throw new Error(`Unknown symbol: ${this.get(p).symbol}`)
    }

    return neighbors.filter(
      (p) => this.isWithinBounds(p) && this.isMeaningful(p),
    )
  }

  public getNeighbors(p: Point): Point[] {
    const neighbors: Point[] = []

    if (p.y > 0) {
      neighbors.push(p.north())
    }

    if (p.y < this.grid.length - 1) {
      neighbors.push(p.south())
    }

    if (p.x > 0) {
      neighbors.push(p.west())
    }

    if (p.x < this.grid[0].length - 1) {
      neighbors.push(p.east())
    }

    return neighbors
  }

  public getMeaningfulNeighbors(p: Point): Point[] {
    return this.getNeighbors(p).filter(
      (p) => this.isWithinBounds(p) && this.isMeaningful(p),
    )
  }

  public isMeaningful(p: Point): boolean {
    const tile = this.get(p)

    return tile.symbol !== "." && tile.symbol !== "S"
  }

  public isWithinBounds(p: Point): boolean {
    const [width, height] = this.getDimensions()

    return p.x >= 0 && p.x < width && p.y >= 0 && p.y < height
  }

  public findSymbolFromNeighbors(
    neighborA: Point,
    neighborB: Point,
  ): TileSymbol | null {
    const xDiff = neighborA.x - neighborB.x
    const yDiff = neighborA.y - neighborB.y

    if (xDiff === 0 && yDiff !== 0) {
      return "|"
    }

    if (xDiff !== 0 && yDiff === 0) {
      return "-"
    }

    if (xDiff === -1 && yDiff === -1) {
      return "L"
    }

    if (xDiff === 1 && yDiff === -1) {
      return "J"
    }

    if (xDiff === 1 && yDiff === 1) {
      return "7"
    }

    if (xDiff === -1 && yDiff === 1) {
      return "F"
    }

    return null
  }

  public toDistances(): string {
    return this.grid
      .map((row) =>
        row.map(({ symbol, distance }) => distance ?? symbol).join(""),
      )
      .join("\n")
  }

  public toString(): string {
    return this.grid
      .map((row) => row.map(({ symbol }) => symbol).join(""))
      .join("\n")
  }
}

export const convertStringToTile = (str: string): TileSymbol => {
  switch (str) {
    case "|":
    case "-":
    case "L":
    case "J":
    case "7":
    case "F":
    case ".":
    case "S":
      return str
    default:
      throw new Error(`Unknown tile: ${str}`)
  }
}
