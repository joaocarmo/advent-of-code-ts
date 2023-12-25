export enum TileType {
  Empty = ".",
  ForwardMirror = "/",
  BackwardMirror = "\\",
  VerticalSplitter = "|",
  HoritonzalSplitter = "-",
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface Beam {
  direction: Direction
}

interface Tile {
  type: TileType
  beams: Beam[]
}

export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public move = (direction: Direction): Point => {
    switch (direction) {
      case Direction.Up:
        return new Point(this.x, this.y - 1)
      case Direction.Down:
        return new Point(this.x, this.y + 1)
      case Direction.Left:
        return new Point(this.x - 1, this.y)
      case Direction.Right:
        return new Point(this.x + 1, this.y)
    }
  }
}

export class Grid {
  private grid: Tile[][]

  constructor() {
    this.grid = []
  }

  public get height(): number {
    return this.grid.length
  }

  public get width(): number {
    return this.grid[0]?.length ?? 0
  }

  public addRow = (row: Tile[]) => {
    this.grid.push(row)
  }

  public getTile = (point: Point): Tile | null => {
    return this.grid[point.y]?.[point.x] ?? null
  }

  public addBeam = (tile: Tile, beam: Beam) => {
    tile.beams.push(beam)
  }

  public beamExists = (tile: Tile, direction: Direction): boolean => {
    return tile.beams.some((beam) => beam.direction === direction)
  }

  public getNextDirection = (
    currentPoint: Point,
    currentDirection: Direction,
  ): Direction[] => {
    const nextTile = this.getTile(currentPoint)

    if (!nextTile) {
      return [currentDirection]
    }

    switch (nextTile.type) {
      case TileType.Empty:
        return [currentDirection]
      case TileType.ForwardMirror:
        switch (currentDirection) {
          case Direction.Up:
            return [Direction.Right]
          case Direction.Down:
            return [Direction.Left]
          case Direction.Left:
            return [Direction.Down]
          case Direction.Right:
            return [Direction.Up]
        }
        break
      case TileType.BackwardMirror:
        switch (currentDirection) {
          case Direction.Up:
            return [Direction.Left]
          case Direction.Down:
            return [Direction.Right]
          case Direction.Left:
            return [Direction.Up]
          case Direction.Right:
            return [Direction.Down]
        }
        break
      case TileType.VerticalSplitter:
        switch (currentDirection) {
          case Direction.Up:
            return [currentDirection]
          case Direction.Down:
            return [currentDirection]
          case Direction.Left:
            return [Direction.Up, Direction.Down]
          case Direction.Right:
            return [Direction.Up, Direction.Down]
        }
        break
      case TileType.HoritonzalSplitter:
        switch (currentDirection) {
          case Direction.Up:
            return [Direction.Left, Direction.Right]
          case Direction.Down:
            return [Direction.Left, Direction.Right]
          case Direction.Left:
            return [currentDirection]
          case Direction.Right:
            return [currentDirection]
        }
    }
  }

  public moveBeam = (point: Point, direction: Direction) => {
    const tile = this.getTile(point)

    if (!tile) {
      return
    }

    if (this.beamExists(tile, direction)) {
      return
    }

    this.addBeam(tile, { direction })

    const nextPoint = point.move(direction)
    const nextDirections = this.getNextDirection(nextPoint, direction)

    for (const nextDirection of nextDirections) {
      this.moveBeam(nextPoint, nextDirection)
    }
  }

  public getEnergisedTiles = (): Tile[] => {
    return this.grid
      .flatMap((row) => row)
      .filter((tile) => tile.beams.length > 0)
  }

  public getNumOfEnergisedTiles = (): number => {
    return this.getEnergisedTiles().length
  }

  public resetBeams = () => {
    this.grid.forEach((row) =>
      row.forEach((tile) => {
        tile.beams = []
      }),
    )
  }

  public toString(): string {
    return this.grid
      .map((row) => row.map(({ type }) => type).join(""))
      .join("\n")
  }

  public toEnergisedString(): string {
    return this.grid
      .map((row) =>
        row.map(({ beams }) => (beams.length > 0 ? "#" : ".")).join(""),
      )
      .join("\n")
  }
}
