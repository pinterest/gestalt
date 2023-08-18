// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, TableOfContents, Text } from 'gestalt';

export default function Example(): Node {
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
      <Flex justifyContent="between" alignItems="start" gap={10}>
        <Flex width="360px" flex="grow" direction="column" gap={2}>
          <Heading>Your dashboard</Heading>

          <Heading size="500" id="section-1">
            Section 1
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

          <Heading size="500" id="section-2">
            Section 2
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

          <Heading size="500" id="section-3">
            Section 3
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Flex>

        <Box width="120px" position="relative" marginStart={10}>
          <Box width="120px" height="100%" overflow="auto" position="fixed" top marginTop={8}>
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
