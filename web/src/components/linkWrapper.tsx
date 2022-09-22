import { Link } from 'gatsby'
import * as React from 'react'

/** wrap a component in a link or an a tag, if to is defined */

interface ILinkWrapperProps extends Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  to?: string
  disabled?: boolean
  className?: string
  download?: boolean
  title?: string
  activeClassName?: string
}

export const LinkWrapper: React.FunctionComponent<React.PropsWithChildren<ILinkWrapperProps>> = ({
  to,
  children,
  disabled,
  className,
  download,
  title,
  activeClassName,
  ...props
}) => {
  if (to && !disabled) {
    if (to.startsWith('/')) {
      return (
        <Link className={className} to={to} title={title} activeClassName={activeClassName} partiallyActive {...props}>
          {children}
        </Link>
      )
    }

    const href = to.startsWith('https://') || to.startsWith('http://') ? to : `https://${to}`

    return (
      <a className={className} href={href} download={download} target="_blank" rel="noopener noreferrer nofollow" title={title} {...props}>
        {children}
      </a>
    )
  }

  return <>{children}</>
}
