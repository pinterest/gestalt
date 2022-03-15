// @flow strict
import { Fragment, useState, type Element, type Node } from 'react';
import FOUNDATION_LIST from './component_overview_foundation_list.js';
import UTILITIES_LIST from './component_overview_utilities_list.js';
import BUILDING_BLOCKS_LIST from './component_overview_building_blocks_list.js';
import GENERAL_LIST from './component_overview_general_list.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import IllustrationCard from '../components/IllustrationCard.js';
import IllustrationSection from '../components/IllustrationSection.js';
import IllustrationContainer from '../components/IllustrationContainer.js';
import Accessibility from '../graphics/foundation/accessibility.svg';

const COLOR_MAP = {
  foundation: 'teal-spabattical-600',
  utilities: 'gray-roboflow-100',
  'building-blocks': 'gray-roboflow-100',
};

export type ListItemType = Array<{|
  svg: Element<typeof Accessibility>,
  name: string,
  description: string,
  category: string,
  path?: string,
|}>;

const List = ({ array, title = '' }: {| array: ListItemType, title: string |}) => (
  <IllustrationSection title={title}>
    {array
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((element, idx) => (
        <IllustrationCard
          key={idx}
          href={element?.path ?? `/${element.name.replace(/\s/g, '_').toLowerCase()}`}
          title={element.name}
          description={element.description}
          color={COLOR_MAP[element.category]}
          image={element.svg}
        />
      ))}
  </IllustrationSection>
);

export default function ComponentOverview(): Node {
  const [order, setOrder] = useState('category');

  return (
    <Page title="Component overview" hideSideNav hideEditLink>
      <PageHeader
        name="Component overview"
        description="Not sure which component you need? Take a look below or set up time with the Gestalt team!"
        showSourceLink={false}
      />
      <Box width="100%">
        <Flex direction="column">
          <IllustrationContainer justifyContent="start">
            <Flex gap={2}>
              <Box aria-hidden={true}>
                <Text>Sort by</Text>
              </Box>
              <Fieldset
                legend="Sort Gestalt components alphabetically or categorically"
                legendDisplay="hidden"
              >
                <Flex gap={2}>
                  <RadioButton
                    checked={order === 'category'}
                    id="category"
                    label="Category"
                    name="category"
                    onChange={() => setOrder('category')}
                    value="category"
                  />
                  <RadioButton
                    checked={order === 'alphabetical'}
                    id="alphabetical"
                    label="Alphabetical"
                    name="alphabetical"
                    onChange={() => setOrder('alphabetical')}
                    value="alphabetical"
                  />
                </Flex>
              </Fieldset>
            </Flex>
          </IllustrationContainer>
          {order === 'alphabetical' ? (
            <List
              array={[
                ...FOUNDATION_LIST,
                ...UTILITIES_LIST,
                ...BUILDING_BLOCKS_LIST,
                ...GENERAL_LIST,
              ]}
            />
          ) : (
            <Fragment>
              <List array={FOUNDATION_LIST} title="Foundation" />
              <List array={GENERAL_LIST} title="General" />
              <List array={BUILDING_BLOCKS_LIST} title="Building blocks" />
              <List array={UTILITIES_LIST} title="Utilities" />
            </Fragment>
          )}
        </Flex>
      </Box>
    </Page>
  );
}
