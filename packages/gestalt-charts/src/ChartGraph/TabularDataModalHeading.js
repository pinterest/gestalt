// @flow strict-local
import { type Node as ReactNode } from 'react';
import { Flex, Heading, IconButton, Text, useDefaultLabel, useDeviceType } from 'gestalt';

type Props = {
  title: string,
  toggleTabularDataModal: () => void,
};

export default function TabularDataModalHeading({
  title,
  toggleTabularDataModal,
}: Props): ReactNode {
  const { accessibilityLabelDismissModal, tabularData } = useDefaultLabel('ChartGraph');

  const deviceType = useDeviceType();

  return (
    <Flex direction="column">
      <Flex justifyContent="between">
        <Heading accessibilityLevel={1} size="500">
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
      <Text color="subtle" size="200">
        {tabularData}
      </Text>
    </Flex>
  );
}
