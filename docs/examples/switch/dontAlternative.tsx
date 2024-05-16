import {ReactNode} from 'react';
import { Flex, Heading, Icon, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={3} maxWidth={300} width="100%">
        <Heading accessibilityLevel={3} size="300">
          Pinterest notifications
        </Heading>

        <Flex direction="column" gap={4}>
          {[
            { name: 'Comments', checked: true },
            { name: 'Mentions', checked: true },
            { name: 'Views', checked: false },
            { name: 'Saves', checked: true },
          ].map(({ name, checked }) => (
            <Flex key={name} alignItems="center">
              <Flex.Item flex="grow">
                <Text>{name}</Text>
              </Flex.Item>

              <Icon
                accessibilityLabel={`${checked ? 'checked' : 'unchecked'} circle`}
                color="default"
                icon={checked ? 'check-circle' : 'circle-outline'}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
