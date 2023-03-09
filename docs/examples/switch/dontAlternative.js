// @flow strict
import { type Node } from 'react';
import { Flex, Heading, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex direction="column" gap={3} width="100%" maxWidth={300}>
        <Heading size="300" accessibilityLevel={3}>
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
                icon={checked ? 'check-circle' : 'circle-outline'}
                color="default"
                accessibilityLabel={`${checked ? 'checked' : 'unchecked'} circle`}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
