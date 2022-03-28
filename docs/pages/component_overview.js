// @flow strict
import { Fragment, useState, type Element, type Node } from 'react';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import FOUNDATION_LIST from '../components/componentOverviewFoundationsList.js';
import UTILITIES_LIST from '../components/componentOverviewUtilitiesList.js';
import BUILDING_BLOCKS_LIST from '../components/componentOverviewBuildingBlocksList.js';
import GENERAL_COMPONENT_LIST from '../components/componentOverviewGeneralComponentsList.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import IllustrationCard from '../components/IllustrationCard.js';
import IllustrationSection from '../components/IllustrationSection.js';
import IllustrationContainer from '../components/IllustrationContainer.js';
import Accessibility from '../graphics/foundations/accessibility.svg';

const getIllustrationCardColor = (category: string, hasDarkBackground?: boolean) => {
  const tealBackgrounds = ['Foundations'];
  const grayBackgrounds = ['Utilities', 'Building Blocks'];
  const greenBackgrounds = [
    'building-blocks',
    'Actions',
    'Avatars',
    'Controls',
    'Data',
    'Fields & Forms',
    'Loading',
    'Messaging',
    'Navigation',
    'Pins & Imagery',
    'Structure',
    'Text',
  ];

  if (hasDarkBackground) {
    return 'gray-roboflow-600';
  }

  if (tealBackgrounds.includes(category)) {
    return 'teal-spabattical-700';
  }

  if (grayBackgrounds.includes(category)) {
    return 'gray-roboflow-100';
  }

  if (greenBackgrounds.includes(category)) {
    return 'green-matchacado-0';
  }

  return 'green-matchacado-0';
};

// GENERAL_COMPONENT_LIST is an array with component data. Each array item contains the SVG data and other metadata such as the component category. The following reduce method processes the GENERAL_COMPONENT_LIST array into an object grouping and mapping components per category so that we can map per category and pass each category value to <List />.
const GENERAL_COMPONENT_CATEGORY_MAP = GENERAL_COMPONENT_LIST.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.category]: (acc[cur.category] ?? []).concat(cur),
  }),
  {},
);

export type ListItemType = Array<{|
  svg: Element<typeof Accessibility>,
  name: string,
  description: string,
  category: string,
  path?: string,
  hasDarkBackground?: boolean,
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
            color={getIllustrationCardColor(element.category, element?.hasDarkBackground)}
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
          <Flex gap={2} alignItems="center">
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
              ...GENERAL_COMPONENT_LIST,
            ]}
          />
        ) : (
          <Fragment>
            <List array={FOUNDATION_LIST} title="Foundations" />
            {Object.keys(GENERAL_COMPONENT_CATEGORY_MAP)
              .sort()
              .map((category, idx) => (
                <List key={idx} array={GENERAL_COMPONENT_CATEGORY_MAP[category]} title={category} />
              ))}
            <List array={BUILDING_BLOCKS_LIST} title="Building blocks" />
            <List array={UTILITIES_LIST} title="Utilities" />
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
