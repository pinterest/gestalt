// @flow strict
import { Fragment, useState, type Element, type Node } from 'react';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import COMPONENT_DATA from '../../../docs-components/COMPONENT_DATA.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import IllustrationCard from '../../../docs-components/IllustrationCard.js';
import IllustrationSection from '../../../docs-components/IllustrationSection.js';
import IllustrationContainer from '../../../docs-components/IllustrationContainer.js';
import Accessibility from '../../../graphics/foundations/accessibility.svg';

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
const GENERAL_COMPONENT_CATEGORY_MAP = COMPONENT_DATA.generalComponents.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.category]: (acc[cur.category] ?? []).concat(cur),
  }),
  {},
);

type Status = 'notAvailable' | 'partial' | 'planned' | 'ready';

export type AccessibleStatus = {|
  summary: ?Status,
  a11yVisual: ?Status,
  a11yScreenreader: ?Status,
  a11yNavigation: ?Status,
  a11yComprehension: ?Status,
|};

export type ListItemType = Array<{|
  category: string,
  description: string,
  hasDarkBackground?: boolean,
  name: string,
  path?: string,
  status?: {|
    accessible: AccessibleStatus,
    android: Status,
    badge: null | 'New' | 'Pilot',
    deprecated?: boolean,
    documentation: Status,
    iOS: Status,
    figma: Status,
    figmaOnly?: boolean,
    responsive: Status,
  |},
  svg: Element<typeof Accessibility>,
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
    <Page title="Web component overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Web component overview"
            description="Not sure which component you need? Take a look below or set up time with the Gestalt team."
            type="guidelines"
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
              ...COMPONENT_DATA.foundations,
              ...COMPONENT_DATA.utilityComponents,
              ...COMPONENT_DATA.buildingBlockComponents,
              ...COMPONENT_DATA.generalComponents,
            ]}
          />
        ) : (
          <Fragment>
            <List array={COMPONENT_DATA.foundations} title="Foundations" />
            {Object.keys(GENERAL_COMPONENT_CATEGORY_MAP)
              .sort()
              .map((category, idx) => (
                <List key={idx} array={GENERAL_COMPONENT_CATEGORY_MAP[category]} title={category} />
              ))}
            <List array={COMPONENT_DATA.buildingBlockComponents} title="Building blocks" />
            <List array={COMPONENT_DATA.utilityComponents} title="Utilities" />
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
