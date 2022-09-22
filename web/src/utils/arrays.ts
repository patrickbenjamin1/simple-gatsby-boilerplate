import { Arrays } from '@rocketmakers/armstrong-edge'

export namespace ArrayUtils {
  export const removeDuplicates = <T>(items: T[], comparer = (a: T, b: T) => a === b): T[] =>
    items.reduce<T[]>((output, item) => (output.find((outputItem) => comparer(outputItem, item)) ? output : [...output, item]), [])

  export const randomFromArray = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)]

  export const getNumbersBetween = (min: number, max: number) => Arrays.repeat(max - min, (index) => index + min)
}
