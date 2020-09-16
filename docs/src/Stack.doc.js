// @flow strict
import React, { type Node } from 'react';
import { Box, Stack } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Stack"
    description={`
      Stack is a layout component with a very limited subset of the props available to Box.

      Use this component for vertical flex layouts.
    `}
  />
);

card(
  <PropTable
    Component={Stack}
    props={[
      {
        name: 'children',
        type: 'React.Element',
        description:
          'All children must be Elements — unwrapped strings and other non-Element Nodes are not allowed',
      },
      {
        name: 'alignContent',
        type: `"start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"`,
        defaultValue: 'stretch',
        description:
          "Aligns a flex container's lines within when there is extra space in the horizontal axis, similar to how justify-content aligns individual items within the vertical axis.",
      },
      {
        name: 'alignItems',
        type: `"start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'start',
        description:
          'Defines the default behaviour for how flex items are laid out along the horizontal axis on the current line. Think of it as the justify-content version for the vertical axis (perpendicular to the horizontal axis).',
        href: 'layout',
      },
      {
        name: 'alignSelf',
        type: `"auto" | "start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
      },
      { name: 'fit', type: 'boolean', defaultValue: false },
      {
        name: 'flex',
        type: '"grow" | "shrink" | "none"',
        defaultValue: 'shrink',
        description: `Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Stack relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Stack to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Stack's size based on child content regardless of its container's size.`,
      },
      {
        name: 'gap',
        type: '0 .. 12',
        defaultValue: 0,
        description:
          'Defines symmetrical vertical padding to be applied to each child.',
      },
      {
        name: 'height',
        type: `number | string`,
        description: `Use numbers for pixels: height={100} and strings for percentages: height="100%"`,
      },
      {
        name: 'justifyContent',
        type: `"start" | "end" | "center" | "between" | "around" | "evenly"`,
        defaultValue: 'center',
        description:
          'Defines the alignment along the vertical axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.',
        href: 'layout',
      },
      {
        name: 'maxHeight',
        type: `number | string`,
      },
      {
        name: 'maxWidth',
        type: `number | string`,
        description: `Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%"`,
      },
      {
        name: 'minHeight',
        type: `number | string`,
        description: `Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%"`,
      },
      {
        name: 'minWidth',
        type: `number | string`,
        description: `Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%"`,
      },
      {
        name: 'width',
        type: `number | string`,
        description: `Use numbers for pixels: width={100} and strings for percentages: width="100%"`,
      },
      {
        name: 'wrap',
        type: 'boolean',
        defaultValue: false,
        description: `By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.`,
      },
    ]}
  />
);

card(
  <Example
    description={`
    With a very limited set of props that only relate to vertical layout, Stack is useful for separating concerns to prevent overloaded Box usage.
  `}
    name="Example: Menu"
    defaultCode={`
<Box borderSize="sm" paddingX={2} paddingY={3} rounding={3} width={130}>
  <Stack alignItems="center" gap={4}>
    <Text>Menu Item 1</Text>
    <Text>Menu Item 2</Text>
    <Text>Menu Item 3</Text>
  </Stack>
</Box>
`}
  />
);

card(
  <Combination
    description={`
    Stack is strictly for vertical flex layouts. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  `}
    id="layout"
    name="Layout"
    justifyContent={['start', 'end', 'center', 'between', 'around']}
    alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
  >
    {({ alignItems, justifyContent, ...rest }) => (
      <Box height={96} width={96} {...rest}>
        <Stack
          alignItems={alignItems}
          height="100%"
          justifyContent={justifyContent}
        >
          <Box margin={1} color="gray" width={8} height={8} />
          <Box margin={1} color="gray" width={16} height={8} />
          <Box margin={1} color="gray" width={32} height={8} />
        </Stack>
      </Box>
    )}
  </Combination>
);

export default cards;
