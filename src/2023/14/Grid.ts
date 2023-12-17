export type Element = "#" | "O" | "."

export class Grid {
  private grid: Element[][]
  private load: number[][]

  constructor() {
    this.grid = []
    this.load = []
  }

  public addRow(row: Element[]) {
    this.grid.push(row)
  }

  public tilt() {}

  public calculateLoad() {
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

  public toString(): string {
    return this.grid
      .map(
        (row, i) =>
          `${row.join("")} ${this.load[i].reduce(
            (acc, load) => acc + load,
            0,
          )}`,
      )
      .join("\n")
  }
}
