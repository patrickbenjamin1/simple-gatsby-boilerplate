import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ShellQuery } from '../generated/graphql';

export const Meta: React.FC = () => {
  const data = useStaticQuery<ShellQuery>(
    graphql`
      query Shell {
        prismicMetadata {
          data {
            description
            title
            image {
              url
            }
          }
        }
      }
    `
  );

  const title = data.prismicMetadata?.data.title;
  const description = data.prismicMetadata?.data.description;
  const image = data.prismicMetadata?.data.image?.url;

  return (
    <Helmet titleTemplate={`%s | ${data.prismicMetadata?.data.title}`} defaultTitle={data.prismicMetadata?.data.title}>
      {!!title && <meta name="og:title" content={title} />}
      {!!description && <meta name="og:description" content={description} />}
      {!!description && <meta name="twitter:description" content={description} />}
      {!!image && <meta name="og:image" content={image} />}
      {!!image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
