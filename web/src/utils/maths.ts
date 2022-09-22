export namespace MathsUtils {
  export const randomBetween = (from: number, to: number) => from + Math.floor(Math.random() * to - from)
  export const randomWithin = (input: number, range: number) => input + randomBetween(input - range / 2, input + range / 2)
  export const roundToDecimalPlaces = (input: number, dp: number) => Math.round(input * 10 ** dp) / 10 ** dp
  export const getTotal = (values: number[]) => values.reduce((current, output) => output + current, 0)
  export const getHighest = (values: number[]) => values.reduce((highest, currentValue) => Math.max(highest, currentValue), values[0])
  export const getLowest = (values: number[]) => values.reduce((lowest, currentValue) => Math.min(lowest, currentValue), values[0])
  export const getMidpoint = (values: number[]) => {
    const highest = getHighest(values)
    const lowest = getLowest(values)

    return (highest - lowest) / 2 + lowest
  }
  export const mean = (values: number[]) => getTotal(values) / values.length
}
