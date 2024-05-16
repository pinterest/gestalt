import { ReactNode } from 'react';
import { Box, Flex, IconButton, Link, Text, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        <Text>Enable expanded targeting</Text>
        <Tooltip
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
          text="Use your Pin to expand your targeting."
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
