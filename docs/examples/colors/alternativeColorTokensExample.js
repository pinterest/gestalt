// @flow strict
import { type Node as ReactNode } from 'react';
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

export default function AlternativeColorTokensExample(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <ColorSchemeProvider colorScheme="dark" id="dark-example-dont">
        <Box color="default" height="100%" padding={10}>
          <Flex
            alignItems="center"
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
            height="100%"
          >
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
            >
              <IconButton accessibilityLabel="Comment" icon="speech" size="md" />
              <IconButton accessibilityLabel="Share" icon="share" iconColor="darkGray" size="md" />
            </Flex>
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
            >
              <Button color="red" text="Primary" />
              <Box color="warningWeak" padding={3} rounding="pill">
                <TapArea>
                  <Text color="light" weight="bold">
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
                onChange={() => {}}
                placeholder="Search your Pins"
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
