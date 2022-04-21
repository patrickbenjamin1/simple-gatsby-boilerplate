import { Routes } from '../src/utils/routes';

export interface IPrismicDocument {
  type: string;
  uid: string;
}

// define routes so that links to prismic documents are hooked up

export const linkResolver = (doc: IPrismicDocument) => {
  switch (doc.type) {
    case 'home_page':
      return Routes.home;
    default:
      return Routes.home;
  }
};
