// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Heading, SelectList, TextField } from 'gestalt';

export default function LayoutsExample(): Node {
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
        <Heading size="400" accessibilityLevel={2}>
          Form Title
        </Heading>

        <TextField
          label="TextField 1"
          id="textfield1"
          onChange={() => {}}
          placeholder="Placeholder"
        />

        <Flex gap={3} wrap>
          <Flex.Item flex="grow" minWidth={250}>
            <TextField
              label="TextField 2"
              id="textfield2"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Flex.Item>
          <Flex.Item flex="grow" minWidth={250}>
            <TextField
              label="TextField 3"
              id="textfield3"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Flex.Item>
        </Flex>

        <SelectList
          label="SelectList"
          id="selectlist"
          options={[
            {
              value: 'belgium',
              label: 'Belgium',
            },
            {
              value: 'france',
              label: 'France',
            },
            {
              value: 'usa',
              label: 'USA',
            },
          ]}
          placeholder="Placeholder"
          onChange={() => {}}
        />

        <Flex
          gap={{
            row: 2,
            column: 0,
          }}
          justifyContent="end"
          wrap
        >
          <Button text="Cancel" size="lg" />
          <Button text="Submit" color="red" size="lg" type="submit" />
        </Flex>
      </Flex>
    </Box>
  );
}
