import {ReactNode} from 'react';
import { Box, Divider, Flex, Heading, Text } from 'gestalt';

function Block({
  title,
  text,
}: {
  title: string,
  text: string
}) {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      <Heading accessibilityLevel="none" size="400">
        {title}
      </Heading>
      <Text size="200">{text}</Text>
    </Flex>
  );
}

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 10, row: 0 }}>
        <Divider />
        <Block
          text="Use the search bar to discover ideas, people and trends. Explore suggested topics or search for topics of your own."
          title="Discover ideas"
        />
        <Divider />
        <Block
          text="Upload an image from your computer or mobile device to create a Pin. You can also create Pins from images you find online."
          title="Create Pins"
        />
        <Divider />
      </Flex>
    </Box>
  );
}
