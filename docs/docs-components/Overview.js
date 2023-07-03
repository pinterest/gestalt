// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Flex, SegmentedControl } from 'gestalt';
import componentData from './data/components.js';
import { type ComponentCategory, type Platform, type PlatformData } from './data/types.js';
import getByCategory from './data/utils/getByCategory.js';
import getByPlatform from './data/utils/getByPlatform.js';
import prettyPrintPlatform from './data/utils/prettyPrintPlatform.js';
import IllustrationContainer from './IllustrationContainer.js';
import OverviewList from './OverviewList.js';
import Page from './Page.js';
import PageHeader from './PageHeader.js';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';

const sortOrders = ['alphabetical', 'categorical'];

const categoryOrder: $ReadOnlyArray<ComponentCategory> = [
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
  'Building blocks',
  'Utilities',
];

const headerCopyByPlatform = {
  web: 'Gestalt provides an extensive set of React components for use in building larger web experiences and patterns. They include interactive UI components and developer utilities to help with implemention.',
  ios: 'Gestalt provides a growing set of interactive UI components for use in building larger iOS experiences and patterns.',
  android:
    'Gestalt provides a growing set of interactive UI components for use in building larger Android experiences and patterns.',
};

type Props = {|
  platform: Exclude<Platform, 'figma'>,
|};

export default function Overview({ platform }: Props): Node {
  const [order, setOrder] = useState<'alphabetical' | 'categorical'>('alphabetical');

  const platformComponentData = getByPlatform(componentData, { platform });
  const componentsByCategory = categoryOrder.reduce<{| [string]: $ReadOnlyArray<PlatformData> |}>(
    (acc, cur) => ({
      ...acc,
      [`${cur}`]: getByCategory(componentData, { platform, category: cur }),
    }),
    {},
  );

  const prettyPlatform = prettyPrintPlatform(platform);

  return (
    <Page title={`${prettyPlatform} component overview`} hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name={`${prettyPlatform} component overview`}
            description={`${headerCopyByPlatform[platform]}

Not sure which component to use? [Reach out to the Gestalt team.](/team_support/get_help#Slack-channels)`}
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
          <OverviewList platform={platform} headingLevel={2} components={platformComponentData} />
        ) : (
          <Fragment>
            {categoryOrder.map(
              (category) =>
                componentsByCategory[category].length > 0 && (
                  <OverviewList
                    components={componentsByCategory[category]}
                    headingLevel={3}
                    key={category}
                    platform={platform}
                    title={category}
                  />
                ),
            )}
          </Fragment>
        )}
      </Flex>
    </Page>
  );
}
