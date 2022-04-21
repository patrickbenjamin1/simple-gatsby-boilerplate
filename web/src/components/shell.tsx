import * as React from 'react';

import { Meta } from './meta';

export interface IShellProps {}

export const Shell: React.FC<IShellProps> = ({ children }) => {
  return (
    <div className="shell">
      <Meta />

      {children}
    </div>
  );
};
