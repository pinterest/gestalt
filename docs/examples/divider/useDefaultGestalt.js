// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Divider, Flex, Heading, Link, Text } from 'gestalt';

function Block({ title, text }: { title: string, text: $ReadOnlyArray<string> }) {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">
        {title}
      </Heading>
      {text.map((item) => (
        <Text key={item} size="200" underline>
          <Link href="#" target="blank">
            {item}
          </Link>
        </Text>
      ))}
    </Flex>
  );
}

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
        <Block
          text={['Add a Pinterest widget', 'Upgrade the Pinterest App', 'Interact with Idea Pins']}
          title="Get started"
        />
        <Divider />
        <Block
          text={[
            'Edit notification settings',
            'Two-factor authentication',
            'Log in and out of Pinterest',
          ]}
          title="Manage Account"
        />
      </Flex>
    </Box>
  );
}
