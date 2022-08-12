// @flow strict
import { type Node } from 'react';
import {
  Box,
  Button,
  ColorSchemeProvider,
  Flex,
  IconButton,
  SearchField,
  TapArea,
  Text,
} from 'gestalt';

export default function AlternativeColorTokensExample(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <ColorSchemeProvider colorScheme="dark" id="dark-example-dont">
        <Box color="default" padding={10} height="100%">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
            alignItems="center"
            height="100%"
          >
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
            >
              <IconButton icon="speech" accessibilityLabel="Comment" />
              <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share" />
            </Flex>
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
            >
              <Button color="red" text="Primary" />
              <Box color="warningWeak" rounding="pill" padding={3}>
                <TapArea>
                  <Text weight="bold" color="light">
                    Secondary
                  </Text>
                </TapArea>
              </Box>
              <Button color="blue" text="Shop" />
            </Flex>
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
            >
              <SearchField
                accessibilityLabel="Search you Pins"
                id="color-dont-search"
                placeholder="Search your Pins"
                onChange={() => {}}
              />
            </Flex>
            <Flex
              gap={{
                row: 8,
                column: 0,
              }}
            >
              <Text>Default text</Text>
              <Text color="subtle">Subtle text</Text>
            </Flex>
          </Flex>
        </Box>
      </ColorSchemeProvider>
    </Flex>
  );
}
