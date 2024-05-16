import {ReactNode} from 'react';
import { Box, Flex, Heading, TableOfContents, Text } from 'gestalt';

export default function Example() {
  const { hash } = window.location;
  const items = [
    {
      label: 'Section 1',
      href: '#section-1',
      active: hash === '#section-1',
    },
    {
      label: 'Section 2',
      href: '#section-2',
      active: hash === '#section-2',
    },
    {
      label: 'Section 3',
      href: '#section-3',
      active: hash === '#section-3',
    },
  ];

  return (
    <Box padding={8} width="100%">
      <Flex alignItems="start" gap={10} justifyContent="between">
        <Flex direction="column" flex="grow" gap={2} width="360px">
          <Heading>Your dashboard</Heading>

          <Heading id="section-1" size="500">
            Section 1
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

          <Heading id="section-2" size="500">
            Section 2
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

          <Heading id="section-3" size="500">
            Section 3
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Flex>

        <Box marginStart={10} position="relative" width="120px">
          <Box height="100%" marginTop={8} overflow="auto" position="fixed" top width="120px">
            <TableOfContents title="Page Contents">
              {items.map((item) => (
                <TableOfContents.Item key={item.label} {...item} />
              ))}
            </TableOfContents>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
