// import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'

export const Meta: React.FC = () => {
  // const data = useStaticQuery<Queries.MetaQuery>(
  //   graphql`
  //     query Meta {
  //       prismicMetadata {
  //         data {
  //           description
  //           title
  //           image {
  //             url
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  // const title = data.prismicMetadata?.data.title
  // const description = data.prismicMetadata?.data.description
  // const image = data.prismicMetadata?.data.image?.url

  const title = ''
  const description = ''
  const image = ''

  return (
    <Helmet titleTemplate={`%s | ${title}`} defaultTitle={title || ''} htmlAttributes={{ lang: 'en' }}>
      {!!title && <meta name="og:title" content={title} />}
      {!!description && <meta name="description" content={description} />}
      {!!description && <meta name="og:description" content={description} />}
      {!!description && <meta name="twitter:description" content={description} />}
      {!!image && <meta name="og:image" content={image} />}
      {!!image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
