import * as path from 'path';

export namespace Paths {
  export const gatsby = path.resolve(__dirname, '../');
  export const source = path.resolve(gatsby, '../src');
  export const views = path.resolve(source, 'views');
}
