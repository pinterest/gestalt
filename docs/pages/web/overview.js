// @flow strict
import { Fragment, useState, type Element, type Node } from 'react';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import COMPONENT_DATA from '../../docs-components/COMPONENT_DATA.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import IllustrationCard from '../../docs-components/IllustrationCard.js';
import IllustrationSection from '../../docs-components/IllustrationSection.js';
import IllustrationContainer from '../../docs-components/IllustrationContainer.js';
import Accessibility from '../../graphics/foundations/accessibility.svg';

type Category =
  | 'Actions'
  | 'Avatars'
  | 'Building blocks'
  | 'Controls'
  | 'Data'
  | 'Fields and forms'
  | 'Foundations'
  | 'Help and guidance'
  | 'Indicators'
  | 'Loading'
  | 'Messaging'
  | 'Navigation'
  | 'Overlays'
  | 'Pilot'
  | 'Pins and imagery'
  | 'Structure'
  | 'Text'
  | 'Utilities'
  | '';

const getIllustrationCardColor = (category: Category, hasDarkBackground?: boolean) => {
  const tealBackgrounds = ['Foundations'];
  const grayBackgrounds = ['Utilities', 'Building blocks'];
  const greenBackgrounds = [
    'Actions',
    'Avatars',
    'Controls',
    'Data',
    'Fields and forms',
    'Help and guidance',
    'Indicators',
    'Loading',
    'Messaging',
    'Navigation',
    'Overlays',
    'Pins and imagery',
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
    // $FlowFixMe[invalid-computed-prop] I have no idea how to fix this =/
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

export type ListItemType = {|
  category: Category,
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
|};

function List({
  array,
  headingLevel,
  title = '',
}: {|
  array: $ReadOnlyArray<ListItemType>,
  headingLevel: 2 | 3,
  title?: string,
|}): Node {
  return (
    <IllustrationSection title={title} grid="auto-fill" min={312}>
      {[...array]
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
            headingLevel={headingLevel}
            key={idx}
            href={element?.path ?? `/web/${element.name.replace(/\s/g, '_').toLowerCase()}`}
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
  const [order, setOrder] = useState('alphabetical');

  return (
    <Page title="Web component overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Web component overview"
            description={`Gestalt provides an extensive set of React components for use in building larger web experiences and patterns. They include interactive UI components and developer utilities to help with implemention.

Not sure which component to use? [Set up time with the Gestalt team.](/get_started/how_to_work_with_us#Slack-channels)`}
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationContainer justifyContent="start">
          <Flex
            gap={{
              row: 2,
              column: 0,
            }}
            alignItems="center"
          >
            <Box aria-hidden>
              <Text>Sort by</Text>
            </Box>
            <Fieldset
              legend="Sort Gestalt components alphabetically or categorically"
              legendDisplay="hidden"
            >
              <Flex
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <RadioButton
                  checked={order === 'alphabetical'}
                  id="alphabetical"
                  label="Alphabetical"
                  name="overviewSort"
                  onChange={() => setOrder('alphabetical')}
                  value="alphabetical"
                />
                <RadioButton
                  checked={order === 'category'}
                  id="category"
                  label="Category"
                  name="overviewSort"
                  onChange={() => setOrder('category')}
                  value="category"
                />
              </Flex>
            </Fieldset>
          </Flex>
        </IllustrationContainer>
        {order === 'alphabetical' ? (
          <List
            headingLevel={2}
            array={[
              ...COMPONENT_DATA.utilityComponents,
              ...COMPONENT_DATA.buildingBlockComponents,
              ...COMPONENT_DATA.generalComponents,
            ]}
          />
        ) : (
          <Fragment>
            {Object.keys(GENERAL_COMPONENT_CATEGORY_MAP)
              .sort()
              .map((category, idx) => (
                <List
                  headingLevel={3}
                  key={idx}
                  array={GENERAL_COMPONENT_CATEGORY_MAP[category]}
                  title={category}
                />
              ))}
            <List
              headingLevel={3}
              array={COMPONENT_DATA.buildingBlockComponents}
              title="Building blocks"
            />
            <List headingLevel={3} array={COMPONENT_DATA.utilityComponents} title="Utilities" />
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
