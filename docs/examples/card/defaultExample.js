// @flow strict
import { type Node } from 'react';
import { Avatar, Button, Box, Card, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box maxWidth={236} padding={8} column={12}>
        <Card image={<Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" />}>
          <Flex direction="column" justifyContent="center">
            <Text align="center" weight="bold">
              <Link href="https://pinterest.com">
                <Box paddingX={3} paddingY={2}>
                  James Jones
                </Box>
              </Link>
            </Text>
            <Button accessibilityLabel="Follow James Jones" color="red" text="Follow" />
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}
