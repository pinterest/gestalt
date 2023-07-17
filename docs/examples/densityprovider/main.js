// @flow strict
import { type Node } from 'react';
import { Box, Button, SegmentedControl, Text, TextField } from 'gestalt';

const SegmentedControlItems = ['News', 'You', 'Messages'];

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

export default function Example(): Node {
  return (
    <Box display="flex" direction="column" padding={10} height="100%" width="80%" overflow="scroll">
      <Text weight="bold" size="500">
        Gestalt Density Provider
      </Text>
      <Box marginTop={2} />
      <SegmentedControl items={['Sm', 'Md', 'Lg']} />

      <Box marginTop={2} marginBottom={2} />

      <Section title="Button">
        <Button text="Submit" />
      </Section>

      <Section title="TextField">
        <TextField id="example" onChange={() => {}} placeholder="First name" />
      </Section>

      <Section title="Segmented Control">
        <SegmentedControl items={SegmentedControlItems} />
      </Section>
    </Box>
  );
}
