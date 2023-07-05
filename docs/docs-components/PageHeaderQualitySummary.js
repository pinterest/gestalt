// @flow strict
import { Fragment, type Node } from 'react';
import { Box, Divider, Flex, SlimBanner, Text } from 'gestalt';
import componentData from './data/components.js';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging.js';
import { type StatusType } from './data/types.js';
import getByPlatform from './data/utils/getByPlatform.js';
import StatusData from './StatusData.js';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

function QualityItem({
  category,
  status,
}: {|
  category: 'figmaStatus' | 'responsive' | 'mobileAdaptive' | 'accessible',
  status: ?(StatusType | 'deprecated'),
|}) {
  const isAccessibility = category === 'accessible';

  return (
    <Flex gap={2}>
      <Text size="200" weight="bold">
        {`${
          COMPONENT_STATUS_MESSAGING[category]?.shortTitle ??
          COMPONENT_STATUS_MESSAGING[category]?.title
        }: `}
      </Text>

      <StatusData
        href={isAccessibility ? '#Accessibility' : '#Component-quality-checklist'}
        status={status ?? 'notAvailable'}
        text={STATUS_DESCRIPTION[status ?? 'notAvailable'].title}
      />
    </Flex>
  );
}

type Props = {|
  name: string,
|};

export default function PageHeaderQualitySummary({ name }: Props): Node {
  const componentStatusData = webComponentData.find((component) => component.name === name)?.status;

  if (!componentStatusData) {
    return null;
  }

  const isDeprecated = componentStatusData?.status === 'deprecated';

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
      {['figmaStatus', 'responsive', 'mobileAdaptive', 'accessible'].map((item, i, arr) => (
        <Flex key={`summary-${item}`}>
          <QualityItem
            category={item}
            status={
              item === 'accessible' ? componentStatusData[item]?.summary : componentStatusData[item]
            }
          />
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
