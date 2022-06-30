// @flow strict
import { type Node } from 'react';
import { Flex, Divider, Box, Text, SlimBanner } from 'gestalt';
import COMPONENT_DATA from './COMPONENT_DATA.js';
import StatusData from './StatusData.js';
import { STATUS_DESCRIPTION, COMPONENT_STATUS_MESSAGING } from './COMPONENT_STATUS_MESSAGING.js';

type Props = {|
  name: string,
|};

export default function PageHeaderQualitySumary({ name }: Props): Node {
  const componentStatusData = [
    ...COMPONENT_DATA.buildingBlockComponents,
    ...COMPONENT_DATA.generalComponents,
    ...COMPONENT_DATA.utilityComponents,
  ].find((cmpName) => cmpName.name === name);

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
    <Box marginStart={-4}>
      <Flex wrap>
        {['figma', 'responsive', 'iOS', 'android', 'accessible'].map((item, index) => (
          <Flex key={`summary-${index}`}>
            <Box paddingX={4}>
              <Flex gap={2}>
                <Text size="200" weight="bold">
                  {`${
                    COMPONENT_STATUS_MESSAGING[item]?.shortTitle ||
                    COMPONENT_STATUS_MESSAGING[item].title
                  }: `}
                </Text>
                <StatusData
                  key={item}
                  status={
                    (item === 'accessible'
                      ? componentStatusData?.status?.[item].summary || 'notAvailable'
                      : componentStatusData?.status?.[item]) ?? 'notAvailable'
                  }
                  href={item === 'accessible' ? '#Accessibility' : '#Component-Quality-Checklist'}
                  text={
                    STATUS_DESCRIPTION[
                      item === 'accessible'
                        ? componentStatusData?.status?.[item].summary || 'notAvailable'
                        : componentStatusData?.status?.[item] ?? 'notAvailable'
                    ].title
                  }
                />
              </Flex>
            </Box>
            <Divider />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
