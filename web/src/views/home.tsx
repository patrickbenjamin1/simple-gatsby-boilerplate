import { PageProps } from 'gatsby'
import * as React from 'react'

import { View } from '../components/view'

export interface HomeViewProps extends PageProps<{}> {}

export const HomeView: React.FC<HomeViewProps> = () => {
  return (
    <View className="home-view">
      <p>I'm home</p>
    </View>
  )
}

export default HomeView
// export default withPrismicUnpublishedPreview(HomeView)

// export const pageQuery = graphql`
//   query HomePage {
//     prismicHomePage {
//       _previewable
//       data {

//       }
//     }
//   }
// `
