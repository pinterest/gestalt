import { ReactNode } from 'react';
import { Box, Button, Link, Text, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
        <Button disabled size="lg" text="Convert to personal account" />
      </Tooltip>
    </Box>
  );
}
