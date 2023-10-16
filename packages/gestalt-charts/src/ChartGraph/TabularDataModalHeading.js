// @flow strict-local
import { type Node } from 'react';
import { Flex, Heading, IconButton, Text, useDefaultLabel, useDeviceType } from 'gestalt';

type Props = {
  title: string,
  toggleTabularDataModal: () => void,
};

export default function TabularDataModalHeading({ title, toggleTabularDataModal }: Props): Node {
  const { accessibilityLabelDismissModal, tabularData } = useDefaultLabel('ChartGraph');

  const deviceType = useDeviceType();

  return (
    <Flex direction="column">
      <Flex justifyContent="between">
        <Heading size="500" accessibilityLevel={1}>
          {title}
        </Heading>
        {deviceType !== 'mobile' ? (
          <IconButton
            accessibilityLabel={accessibilityLabelDismissModal}
            bgColor="white"
            icon="cancel"
            iconColor="darkGray"
            onClick={toggleTabularDataModal}
            size="sm"
          />
        ) : null}
      </Flex>
      <Text size="200" color="subtle">
        {tabularData}
      </Text>
    </Flex>
  );
}
