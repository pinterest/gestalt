import { ReactNode } from 'react';
import { Box, Button, Flex, Heading, SelectList, TextField } from 'gestalt';

export default function LayoutsExample() {
  return (
    <Box padding={4}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 6,
        }}
        maxWidth={800}
        width="100%"
        wrap
      >
        <Heading accessibilityLevel={2} size="400">
          Form Title
        </Heading>

        <TextField
          id="textfield1"
          label="TextField 1"
          onChange={() => {}}
          placeholder="Placeholder"
        />

        <Flex gap={3} wrap>
          <Flex.Item flex="grow" minWidth={250}>
            <TextField
              id="textfield2"
              label="TextField 2"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Flex.Item>
          <Flex.Item flex="grow" minWidth={250}>
            <TextField
              id="textfield3"
              label="TextField 3"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Flex.Item>
        </Flex>

        <SelectList
          id="selectlist"
          label="SelectList"
          onChange={() => {}}
          placeholder="Placeholder"
        >
          {[
            { value: 'belgium', label: 'Belgium' },
            { value: 'france', label: 'France' },
            { value: 'usa', label: 'USA' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>

        <Flex
          gap={{
            row: 2,
            column: 0,
          }}
          justifyContent="end"
          wrap
        >
          <Button size="lg" text="Cancel" />
          <Button color="red" size="lg" text="Submit" type="submit" />
        </Flex>
      </Flex>
    </Box>
  );
}
