// import { withPrismicUnpublishedPreview } from 'gatsby-plugin-prismic-previews'
import * as React from 'react'

import { View } from '../components/view'

export const FourOhFourView: React.FC = () => {
  return <View title="404">uh oh</View>
}

// export default withPrismicUnpublishedPreview(FourOhFourView)
export default FourOhFourView
