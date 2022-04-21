import { GatsbyConfig } from 'gatsby';

import { linkResolver } from './linkResolver';

const GATSBY_PRISMIC_REPO_NAME = 'TO REPLACE';
// todo, regenerate and don't store in repo in plain text (it's okay if the security is bad if i write a comment saying i'll fix it one day)
const PRISMIC_ACCESS_TOKEN = 'TO REPLACE';
const PRISMIC_CUSTOM_TYPES_API_TOKEN = 'TO REPLACE';

const config: GatsbyConfig = {
  siteMetadata: {
    siteName: 'TO REPLACE',
    siteUrl: 'TO REPLACE',
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: GATSBY_PRISMIC_REPO_NAME,
        accessToken: PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver,
      },
    },
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
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-favicons',
      options: {
        logo: './src/favicon.svg',
        appName: 'TO REPLACE',
        background: '#fff',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          yandex: false,
          windows: false,
        },
      },
    },
  ],
};

export default config;
