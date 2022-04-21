import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ShellQuery } from '../generated/graphql';

export const Meta: React.FC = () => {
  const data = useStaticQuery<ShellQuery>(
    graphql`
      query Shell {
        prismicHomePage {
          data {
            meta_description
            meta_title
            meta_image {
              url
            }
          }
        }
      }
    `
  );

  const title = data.prismicHomePage?.data.meta_title;
  const description = data.prismicHomePage?.data.meta_description;
  const image = data.prismicHomePage?.data.meta_image?.url;

  return (
    <Helmet titleTemplate={`%s | ${data.prismicHomePage?.data.meta_title}`} defaultTitle={data.prismicHomePage?.data.meta_title}>
      {!!title && <meta name="og:title" content={title} />}
      {!!description && <meta name="og:description" content={description} />}
      {!!description && <meta name="twitter:description" content={description} />}
      {!!image && <meta name="og:image" content={image} />}
      {!!image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
