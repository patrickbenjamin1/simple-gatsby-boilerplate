export namespace MathsUtils {
  export const randomBetween = (from: number, to: number) => from + Math.floor(Math.random() * to - from);
  export const randomWithin = (input: number, range: number) => input + randomBetween(input - range / 2, input + range / 2);
}
