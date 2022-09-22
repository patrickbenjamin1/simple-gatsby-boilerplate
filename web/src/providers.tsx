import { useLocation } from '@reach/router'
import { ArmstrongConfigProvider, ModalProvider, ToastProvider } from '@rocketmakers/armstrong-edge'
import { GatsbyBrowser, navigate } from 'gatsby'
// import { componentResolverFromMap, PrismicPreviewProvider } from 'gatsby-plugin-prismic-previews'
import * as React from 'react'

import { LinkWrapper } from './components/linkWrapper'
import { Shell } from './components/shell'

export const Providers: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation()

  return (
    <ArmstrongConfigProvider
      routing={{ LinkComponent: LinkWrapper, location, navigate: (to, action) => navigate(to, { replace: action === 'replace' }) }}
    >
      {/* <PrismicPreviewProvider
        repositoryConfigs={[
          {
            repositoryName: 'humm-studios',
            linkResolver,
            componentResolver: componentResolverFromMap({
              home_page: HomeView,
              navigation_menu: HomeView,
              metadata: HomeView,
            }),
          },
        ]}
      > */}
      <ModalProvider>
        <ToastProvider autoDismissTime={6000}>
          <Shell>{children}</Shell>
        </ToastProvider>
      </ModalProvider>
      {/* </PrismicPreviewProvider> */}
    </ArmstrongConfigProvider>
  )
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <Providers>{element}</Providers>
}
