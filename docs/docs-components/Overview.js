// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Flex, SegmentedControl } from 'gestalt';
import componentData from './data/components';
import { type ComponentCategory, type Platform, type PlatformData } from './data/types';
import getByCategory from './data/utils/getByCategory';
import getByPlatform from './data/utils/getByPlatform';
import prettyPrintPlatform from './data/utils/prettyPrintPlatform';
import IllustrationContainer from './IllustrationContainer';
import OverviewList from './OverviewList';
import Page from './Page';
import PageHeader from './PageHeader';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

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

type Props = {
  platform: Exclude<Platform, 'figma'>,
};

export default function Overview({ platform }: Props): ReactNode {
  const [order, setOrder] = useState<'alphabetical' | 'categorical'>('alphabetical');

  const platformComponentData = getByPlatform(componentData, { platform });
  const componentsByCategory = categoryOrder.reduce<{
    [string]: $ReadOnlyArray<PlatformData>,
  }>(
    (acc, cur) => ({
      ...acc,
      [`${cur}`]: getByCategory(componentData, { platform, category: cur }),
    }),
    {},
  );

  const prettyPlatform = prettyPrintPlatform(platform);

  return (
    <Page hideEditLink hideSideNav title={`${prettyPlatform} component overview`}>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            description={`${headerCopyByPlatform[platform]}

Not sure which component to use? [Reach out to the Gestalt team.](/team_support/get_help#Slack-channels)`}
            name={`${prettyPlatform} component overview`}
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
          <OverviewList components={platformComponentData} headingLevel={2} platform={platform} />
        ) : (
          <Fragment>
            {categoryOrder.map(
              (category) =>
                componentsByCategory[category].length > 0 && (
                  <OverviewList
                    key={category}
                    components={componentsByCategory[category]}
                    headingLevel={3}
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
