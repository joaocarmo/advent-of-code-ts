import { isDigit } from "@/utils/isDigit"
import { Point } from "./Point"

interface GridValue<T> {
  value: T
}

export class Grid<T, K extends GridValue<T>> {
  private map: Map<string, K>
  public xMin: number
  public xMax: number
  public yMin: number
  public yMax: number

  constructor() {
    this.map = new Map<string, K>()
    this.xMin = 0
    this.xMax = 0
    this.yMin = 0
    this.yMax = 0
  }

  set(point: Point, value: K): void {
    this.map.set(point.toString(), value)
  }

  get(point: Point): K | undefined {
    return this.map.get(point.toString())
  }

  isNumber(point: Point): boolean {
    const value = this.get(point)

    return typeof value?.value === "string" && isDigit(value.value)
  }

  isSymbol(point: Point): boolean {
    const value = this.get(point)

    return (
      typeof value?.value === "string" &&
      value.value.length > 0 &&
      value.value !== "." &&
      !isDigit(value.value)
    )
  }

  isGear(point: Point): boolean {
    return this.isSymbol(point) && this.get(point)?.value === "*"
  }

  toString(): string {
    let result = ""

    this.map.forEach((value, key) => {
      const point = Point.fromString(key)

      if (point.x === 0) {
        result += "\n"
      }

      result += value.value
    })

    return result
  }
}
