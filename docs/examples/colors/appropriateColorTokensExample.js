// @flow strict
import { type Node } from 'react';
import { Button, Flex, IconButton, SearchField, Text } from 'gestalt';

export default function AppropriateColorTokensExample(): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 8,
      }}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Flex
        gap={{
          row: 4,
          column: 0,
        }}
      >
        <IconButton icon="speech" accessibilityLabel="Comment" size="md" />
        <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share" size="md" />
      </Flex>
      <Flex
        gap={{
          row: 4,
          column: 0,
        }}
      >
        <Button color="red" text="Primary" />
        <Button color="gray" text="Secondary" />
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
          id="color-do-search"
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
  );
}
