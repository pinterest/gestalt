// @flow strict
import { type Node } from 'react';
import { Box, Flex, List, TapArea, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={12} direction="column" maxWidth={600}>
        <List label="Need more help?" type="unordered">
          <List.Item
            text={
              <Text>
                <TapArea onTap={() => {}}>
                  <Box padding={2} rounding={2} color="secondary">
                    Visit our Help Center
                  </Box>
                </TapArea>
              </Text>
            }
          />
          <List.Item
            text={
              <Text>
                <TapArea onTap={() => {}}>
                  <Box padding={2} rounding={2}>
                    Request a demo
                  </Box>
                </TapArea>
              </Text>
            }
          />
        </List>
      </Flex>
    </Box>
  );
}
