// @flow strict
import { Fragment, type Node as ReactNode } from 'react';
import { Box, Divider, Flex, BannerSlim, Text } from 'gestalt';
import componentData from './data/components';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging';
import { type StatusType } from './data/types';
import getByPlatform from './data/utils/getByPlatform';
import StatusData from './StatusData';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

function QualityItem({
  category,
  status,
}: {
  category: 'figmaStatus' | 'responsive' | 'mobileAdaptive' | 'accessible',
  status: ?(StatusType | 'deprecated'),
}) {
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

type Props = {
  name: string,
};

export default function PageHeaderQualitySummary({ name }: Props): ReactNode {
  const componentStatusData = webComponentData.find((component) => component.name === name)?.status;

  if (!componentStatusData) {
    return null;
  }

  const isDeprecated = componentStatusData?.status === 'deprecated';

  if (isDeprecated) {
    return (
      <BannerSlim
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
