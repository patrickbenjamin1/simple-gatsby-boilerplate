import { LinkResolver } from 'prismic-reactjs'

import { Routes } from '../src/utils/routes'

export interface IPrismicDocument {
  type: string
  uid: string
}

// define routes so that links to prismic documents are hooked up

export const linkResolver: LinkResolver = (doc: IPrismicDocument) => {
  switch (doc.type) {
    case 'home_page':
    default:
      return Routes.home
  }
}
