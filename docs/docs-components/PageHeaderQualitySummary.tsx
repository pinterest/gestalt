import { Fragment } from 'react';
import { BannerSlim, Box, Divider, Flex, Text } from 'gestalt';
import componentData from './data/components';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging';
import { StatusType } from './data/types';
import getByPlatform from './data/utils/getByPlatform';
import StatusData from './StatusData';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

function QualityItem({
  category,
  status,
}: {
  category: 'figmaStatus' | 'responsive' | 'mobileAdaptive' | 'accessible';
  status: StatusType | 'deprecated' | null | undefined;
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
  name: string;
};

export default function PageHeaderQualitySummary({ name }: Props) {
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
      {['figmaStatus', 'responsive', 'mobileAdaptive'].map((item, i, arr) => (
        <Flex key={`summary-${item}`}>
          <QualityItem
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"accessible" | "mobileAdaptive" | "figmaStatus" | "responsive"'.
            category={item}
            status={
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ComponentStatus'.
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
