// @flow strict
import { Fragment, type Node } from 'react';
import { Box, Divider, Flex, SlimBanner, Text } from 'gestalt';
import COMPONENT_DATA, { type ListItemType } from './COMPONENT_DATA.js';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging.js';
import StatusData from './StatusData.js';

const categories = ['figma', 'responsive', 'iOS', 'android', 'accessible'];

function QualityItem({
  category,
  componentStatusData,
}: {|
  category: string,
  componentStatusData: ?ListItemType,
|}) {
  const isAccessibility = category === 'accessible';

  return (
    <Flex gap={2}>
      <Text size="200" weight="bold">
        {`${
          COMPONENT_STATUS_MESSAGING[category]?.shortTitle ||
          COMPONENT_STATUS_MESSAGING[category].title
        }: `}
      </Text>

      <StatusData
        href={isAccessibility ? '#Accessibility' : '#Component-quality-checklist'}
        status={
          (isAccessibility
            ? componentStatusData?.status?.[category].summary || 'notAvailable'
            : componentStatusData?.status?.[category]) ?? 'notAvailable'
        }
        text={
          STATUS_DESCRIPTION[
            isAccessibility
              ? componentStatusData?.status?.[category].summary || 'notAvailable'
              : componentStatusData?.status?.[category] ?? 'notAvailable'
          ].title
        }
      />
    </Flex>
  );
}

type Props = {|
  name: string,
|};

export default function PageHeaderQualitySummary({ name }: Props): Node {
  const componentStatusData = [
    ...COMPONENT_DATA.buildingBlockComponents,
    ...COMPONENT_DATA.generalComponents,
    ...COMPONENT_DATA.utilityComponents,
  ].find((component) => component.name === name);

  const isDeprecated = componentStatusData?.status?.deprecated;

  if (isDeprecated) {
    return (
      <SlimBanner
        iconAccessibilityLabel="Deprecated component"
        message="Deprecated: This component is no longer supported by Gestalt. "
        type="warning"
      />
    );
  }

  return (
    <Flex gap={4} wrap>
      {categories.map((item, i, arr) => (
        <Flex key={`summary-${item}`}>
          <QualityItem category={item} componentStatusData={componentStatusData} />
          {i < arr.length - 1 && (
            <Fragment>
              {/* This spacer element is dumb but otherwise Divider collapses to 1px height */}
              <Box paddingX={2} />
              <Divider />
            </Fragment>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
