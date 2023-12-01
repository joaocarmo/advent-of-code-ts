import yargs from "yargs"
import { hideBin } from "yargs/helpers"

/**
 * Parses the command line arguments.
 */
export const parseArgs = async () => {
  const argv = await yargs(hideBin(process.argv)).argv

  // Gets the first positional argument
  const [inputFile] = argv._

  if (!inputFile) {
    throw new Error("Input file is required")
  }

  return {
    inputFile: String(inputFile),
  }
}
