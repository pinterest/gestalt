// @flow
import * as React from 'react';
import Column from './Column';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { ns, card, md, PropTable, Example } from '../../.corkboard/src/cards';

ns('Column', 'Gestalt supports a 12-column system.');

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'span',
        type: '0 .. 12',
        required: true,
        responsive: true,
      },
    ]}
  />,
  { heading: false }
);

const Content = ({
  label,
  smLabel,
  mdLabel,
  lgLabel,
}: {
  label: string,
  smLabel: string,
  mdLabel: string,
  lgLabel: string,
}) => (
  <Box color="lightGray" padding={1}>
    <Box display="flex" color="white" justifyContent="center" paddingY={2}>
      <Box display="flex" smDisplay="none">
        <Text>{label}</Text>
      </Box>

      <Box display="none" smDisplay="flex" mdDisplay="none">
        <Text>{smLabel || label}</Text>
      </Box>

      <Box display="none" mdDisplay="flex" lgDisplay="none">
        <Text>{mdLabel || smLabel || label}</Text>
      </Box>

      <Box display="none" lgDisplay="flex">
        <Text>{lgLabel || mdLabel || smLabel || label}</Text>
      </Box>
    </Box>
  </Box>
);

card(
  'Example: Basic columns',
  <Example
    defaultCode={`

<Box marginTop={-2} marginBottom={-2}>
  <Box display="flex" direction="row" paddingY={2}>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
    <Column span={1}><Content label={1} /></Column>
  </Box>

  <Box display="flex" direction="row" paddingY={2}>
    <Column span={8}><Content label={8} /></Column>
    <Column span={4}><Content label={4} /></Column>
  </Box>

  <Box display="flex" direction="row" paddingY={2}>
    <Column span={4}><Content label={4} /></Column>
    <Column span={4}><Content label={4} /></Column>
    <Column span={4}><Content label={4} /></Column>
  </Box>

  <Box display="flex" direction="row" paddingY={2}>
    <Column span={6}><Content label={6} /></Column>
    <Column span={6}><Content label={6} /></Column>
  </Box>
</Box>
`}
    scope={{ Box, Column, Content }}
  />,
  { stacked: true }
);

card(
  'Example: Responsive columns',
  md`
    Column supports setting a span at our 4 responsive breakpoints: xs, sm, md, lg. Each sets the span of the column from that breakpoint and up. If you don't want your column to be responsive, only set the \`xs\` prop.
  `,
  <Example
    defaultCode={`
<Box>
  <Box display="flex" direction="row" wrap paddingY={2}>
    <Column span={12} mdSpan={8}><Content label="12" mdLabel="8" /></Column>
    <Column span={6} mdSpan={4}><Content label="6" mdLabel="4" /></Column>
  </Box>

  <Box display="flex" direction="row" wrap paddingY={2}>
    <Column span={12} mdSpan={4}><Content label="12" mdLabel="4" /></Column>
    <Column span={12} mdSpan={4}><Content label="12" mdLabel="4" /></Column>
    <Column span={12} mdSpan={4}><Content label="12" mdLabel="4" /></Column>
  </Box>

  <Box display="flex" direction="row" wrap paddingY={2}>
    <Column span={6} mdSpan={3}><Content label="6" mdLabel="4" /></Column>
    <Column span={6} mdSpan={3}><Content label="6" mdLabel="4" /></Column>
    <Column span={6} mdSpan={3}><Content label="6" mdLabel="4" /></Column>
    <Column span={6} mdSpan={3}><Content label="6" mdLabel="4" /></Column>
  </Box>
</Box>
  `}
    scope={{ Box, Column, Content }}
  />,
  { stacked: true }
);

card(
  'Example: Equal height columns',
  md`
    Unlike traditional CSS columns, using flex columns makes each column equal height by default.
  `,
  <Example
    defaultCode={`
<Box display="flex" direction="row">
  <Column span={6}>
    <Box color="darkGray" padding={2}>
      <Text color="white">Tall column</Text>
      <Box height={200} />
      <Text color="white">With lots of content</Text>
    </Box>
  </Column>


  <Column span={6}>
    <Box color="gray" height="100%" padding={2}>
      <Text color="white">Short column</Text>
    </Box>
  </Column>
</Box>
`}
    scope={{ Box, Column, Text }}
  />,
  { stacked: true }
);

card(
  'Example: Gutters',
  md`
    Column gutters can be created through composition and negative margins.
  `,
  <Example
    defaultCode={`
<Box paddingY={2} color="darkGray">
  <Box paddingX={2} marginBottom={2}>
    <Text color="white">Content</Text>
  </Box>
  <Box
    display="flex"
    direction="row"
    paddingY={2}
    marginLeft={-2}
    marginRight={-2}
    color="gray"
    wrap
  >
    <Column span={12}>
      <Box paddingX={2} marginBottom={2}>
        <Text color="white">Row</Text>
      </Box>
    </Column>
    <Column span={6}>
      <Box paddingX={2}>
        <Box color="white">Column A</Box>
      </Box>
    </Column>
    <Column span={6}>
      <Box paddingX={2}>
        <Box color="white">Column B</Box>
      </Box>
    </Column>
  </Box>
</Box>
`}
    scope={{ Box, Column, Text }}
  />,
  { stacked: true }
);
