export namespace ArrayUtils {
  export const removeDuplicates = <T>(items: T[], comparer = (a: T, b: T) => a === b): T[] =>
    items.reduce<T[]>((output, item) => (output.find((outputItem) => comparer(outputItem, item)) ? output : [...output, item]), []);

  export const randomFromArray = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

  /** Get the highest value in an array of numbers */
  export const getHighest = (array: number[]) => array.reduce((highest, currentValue) => Math.max(highest, currentValue), array[0]);

  /** Get the lowest value in an array of numbers */
  export const getLowest = (array: number[]) => array.reduce((lowest, currentValue) => Math.min(lowest, currentValue), array[0]);
}
