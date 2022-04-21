import { ClassNames } from '@rocketmakers/armstrong-edge';
import * as React from 'react';
import { Helmet } from 'react-helmet';

export interface IViewProps {
  className?: string;
  title?: string;

  hideFooterLine?: boolean;

  author?: string;

  description?: string;

  image?: string;
}

export const View: React.FC<IViewProps> = ({ className, children, title, author, description, image }) => {
  return (
    <>
      <main className={ClassNames.concat('view', className)}>
        <div className="view-inner">{children}</div>
      </main>

      <Helmet title={title}>
        {!!author && <meta name="author" content={author} />}
        {!!author && <meta name="og:author" content={author} />}
        {!!title && <meta name="og:title" content={title} />}
        {!!author && <meta name="og:type" content="article" />}
        {!!description && <meta name="og:description" content={description} />}
        {!!description && <meta name="twitter:description" content={description} />}
        {!!image && <meta name="og:image" content={image} />}
        {!!image && <meta name="twitter:image" content={image} />}
      </Helmet>
    </>
  );
};

View.defaultProps = {};
