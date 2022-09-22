import slugify from 'slugify'

export const getSlug = (name: string) => slugify(name, { lower: true })

export namespace Routes {
  export const home = '/'

}
