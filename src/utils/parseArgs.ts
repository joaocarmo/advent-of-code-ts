import fs from "fs"
import { resolve } from "path"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

/**
 * Parses the command line arguments.
 */
export const parseArgs = async () => {
  const argv = await yargs(hideBin(process.argv)).argv

  // Gets the first positional argument
  const [inputFileFromArgs] = argv._

  if (!inputFileFromArgs) {
    throw new Error("Input file is required")
  }

  const inputFile = resolve(String(inputFileFromArgs))

  if (!fs.existsSync(inputFile)) {
    throw new Error(`Input file ${inputFile} does not exist`)
  }

  return {
    inputFile,
  }
}
