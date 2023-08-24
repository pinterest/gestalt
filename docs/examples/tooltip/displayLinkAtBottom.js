// @flow strict
import { type Node } from 'react';
import { Box, Flex, IconButton, Link, Text, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 2, column: 0 }} justifyContent="center" alignItems="center">
        <Text>Enable expanded targeting</Text>
        <Tooltip
          text="Use your Pin to expand your targeting."
          link={
            <Text color="inverse" size="100" weight="bold">
              <Link
                href="https://help.pinterest.com/en/business/article/expanded-targeting"
                target="blank"
              >
                Learn more
              </Link>
            </Text>
          }
        >
          <IconButton
            accessibilityLabel="Additional info."
            bgColor="white"
            icon="info-circle"
            iconColor="darkGray"
            size="sm"
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
