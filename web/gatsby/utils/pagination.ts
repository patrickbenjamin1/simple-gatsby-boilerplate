import { NodePluginArgs } from 'gatsby'

export namespace Pagination {
  export type IPaginationContext<TItem = { uid: string }, TAdditional = {}> = TAdditional & {
    /** the items in the page */
    items: TItem[]

    /** the current page */
    page: number

    /** the total number of pages */
    total: number

    /** skip for gql query */
    skip: number

    /** take for gql query */
    take: number
  }

  export const createPages = <TItem, TAdditional = {}>(
    createPage: NodePluginArgs['actions']['createPage'],
    items: TItem[],
    {
      component,
      pageLength,
      path,
      additionalContext,
    }: { pageLength: number; component: string; path: (pageNumber: number) => string; additionalContext?: TAdditional }
  ) => {
    const pages = Math.ceil(items.length / pageLength)

    for (let page = 1; page <= pages; page += 1) {
      const pageItems = items.slice(pageLength * (page - 1), pageLength * page)
      const skip = pageLength * (page - 1)
      const take = pageLength

      const context: IPaginationContext<TItem, TAdditional> = {
        items: pageItems,
        page,
        total: pages,
        skip,
        take,
        ...additionalContext,
      }

      createPage({
        path: path(page),
        component,
        context,
      })
    }
  }
}
