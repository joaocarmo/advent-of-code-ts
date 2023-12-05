import fs from "fs"
import readline from "readline"

/**
 * Read file line by line.
 */
export const readFileLine = (
  inputFile: string,
  {
    onLine,
    onClose,
  }: {
    onLine: (line: string, lineIndex: number) => void
    onClose?: () => void
  },
) => {
  const fileStream = fs.createReadStream(inputFile)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let lineIndex = 0

  rl.on("line", (line) => {
    onLine(line, lineIndex)
    lineIndex++
  })

  if (!onClose) {
    return
  }

  rl.on("close", onClose)
}

/**
 * Ignore black lines (lines that are empty or only contain spaces).
 */
export const ignoreBlankLine =
  (fn: (line: string, lineIndex: number) => void) =>
  (line: string, lineIndex: number) =>
    line.trim() !== "" ? fn(line, lineIndex) : undefined
