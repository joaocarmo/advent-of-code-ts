export enum Direction {
  North,
  West,
  South,
  East,
}

export type Element = "#" | "O" | "."

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public nextPoint(direction: Direction): Point {
    switch (direction) {
      case Direction.North:
        return new Point(this.x, this.y + 1)
      case Direction.East:
        return new Point(this.x - 1, this.y)
      case Direction.South:
        return new Point(this.x, this.y - 1)
      case Direction.West:
        return new Point(this.x + 1, this.y)
    }
  }
}

export class Grid {
  private grid: Element[][]
  private load: number[][]
  public cache: Map<string, string>

  constructor() {
    this.grid = []
    this.load = []
    this.cache = new Map<string, string>()
  }

  public addRow(row: Element[]) {
    this.grid.push(row)
  }

  public getElement(point: Point): Element {
    return this.grid?.[point.y]?.[point.x] || "#"
  }

  public setElement(point: Point, element: Element) {
    if (
      point.y < 0 ||
      point.y >= this.grid.length ||
      point.x < 0 ||
      point.x >= this.grid[point.y].length
    ) {
      return
    }

    this.grid[point.y][point.x] = element
  }

  public tilt(direction: Direction): number {
    const N = this.grid.length
    let currentPoint = new Point(0, 0)
    let tiltedRocks = 0

    outerLoop: for (let y = 0; y < N; y++) {
      const row = this.grid[y]

      if (!row) {
        continue outerLoop
      }

      innerLoop: for (let x = 0; x < row.length; x++) {
        currentPoint = new Point(x, y)
        const element = this.getElement(currentPoint)

        if (element !== ".") {
          continue innerLoop
        }

        const nextElement = this.getElement(currentPoint.nextPoint(direction))

        if (nextElement === "O") {
          this.setElement(currentPoint, "O")
          this.setElement(currentPoint.nextPoint(direction), ".")
          tiltedRocks++
        }
      }
    }

    return tiltedRocks
  }

  public tiltAll(direction: Direction) {
    let tiltedRocks = 0

    do {
      tiltedRocks = this.tilt(direction)
    } while (tiltedRocks > 0)
  }

  public findPeriod(cycle: Direction[]): number {
    let i = 0
    let j = 0

    do {
      for (const direction of cycle) {
        const cacheKey = this.toCacheString()

        if (this.cache.has(cacheKey)) {
          this.fromCacheString(this.cache.get(cacheKey)!)
          i++
          continue
        }

        this.tiltAll(direction)
        this.cache.set(cacheKey, this.toCacheString())

        i = 0
      }

      j++
    } while (i < this.cache.size)

    return j
  }

  public calculateLoad() {
    this.load = []
    const N = this.grid.length

    for (let i = 0; i < N; i++) {
      const row = this.grid[i]
      const loadRow: number[] = []

      for (const element of row) {
        loadRow.push(element === "O" ? N - i : 0)
      }

      this.load.push(loadRow)
    }
  }

  public getLoad(): number[][] {
    return this.load
  }

  public getTotalLoad(): number {
    this.calculateLoad()

    return this.getLoad().reduce(
      (acc, row) => acc + row.reduce((acc, load) => acc + load, 0),
      0,
    )
  }

  private toCacheString(): string {
    return this.grid.map((row) => row.join("")).join("\n")
  }

  private fromCacheString(cacheString: string) {
    const grid: Element[][] = []

    for (const row of cacheString.split("\n")) {
      grid.push(row.split("") as Element[])
    }

    this.grid = grid
  }

  public toString(): string {
    return this.grid
      .map(
        (row, i) =>
          `${row.join("")} ${
            this.load[i]?.reduce((acc, load) => acc + load, 0) ?? ""
          }`,
      )
      .join("\n")
  }
}
