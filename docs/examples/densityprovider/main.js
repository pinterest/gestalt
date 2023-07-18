// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, DensityProvider, SegmentedControl, Text, TextField } from 'gestalt';

export default function Example(): Node {
  const SegmentedControlItems = ['News', 'You', 'Messages'];
  const sizes = ['sm', 'md', 'lg'];

  const [selectedIndex, setSelectedIndex] = useState(1);

  // eslint-disable-next-line react/no-unstable-nested-components
  function Section({ children, title }: {| children: Node, title?: string |}) {
    return (
      <Box marginTop={2} marginBottom={2}>
        <Box marginTop={2} marginBottom={2}>
          <Text weight="bold" size="200">
            {title}
          </Text>
        </Box>
        {children}
      </Box>
    );
  }

  return (
    <Box display="flex" direction="column" padding={10} height="100%" width="80%" overflow="scroll">
      <Text weight="bold" size="500">
        Gestalt Density Provider
      </Text>
      <Box marginTop={2} />
      <SegmentedControl
        items={sizes}
        selectedItemIndex={selectedIndex}
        onChange={({ activeIndex }) => {
          setSelectedIndex(activeIndex);
        }}
      />

      <Box marginTop={2} marginBottom={2} />

      <DensityProvider size={sizes[selectedIndex]}>
        <Section title="Button">
          <Button text="Submit" />
        </Section>

        <Section title="TextField">
          <TextField id="example" onChange={() => {}} placeholder="First name" />
        </Section>

        <Section title="Segmented Control">
          <SegmentedControl items={SegmentedControlItems} />
        </Section>
      </DensityProvider>
    </Box>
  );
}
