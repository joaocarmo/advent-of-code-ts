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
    onLine: (line: string) => void
    onClose?: () => void
  },
) => {
  const fileStream = fs.createReadStream(inputFile)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  rl.on("line", onLine)

  if (!onClose) {
    return
  }

  rl.on("close", onClose)
}

/**
 * Ignore black lines (lines that are empty or only contain spaces).
 */
export const ignoreBlackLine =
  (fn: (line: string) => void) => (line: string) =>
    line.trim() !== "" ? fn(line) : undefined
