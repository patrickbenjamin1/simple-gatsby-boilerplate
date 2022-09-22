import './shell.scss'

import { useLocation } from '@reach/router'
import { useDidUpdateEffect } from '@rocketmakers/armstrong-edge'
import * as React from 'react'

import { useDisableScroll } from '../hooks/useDisableScroll'
import { Meta } from './meta'

export interface IShellProps {
  isHome?: boolean
}

export const Shell: React.FC<React.PropsWithChildren<IShellProps>> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  useDisableScroll(isNavOpen)

  const { pathname } = useLocation()

  useDidUpdateEffect(() => {
    setIsNavOpen(false)
  }, [pathname])

  return (
    <div className="shell" data-is-nav-open={isNavOpen}>
      <Meta />

      <div className="shell-content" onClick={() => isNavOpen && setIsNavOpen(false)} tabIndex={isNavOpen ? -1 : undefined} aria-hidden={isNavOpen}>
        {children}
      </div>
    </div>
  )
}
