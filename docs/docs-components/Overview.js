// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Flex, SegmentedControl } from 'gestalt';
import { type ListItemType } from './COMPONENT_DATA.js';
import IllustrationContainer from './IllustrationContainer.js';
import List from './OverviewList.js';
import Page from './Page.js';
import PageHeader from './PageHeader.js';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';

const sortOrders = ['alphabetical', 'categorical'];

type Props = {|
  buildingBlockComponents?: $ReadOnlyArray<ListItemType>,
  generalComponents: $ReadOnlyArray<ListItemType>,
  platform: 'Web' | 'Android' | 'iOS',
  utilityComponents?: $ReadOnlyArray<ListItemType>,
|};

export default function Overview({
  buildingBlockComponents,
  generalComponents,
  platform,
  utilityComponents,
}: Props): Node {
  const [order, setOrder] = useState<'alphabetical' | 'categorical'>('alphabetical');

  const alphabeticalComponentList = [
    ...(utilityComponents ?? []),
    ...(buildingBlockComponents ?? []),
    ...generalComponents,
  ];

  // GENERAL_COMPONENT_LIST is an array with component data. Each array item contains the SVG data and other metadata such as the component category. The following reduce method processes the GENERAL_COMPONENT_LIST array into an object grouping and mapping components per category so that we can map per category and pass each category value to <List />.
  type CategoryMap = { [string]: $ReadOnlyArray<ListItemType> };
  const GENERAL_COMPONENT_CATEGORY_MAP = generalComponents.reduce(
    (acc: CategoryMap, cur: ListItemType) => {
      const newAcc: CategoryMap = { ...acc };
      if (cur?.category) {
        newAcc[cur.category] = [...(newAcc[cur.category] ?? []), cur];
      }
      return newAcc;
    },
    {},
  );

  return (
    <Page title={`${platform} component overview`} hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name={`${platform} component overview`}
            description={`Gestalt provides an extensive set of React components for use in building larger web experiences and patterns. They include interactive UI components and developer utilities to help with implemention.

Not sure which component to use? [Set up time with the Gestalt team.](/team_support/get_help#Slack-channels)`}
            type="guidelines"
          />
        </IllustrationContainer>

        <IllustrationContainer>
          <Box flex="none" minWidth={230} width="40%">
            <SegmentedControl
              items={sortOrders.map(capitalizeFirstLetter)}
              onChange={({ activeIndex }) => {
                setOrder(sortOrders[activeIndex]);
              }}
              selectedItemIndex={sortOrders.findIndex((item) => item === order)}
            />
          </Box>
        </IllustrationContainer>

        {order === 'alphabetical' ? (
          <List platform={platform} headingLevel={2} array={alphabeticalComponentList} />
        ) : (
          <Fragment>
            {Object.keys(GENERAL_COMPONENT_CATEGORY_MAP)
              .sort()
              .map((category) => (
                <List
                  platform={platform}
                  headingLevel={3}
                  key={category}
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
