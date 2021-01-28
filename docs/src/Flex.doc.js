// @flow strict
import React, { type Node } from 'react';
import { Box, Flex } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Flex"
    description={`
      Flex is a layout component with a very limited subset of the props available to Box and a few special props of its own.

      Use this component for flex layouts, especially when even spacing between elements is desired (see the 'gap' property!).
    `}
  />,
);

card(
  <PropTable
    Component={Flex}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'alignContent',
        type: `"start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"`,
        defaultValue: 'stretch',
        description:
          "Aligns the flex container's lines within when there is extra space in the cross axis, similar to how justify-content aligns individual items within the main axis.",
      },
      {
        name: 'alignItems',
        type: `"start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'start',
        description:
          'Defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross axis (perpendicular to the main axis).',
        href: 'layout',
      },
      {
        name: 'alignSelf',
        type: `"auto" | "start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
      },
      {
        name: 'direction',
        type: `"row" | "column"`,
        defaultValue: 'row',
        description:
          'Establishes the main axis, thus defining the direction flex items are placed in the flex container.',
      },
      { name: 'fit', type: 'boolean', defaultValue: false },
      {
        name: 'flex',
        type: '"grow" | "shrink" | "none"',
        defaultValue: 'shrink',
        description: `Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Flex relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Flex to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Flex's size based on child content regardless of its container's size.`,
      },
      {
        name: 'gap',
        type: '0 .. 12',
        defaultValue: 0,
        description: 'Defines spacing between each child along the main axis.',
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
          'Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.',
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
  />,
);

card(
  <Example
    description={`
    With a limited set of props that only relate to flex layouts, Flex is useful for separating layout from other concerns to prevent overloaded Box usage.
  `}
    name="Example: Menu"
    defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width={130}>
  <Flex alignItems="center" direction="column" gap={4}>
    <Text>Menu Item 1</Text>
    <Text>Menu Item 2</Text>
    <Text>Menu Item 3</Text>
  </Flex>
</Box>
`}
  />,
);

card(
  <Example
    description={`
    When using the 'gap' property, Flex wraps each child in a Flex.Item sub-component. If one of more of those children need custom flex properties, you can use Flex.Item directly.
  `}
    name="Example: Applying flex properties to children"
    defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width="100%">
  <Flex alignItems="center" gap={4} width="100%">
    <Button inline text="Button 1" />
    <Flex.Item flex="grow">
      <Button inline text="Button 2" />
    </Flex.Item>
    <Button inline text="Button 3" />
  </Flex>
</Box>
`}
  />,
);

card(
  <PropTable
    name="Flex.Item"
    id="Flex.Item"
    Component={Flex?.Item}
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'alignSelf',
        type: `"auto" | "start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
      },
      {
        name: 'flex',
        type: '"grow" | "shrink" | "none"',
        defaultValue: 'shrink',
        description: `Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Flex relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Flex to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Flex's size based on child content regardless of its container's size.`,
      },
    ]}
  />,
);

card(
  <Combination
    description={`
    Flex is strictly for flex layouts. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  `}
    id="layout"
    name="Layout"
    justifyContent={['start', 'end', 'center', 'between', 'around']}
    alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
  >
    {({ alignItems, justifyContent, ...rest }) => (
      <Box height={96} width={96} {...rest}>
        <Flex
          direction="column"
          alignItems={alignItems}
          height="100%"
          justifyContent={justifyContent}
        >
          <Box margin={1} color="gray" width={8} height={8} />
          <Box margin={1} color="gray" width={16} height={8} />
          <Box margin={1} color="gray" width={32} height={8} />
        </Flex>
      </Box>
    )}
  </Combination>,
);

export default cards;
