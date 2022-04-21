import './home.scss';

import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import { View } from '../components/view';
import { HomePageQuery } from '../generated/graphql';

export interface HomeViewProps extends PageProps<HomePageQuery> {}

export const HomeView: React.FC<HomeViewProps> = ({ data }) => {
  return <View className="home-view" hideFooterLine></View>;
};

export default HomeView;

export const pageQuery = graphql`
  query HomePage {
    
  }
`;
