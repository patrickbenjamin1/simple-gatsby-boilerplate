export namespace StringsUtils {
  /** Truncate text in a range of characters */
  export const truncate = (value: string | undefined, cutoff: number) => {
    if (!value) {
      return ''
    }
    if (value.length > cutoff) {
      return `${value.substring(0, cutoff).trim()}...`
    }
    return value
  }
}
