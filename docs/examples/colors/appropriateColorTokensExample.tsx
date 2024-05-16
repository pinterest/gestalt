import { Button, Flex, IconButton, SearchField, Text } from 'gestalt';

export default function AppropriateColorTokensExample() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{
        row: 0,
        column: 8,
      }}
      height="100%"
      justifyContent="center"
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
  );
}
