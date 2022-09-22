import { Globals } from '@rocketmakers/armstrong-edge'
import * as React from 'react'

// see theme/shared/_layout for SCSS application

export const useDisableScroll = (disabled: boolean) => {
  React.useEffect(() => {
    Globals?.Document?.scrollingElement?.setAttribute('data-scrolling-disabled', disabled ? 'true' : 'false')
  }, [disabled])
}
