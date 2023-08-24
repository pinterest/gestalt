// @flow strict
import { type Node } from 'react';
import { Box, Flex, IconButton, Label, Text, TextField, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 1, row: 0 }}>
        <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
          <Label htmlFor="business-url-field">
            <Text size="100">Business URL</Text>
          </Label>
          <Tooltip text="This is the site users will be redirected to when interacting with your ad">
            <IconButton
              accessibilityLabel="Additional info"
              bgColor="white"
              icon="info-circle"
              iconColor="darkGray"
              size="md"
              padding={1}
            />
          </Tooltip>
        </Flex>
        <TextField id="business-url-field" onChange={() => {}} />
      </Flex>
    </Box>
  );
}
