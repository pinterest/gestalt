// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box color="default" padding={1} width={400}>
      <Flex direction="column" gap={4}>
        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          helperText="Pick your favorite shape"
          id="favoriteShape"
          label="Select your favorite shape"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          size="sm"
        />

        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          helperText="Pick your favorite shape"
          id="favoriteShape"
          label="Select your favorite shape"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          size="md"
        />

        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          helperText="Pick your favorite shape"
          id="favoriteShape"
          label="Select your favorite shape"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
          size="lg"
        />
      </Flex>
    </Box>
  );
}
