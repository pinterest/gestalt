// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, RadioGroup, Flex, Text } from 'gestalt';
import Page from './Page.js';
import PageHeader from './PageHeader.js';
import List from './OverviewList.js';
import IllustrationContainer from './IllustrationContainer.js';
import { type ListItemType } from './COMPONENT_DATA.js';

export default function Overview({
  buildingBlockComponents,
  generalComponents,
  platform,
  utilityComponents,
}: {|
  buildingBlockComponents?: $ReadOnlyArray<ListItemType>,
  generalComponents: $ReadOnlyArray<ListItemType>,
  platform: 'Web' | 'Android' | 'iOS',
  utilityComponents?: $ReadOnlyArray<ListItemType>,
|}): Node {
  const [order, setOrder] = useState('alphabetical');

  const alphabeticalComponentList = [
    ...(utilityComponents ?? []),
    ...(buildingBlockComponents ?? []),
    ...generalComponents,
  ];

  // GENERAL_COMPONENT_LIST is an array with component data. Each array item contains the SVG data and other metadata such as the component category. The following reduce method processes the GENERAL_COMPONENT_LIST array into an object grouping and mapping components per category so that we can map per category and pass each category value to <List />.
  const GENERAL_COMPONENT_CATEGORY_MAP = generalComponents.reduce(
    (acc, cur) => ({
      ...acc,
      // $FlowFixMe[invalid-computed-prop]
      [cur.category]: (acc[cur.category] ?? []).concat(cur),
    }),
    {},
  );

  return (
    <Page title={`${platform} component overview`} hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name={`${platform} component overview`}
            description={`Gestalt provides an extensive set of React components for use in building larger web experiences and patterns. They include interactive UI components and developer utilities to help with implemention.

Not sure which component to use? [Set up time with the Gestalt team.](/get_started/how_to_work_with_us#Slack-channels)`}
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationContainer justifyContent="start">
          <Flex gap={6} alignItems="center">
            <Box aria-hidden>
              <Text size="200">Sort by</Text>
            </Box>
            <RadioGroup
              id="overview"
              legendDisplay="hidden"
              legend="Sort Gestalt components alphabetically or categorically"
              direction="row"
            >
              <RadioGroup.RadioButton
                checked={order === 'alphabetical'}
                id="alphabetical"
                label="Alphabetical"
                name="overviewSort"
                onChange={() => setOrder('alphabetical')}
                value="alphabetical"
                size="sm"
              />
              <RadioGroup.RadioButton
                checked={order === 'category'}
                id="category"
                label="Category"
                name="overviewSort"
                onChange={() => setOrder('category')}
                value="category"
                size="sm"
              />
            </RadioGroup>
          </Flex>
        </IllustrationContainer>
        {order === 'alphabetical' ? (
          <List platform={platform} headingLevel={2} array={alphabeticalComponentList} />
        ) : (
          <Fragment>
            {Object.keys(GENERAL_COMPONENT_CATEGORY_MAP)
              .sort()
              .map((category, idx) => (
                <List
                  platform={platform}
                  headingLevel={3}
                  key={idx}
                  array={GENERAL_COMPONENT_CATEGORY_MAP[category]}
                  title={category}
                />
              ))}
            {buildingBlockComponents ? (
              <List
                platform={platform}
                headingLevel={3}
                array={buildingBlockComponents}
                title="Building blocks"
              />
            ) : null}
            {utilityComponents ? (
              <List
                platform={platform}
                headingLevel={3}
                array={utilityComponents}
                title="Utilities"
              />
            ) : null}
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
