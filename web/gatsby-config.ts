import { GatsbyConfig } from 'gatsby'

import { linkResolver } from './gatsby/linkResolver'

const GATSBY_PRISMIC_REPO_NAME = ''
// todo, regenerate and don't store in repo in plain text (it's okay if the security is bad if i write a comment saying i'll fix it one day)
const PRISMIC_ACCESS_TOKEN = ''
const PRISMIC_CUSTOM_TYPES_API_TOKEN = ''

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    siteName: 'simple-gatsby-boilerplate',
    siteUrl: 'https://example.com/',
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-prismic',
    //   options: {
    //     repositoryName: GATSBY_PRISMIC_REPO_NAME,
    //     accessToken: PRISMIC_ACCESS_TOKEN,
    //     customTypesApiToken: PRISMIC_CUSTOM_TYPES_API_TOKEN,
    //     linkResolver,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-prismic-previews`,
    //   options: {
    //     repositoryName: GATSBY_PRISMIC_REPO_NAME,
    //     accessToken: PRISMIC_ACCESS_TOKEN,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-extract-schema',
      options: {
        dest: `src/generated/schema.graphql`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['**/*/p/*', '/projects/filter'],
      },
    },
    `gatsby-plugin-robots-txt`,
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-WKLFBCB0D8'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Snog`,
        short_name: `Snog`,
        start_url: `/`,
        background_color: `#E3E3E3`,
        theme_color: `#AA00FF`,
        display: `standalone`,
        icon: './src/favicon.svg',
      },
    },
  ],
}

export default config
