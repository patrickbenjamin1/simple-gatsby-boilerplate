import { GatsbyNode } from 'gatsby';
import * as path from 'path';

import { Routes } from '../../src/utils/routes';
import { Paths } from '../utils/paths';

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
  type Response = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = await graphql<Response>(`
    query CreatePagesQuery {
     
    }
  `);

  createPage({
    component: path.resolve(Paths.views, 'home.tsx'),
    path: Routes.home,
    context: {},
  });
};
