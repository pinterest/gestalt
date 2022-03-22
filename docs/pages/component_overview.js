// @flow strict
import { Fragment, useState, type Element, type Node } from 'react';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import FOUNDATION_LIST from '../components/component_overview_foundations_list.js';
import UTILITIES_LIST from '../components/component_overview_utilities_list.js';
import BUILDING_BLOCKS_LIST from '../components/component_overview_building_blocks_list.js';
import GENERAL_LIST from '../components/component_overview_general_list.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import IllustrationCard from '../components/IllustrationCard.js';
import IllustrationSection from '../components/IllustrationSection.js';
import IllustrationContainer from '../components/IllustrationContainer.js';
import Accessibility from '../graphics/foundations/accessibility.svg';

const getIllustrationCardColor = (category: string, isDark?: boolean) => {
  if (isDark) return 'gray-roboflow-600';

  switch (category) {
    case 'Foundations':
      return 'teal-spabattical-700';
    case 'Utilities':
    case 'Building Blocks':
      return 'gray-roboflow-100';
    case 'building-blocks':
    case 'Actions':
    case 'Avatars':
    case 'Controls':
    case 'Data':
    case 'Fields & Forms':
    case 'Loading':
    case 'Messaging':
    case 'Navigation':
    case 'Pins & Imaginery':
    case 'Structure':
    case 'Text':
      return 'green-matchacado-0';
    default:
      return 'green-matchacado-0';
  }
};

const GENERAL_CATEGORY_MAP = GENERAL_LIST.reduce((previousValue, currentValue) => {
  const newPrevious = { ...previousValue };

  if (newPrevious[currentValue.category]) {
    newPrevious[currentValue.category] = [...previousValue[currentValue.category], currentValue];
  } else {
    newPrevious[currentValue.category] = [currentValue];
  }
  return newPrevious;
}, {});

export type ListItemType = Array<{|
  svg: Element<typeof Accessibility>,
  name: string,
  description: string,
  category: string,
  path?: string,
  isDark?: boolean,
|}>;

function List({ array, title = '' }: {| array: ListItemType, title?: string |}): Node {
  return (
    <IllustrationSection title={title} grid="auto-fill" min={312}>
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
            color={getIllustrationCardColor(element.category, element?.isDark)}
            image={element.svg}
          />
        ))}
    </IllustrationSection>
  );
}

export default function ComponentOverview(): Node {
  const [order, setOrder] = useState('category');

  return (
    <Page title="Component overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Component overview"
            description="Not sure which component you need? Take a look below or set up time with the Gestalt team."
            showSourceLink={false}
          />
        </IllustrationContainer>
        <IllustrationContainer justifyContent="start">
          <Flex gap={2}>
            <Box aria-hidden>
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
            <List array={FOUNDATION_LIST} title="Foundations" />
            {Object.keys(GENERAL_CATEGORY_MAP)
              .sort()
              .map((category, idx) => (
                <List key={idx} array={GENERAL_CATEGORY_MAP[category]} title={category} />
              ))}
            <List array={BUILDING_BLOCKS_LIST} title="Building blocks" />
            <List array={UTILITIES_LIST} title="Utilities" />
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
