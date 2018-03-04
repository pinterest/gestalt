// @flow
import * as React from 'react';
import { Box, Text, Divider } from 'gestalt';
import { ns, card, Example, md, PropTable } from './cards';

ns(
  'Divider',
  'If you have two things that need to be separated, put a `Divider` between them.'
);

card(<PropTable props={[]} />, { heading: false });

card(
  'Example',
  md`
    You can use this component for a visual divider between two elements.
  `,
  <Example
    defaultCode={`
<Box color="white">
  <Box padding={2}>
    <Text>Some content</Text>
  </Box>
  <Divider />
  <Box padding={2}>
    <Text>Other content</Text>
  </Box>
</Box>
`}
    scope={{ Box, Divider, Text }}
  />,
  { stacked: true }
);
