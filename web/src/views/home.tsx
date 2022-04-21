import './home.scss';

import { Group } from '@rocketmakers/armstrong-edge';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { Arrow } from '../components/arrow';
import { BlogPostCardGrid } from '../components/blogPostCardGrid';
import { BTButton } from '../components/button';
import { Columns } from '../components/columns';
import { Dash } from '../components/dash';
import { EventList } from '../components/eventList';
import { HorizontalRule } from '../components/horizontalRule';
import { LinkList } from '../components/linkList';
import { Partners } from '../components/partners';
import { BTRichText } from '../components/richText';
import { Section } from '../components/section';
import { View } from '../components/view';
import { HomePageQuery } from '../generated/graphql';
import { ArrayUtils } from '../utils/arrays';
import { Routes } from '../utils/routes';

export interface HomeViewProps extends PageProps<HomePageQuery> {}

export const HomeView: React.FC<HomeViewProps> = ({ data }) => {
  const currentFestival = data.prismicHomePage?.data.current_festival;

  // get venues from all festival events (not possible to query using gatsby-prismic's gql implementation as far as I know)
  const venues = React.useMemo(
    () =>
      ArrayUtils.removeDuplicates(
        data.allPrismicFestivalEvent.edges.map((event) => event.node.data.venue?.document?.data),
        (a, b) => a?.name === b?.name
      ),
    []
  );

  return (
    <View className="home-view" hideFooterLine>
      <Section className="home-view-hero" gradientBackground>
        <GatsbyImage className="home-view-logo" image={data.prismicGlobal?.data?.logo?.gatsbyImageData} alt="" objectFit="contain" />
        {currentFestival && (
          <p className="home-page-info-line">
            {currentFestival.document?.data?.date_text} <Dash /> {currentFestival?.document?.data?.venue_text}
          </p>
        )}
        <Group>
          {currentFestival ? (
            <>
              {currentFestival?.document?.data.ticket_link?.url && (
                <BTButton to={currentFestival?.document?.data.ticket_link?.url}>
                  Buy Tickets <Arrow />
                </BTButton>
              )}
              <BTButton to={Routes.festivalProgramme(currentFestival?.document?.data.name || '')} variant="white-translucent">
                Programme <Arrow />
              </BTButton>
              {!currentFestival?.document?.data?.hide_timetable && (
                <BTButton variant="white-translucent" to={Routes.festivalTimetable(currentFestival?.document?.data.name || '')}>
                  Timetable <Arrow />
                </BTButton>
              )}
              <BTButton
                to={currentFestival?.document?.data.volunteer_link?.url}
                disabled={!currentFestival?.document?.data.volunteer_link?.url}
                variant="white-translucent"
                noMobile
              >
                Volunteer <Arrow />
              </BTButton>
              <BTButton
                to={currentFestival?.document?.data.donate_link?.url}
                variant="white-translucent"
                disabled={!currentFestival?.document?.data.donate_link?.url}
                noMobile
              >
                Subscribe on Patreon <Arrow />
              </BTButton>
            </>
          ) : (
            <>
              {data.allPrismicBlogPost?.edges?.length && (
                <BTButton variant="white-translucent" to={Routes.blog()}>
                  Blog <Arrow />
                </BTButton>
              )}
              {data.allPrismicEvent?.edges?.length && (
                <BTButton variant="white-translucent" to={Routes.events()}>
                  Events <Arrow />
                </BTButton>
              )}
            </>
          )}
        </Group>
      </Section>

      {currentFestival && (
        <>
          <Section>
            <Columns>
              <div className="home-view-long-description">
                <BTRichText render={currentFestival?.document?.data.long_description?.richText} />
                <div className="home-view-long-description-get-involved">
                  <BTRichText render={currentFestival?.document?.data.volunteer_description?.richText} />
                  <br />
                  <Group>
                    <BTButton
                      to={currentFestival?.document?.data.volunteer_link?.url}
                      disabled={!currentFestival?.document?.data.volunteer_link?.url}
                    >
                      Volunteer <Arrow />
                    </BTButton>
                    <BTButton
                      to={currentFestival?.document?.data.donate_link?.url}
                      variant="accent-line"
                      disabled={!currentFestival?.document?.data.donate_link?.url}
                    >
                      Subscribe on Patreon <Arrow />
                    </BTButton>
                  </Group>
                </div>
              </div>
              <div className="home-view-long-description-photo-wrapper">
                <GatsbyImage
                  image={currentFestival?.document?.data?.long_description_photo?.gatsbyImageData}
                  alt=""
                  className="home-view-long-description-photo"
                />
              </div>
            </Columns>
          </Section>

          <HorizontalRule />

          <Section className="home-view-sessions-list">
            <Group>
              <h3>Sessions at {currentFestival?.document?.data?.name}</h3>
            </Group>
            <LinkList
              bigger
              links={data.allPrismicFestivalEvent.edges.map((event) => ({
                text: event.node.data.name!,
                to: Routes.festivalEvent(currentFestival?.document?.data.name || '', event.node.data.name || ''),
              }))}
              endText={data.prismicHomePage?.data.current_festival?.document?.data.more_events}
            />

            <Group>
              <BTButton to={Routes.festivalProgramme(currentFestival?.document?.data.name || '')}>
                Programme <Arrow />
              </BTButton>
              {!currentFestival?.document?.data?.hide_timetable && (
                <BTButton to={Routes.festivalTimetable(currentFestival?.document?.data.name || '')}>
                  Timetable <Arrow />
                </BTButton>
              )}
            </Group>
          </Section>

          <Section>
            <h3>Venues</h3>
            <LinkList
              links={venues
                // weird bug where undefined venue is still in response
                .filter((v) => !!v)
                .map((venue) => ({
                  text: `${venue?.name}${venue?.subtitle ? `, ${venue?.subtitle}` : ''}`,
                  to: Routes.festivalVenue(currentFestival?.document?.data.name || '', venue?.name || ''),
                }))}
            />
          </Section>

          <Section gradientBackground reverseGradient rules className="home-view-partners-section">
            <Partners
              title="Partners"
              partners={
                currentFestival?.document?.data?.partners?.map((partner) => ({
                  url: partner.url?.url,
                  logo: partner.logo?.gatsbyImageData,
                  name: partner.name1,
                })) || []
              }
            />
            {!!currentFestival?.document?.data?.media_partners?.length && (
              <Partners
                title="Media Partners"
                partners={
                  currentFestival?.document?.data?.media_partners?.map((partner) => ({
                    url: partner.url?.url,
                    logo: partner.logo?.gatsbyImageData,
                    name: partner.name1,
                  })) || []
                }
              />
            )}
            <div className="partner-link">
              <BTRichText render={currentFestival?.document?.data?.partner_link?.richText} />
            </div>
          </Section>
        </>
      )}

      {!!data.allPrismicEvent?.edges?.length && (
        <Section small className="events-section">
          <EventList
            events={data.allPrismicEvent.edges.map((event) => ({
              image: event.node.data.images?.[0].image?.gatsbyImageData,
              venueTo: event.node.data.venue_link?.url,
              length: event.node.data.length,
              name: event.node.data.name,
              people: event.node.data.people?.map((person) => ({
                name: person.person?.document?.data.name || '',
                to: Routes.person(person.person?.document?.data.name || ''),
              })),
              venueName: event.node.data.venue_name,
              to: Routes.event(event.node.data.name || ''),
              timestamp: event.node.data.start,
            }))}
            upcomingTitle={currentFestival ? 'Other upcoming events' : 'Upcoming events'}
            pastTitle={'Past events'}
          />

          <BTButton to={Routes.events()} className="home-view-events-link">
            All (non-festival) Events
          </BTButton>
        </Section>
      )}

      {!!data.allPrismicBlogPost.edges?.length && (
        <Section gradientBackground rules className="home-view-latest-posts" small>
          <h2>Latest Posts</h2>

          <BlogPostCardGrid
            blogPosts={data.allPrismicBlogPost.edges.map((post) => ({
              authorName: post.node.data.author?.document?.data.name,
              content: post.node.data.article?.text,
              date: post.node.data.date,
              image: post.node.data.image?.gatsbyImageData,
              title: post.node.data.title,
            }))}
          />

          <BTButton to={Routes.blog()} className="home-view-blog-link">
            Blog
          </BTButton>
        </Section>
      )}
    </View>
  );
};

