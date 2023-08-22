// @flow strict
import { type Node } from 'react';
import { Box, Button, Link, Text, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Tooltip
        link={
          <Text color="inverse" size="100" weight="bold">
            <Link
              href="https://help.pinterest.com/en/business/article/get-a-business-account"
              target="blank"
            >
              Learn more
            </Link>
          </Text>
        }
        text="There was a problem converting to a personal account."
      >
        <Button size="lg" disabled text="Convert to personal account" />
      </Tooltip>
    </Box>
  );
}
