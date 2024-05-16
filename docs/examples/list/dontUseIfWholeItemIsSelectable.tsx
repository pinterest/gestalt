import {ReactNode} from 'react';
import { Box, Flex, List, TapArea, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={12} maxWidth={600}>
        <List label="Need more help?" type="unordered">
          <List.Item
            text={
              <Text>
                <TapArea onTap={() => {}}>
                  <Box color="secondary" padding={2} rounding={2}>
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