export default HomeView;

export const pageQuery = graphql`
  query HomePage($currentFestival: ID!) {
    prismicHomePage {
      id
      data {
        current_festival {
          document {
            ... on PrismicFestival {
              data {
                name
                date_text
                venue_text
                more_events
                ticket_link {
                  url
                }
                long_description_photo {
                  gatsbyImageData(width: 500, placeholder: BLURRED)
                }
                long_description {
                  richText
                }
                volunteer_description {
                  richText
                }
                volunteer_link {
                  url
                }
                donate_link {
                  url
                }
                partners {
                  name1
                  logo {
                    gatsbyImageData(width: 200, height: 100, placeholder: BLURRED)
                  }
                  url {
                    url
                  }
                }
                media_partners {
                  name1
                  logo {
                    gatsbyImageData(width: 150, height: 100, placeholder: BLURRED)
                  }
                  url {
                    url
                  }
                }
                partner_link {
                  richText
                }
                hide_timetable
              }
            }
          }
        }
      }
    }
    prismicGlobal {
      data {
        logo {
          gatsbyImageData(width: 300, placeholder: BLURRED)
        }
      }
    }
    allPrismicFestivalEvent(
      filter: { data: { festival: { id: { eq: $currentFestival } }, hidden_from_featured: { ne: true } } }
      sort: { fields: data___name }
    ) {
      edges {
        node {
          id
          data {
            name
            venue {
              document {
                ... on PrismicVenue {
                  id
                  data {
                    name
                    subtitle
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicEvent(sort: { fields: data___start, order: DESC }, limit: 20) {
      edges {
        node {
          data {
            name
            length
            images {
              image {
                gatsbyImageData(width: 250, height: 150)
              }
            }
            description {
              richText
            }
            start
            people {
              person {
                document {
                  ... on PrismicPerson {
                    id
                    type
                    data {
                      name
                    }
                  }
                }
              }
            }
            venue_link {
              url
            }
            venue_name
          }
        }
      }
    }
    allPrismicBlogPost(limit: 4, sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          data {
            article {
              richText
              text
            }
            author {
              document {
                ... on PrismicPerson {
                  id
                  data {
                    name
                  }
                }
              }
            }
            date
            title
            image {
              gatsbyImageData(width: 400, height: 300, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
