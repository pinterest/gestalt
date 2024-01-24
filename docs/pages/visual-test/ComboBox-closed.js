// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box color="default" padding={1} width={400}>
      <Flex direction="column" gap={4}>
        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          label="Select your favorite shape"
          id="favoriteShape"
          size="sm"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          helperText="Pick your favorite shape"
        />

        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          label="Select your favorite shape"
          id="favoriteShape"
          size="md"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          helperText="Pick your favorite shape"
        />

        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          label="Select your favorite shape"
          size="lg"
          id="favoriteShape"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          helperText="Pick your favorite shape"
        />
      </Flex>
    </Box>
  );
}
