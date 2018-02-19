// @flow
import React from 'react';
import Box from '../Box/Box';
import Sticky from './Sticky';
import Text from '../Text/Text';
import { ns, card, md, Example, PropTable } from '../../docs/src/cards';

ns(
  'Sticky',
  'Sticky allows for an element to become fixed when it reaches a threshold (top, left, bottom, or right)'
);

card(
  <PropTable
    props={[
      {
        name: 'bottom',
        type: 'number',
      },
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'left',
        type: 'number',
      },
      {
        name: 'right',
        type: 'number',
      },
      {
        name: 'top',
        type: 'number',
      },
    ]}
  />,
  md`
    **Note**: if no threshold is passed to Sticky, it will behave the same as a relatively positioned element
  `,
  { stacked: true }
);

card(
  'Example: Sticky top',
  <Example
    defaultCode={`
<Box color="white" height={200} overflow="scroll">
  <Box height={500} marginTop={10}>
    <Box>
      <Sticky top={0}>
        <Box alignItems="center" color="lightGray" display="flex" height={40}>
          <Text>This should stick</Text>
        </Box>
      </Sticky>
      <Box marginTop={10}>
        <Text>Scroll</Text>
        <Text>Keep scrolling</Text>
        <Text>Scroll more</Text>
      </Box>
    </Box>
    <Box>
      <Sticky top={0}>
      <Box alignItems="center" color="lightGray" display="flex" height={40}>
          <Text>This should also stick</Text>
        </Box>
      </Sticky>
      <Box marginTop={10}>
        <Text>Still scrolling</Text>
        <Text>Tadaaaaa</Text>
      </Box>
    </Box>
  </Box>
</Box>
`}
    scope={{ Box, Sticky, Text }}
  />,
  { stacked: true }
);
