// eslint-disable-next-line import/no-extraneous-dependencies
import { ModalProvider, ToastProvider } from '@rocketmakers/armstrong-edge';
import { GatsbyBrowser } from 'gatsby';
import * as React from 'react';

import { IShellProps, Shell } from './components/shell';

export const Providers: React.FC<IShellProps> = ({ children }) => {
  return (
    <ModalProvider>
      <ToastProvider autoDismissTime={6000}>
        <Shell>{children}</Shell>
      </ToastProvider>
    </ModalProvider>
  );
};

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <Providers>{element}</Providers>;
};
