export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public static fromString(pointString: string): Point {
    const [x, y] = pointString.split(",").map(Number)

    return new Point(x, y)
  }

  toString(): string {
    return `${this.x},${this.y}`
  }
}
