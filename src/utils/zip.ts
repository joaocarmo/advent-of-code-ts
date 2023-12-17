export function zip<T = unknown>(...args: T[][]) {
  const parameters = [].slice.call(args)
  const shortest =
    args.length == 0
      ? []
      : args.reduce(function (a, b) {
          return a.length < b.length ? a : b
        })

  return shortest.map(function (_, i) {
    return parameters.map(function (array) {
      return array[i]
    })
  })
}
