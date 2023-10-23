// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

function Block({ title, text }: { title: string, text: string }) {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">
        {title}
      </Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );
}

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 10, row: 0 }}>
        <Block
          title="Discover ideas"
          text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own."
        />
        <Block
          title="Create Pins"
          text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online."
        />
      </Flex>
    </Box>
  );
}
