// @flow
import * as React from 'react';
import { Box, Text, Avatar, Button } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import Combination from './components/Combination';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Box"
    description={`In the darkest night, Box will rise to bring the light. The Lloyd has spoken.

&mdash; Anon _(Winning Box Haiku, 2017)_`}
  />
);

card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'dangerouslySetInlineStyle',
        type: '{ __style: { [key: string]: any } }',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'display',
        type: `"none" | "flex" | "block" | "inlineBlock"`,
        defaultValue: 'block',
        responsive: true,
      },
      {
        name: 'direction',
        type: `"row" | "column"`,
        defaultValue: 'row',
        responsive: true,
        description:
          'Establishes the main-axis, thus defining the direction flex items are placed in the flex container.',
      },
      {
        name: 'alignContent',
        type: `"start" | "end" | "center" | "between" | "around" | "stretch"`,
        defaultValue: 'stretch',
        description:
          "Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.",
      },
      {
        name: 'alignItems',
        type: `"start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
      },
      {
        name: 'alignSelf',
        type: `"auto" | "start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
      },
      {
        name: 'bottom',
        type: `boolean`,
        defaultValue: false,
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "darkWash" | "eggplant" | "gray" | "green" | "lightGray" | "lightWash" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "transparent" | "watermelon" | "white"`,
        defaultValue: 'transparent',
      },
      { name: 'fit', type: 'boolean', defaultValue: false },
      {
        name: 'flex',
        type: '"grow" | "shrink" | "none"',
        defaultValue: 'shrink',
        description: `Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.`,
      },
      {
        name: 'justifyContent',
        type: `"start" | "end" | "center" | "between" | "around"`,
        defaultValue: 'start',
        description:
          'Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.',
      },
      {
        name: 'left',
        type: `boolean`,
        defaultValue: false,
      },
      {
        name: 'right',
        type: `boolean`,
        defaultValue: false,
      },
      {
        name: 'top',
        type: `boolean`,
        defaultValue: false,
      },
      {
        name: 'margin',
        type: `-12 ... 12`,
        defaultValue: 0,
        responsive: true,
        description: 'Scale is in boints, where 1bt is 4px',
      },
      {
        name: 'marginTop',
        type: `-12 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'marginRight',
        type: `-12 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'marginBottom',
        type: `-12 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'marginLeft',
        type: `-12 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'column',
        type: `0 .. 12`,
        responsive: true,
      },
      {
        name: 'maxHeight',
        type: `number | string`,
      },
      {
        name: 'maxWidth',
        type: `number | string`,
      },
      {
        name: 'minHeight',
        type: `number | string`,
      },
      {
        name: 'minWidth',
        type: `number | string`,
      },
      {
        name: 'height',
        type: `number | string`,
      },
      {
        name: 'width',
        type: `number | string`,
      },
      {
        name: 'overflow',
        type: `"visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto"`,
        defaultValue: 'visible',
      },
      {
        name: 'padding',
        type: `0 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'paddingX',
        type: `0 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'paddingY',
        type: `0 .. 12`,
        defaultValue: 0,
        responsive: true,
      },
      {
        name: 'position',
        type: `"static" | "absolute" | "relative" | "fixed"`,
        defaultValue: 'static',
      },
      {
        name: 'shape',
        type: `"square" | "rounded" | "pill" | "circle" | "roundedTop" | "roundedBottom" | "roundedLeft" | "roundedRight"`,
        defaultValue: 'square',
      },
      {
        name: 'wrap',
        type: 'boolean',
        defaultValue: false,
        description: `By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.`,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description={`
    The [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) is a common pattern for displaying data. What's interesting about this example is the use of \`flex\` to align the items. If you try changing the size of the \`Avatar\` or the number of lines of \`Text\`, both will stay aligned because they are center aligned.

    Also, this is a good example of symmetrical padding. Try re-ordering the \`Avatar\` and the \`Box\` containing the text. You don't need to do any styling to keep the padding the same because it's symmetrical (\`paddingX\`). People often use something like \`marginLeft\` here but in doing so you loose flexibility and have to change styling if you make changes to the structure.
  `}
    name="Example: Media object"
    defaultCode={`
<Box
alignItems="center"
direction="row"
display="flex"
marginLeft={-1}
marginRight={-1}>
<Box paddingX={1}>
  <Avatar name="chrislloyd" size="md" />
</Box>
<Box paddingX={1}>
  <Text bold>Chris Lloyd</Text>
  <Text>joined 2 years ago</Text>
</Box>
</Box>
`}
    scope={{ Box, Avatar, Text }}
  />
);

card(
  <Example
    description={`
    In this example we use the \`flex="grow"\` to mark a flex child as something that can expand. Try removing the \`grow\` property and seeing what happens.
  `}
    name="Example: Double-sided media object"
    defaultCode={`
<Box
alignItems="center"
direction="row"
display="flex"
marginLeft={-1}
marginRight={-1}>
<Box paddingX={1}>
  <Avatar name="chrislloyd" size="md" />
</Box>
<Box paddingX={1}  flex="grow">
  <Text bold>Chris Lloyd</Text>
  <Text>joined 2 years ago</Text>
</Box>
<Box paddingX={1}>
  <Button text="Follow" size="sm" color="red" />
</Box>
</Box>
`}
    scope={{ Button, Box, Avatar, Text }}
  />
);

card(
  <Combination
    description={`
    Box uses Flexbox to achieve layout. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  `}
    name="Layout"
    // alignContent={['start', 'end', 'center', 'between', 'around', 'stretch']}
    justifyContent={['start', 'end', 'center', 'between', 'around']}
    alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
  >
    {props => (
      <Box xs={{ display: 'flex' }} width={96} {...props}>
        <Box margin={1} color="gray" height={8} width={8} />
        <Box margin={1} color="gray" height={16} width={8} />
        <Box margin={1} color="gray" height={32} width={8} />
      </Box>
    )}
  </Combination>
);

card(
  <Card
    description={`
    Box is a pass-through component, meaning that any other properties you provide to it will be directly applied to the underlying \`<div>\`. There are exceptions, however. \`onClick\`, \`className\` and \`style\` aren't passed to the child component. The former is for accessibility reasons, and the latter two are to ensure style encapsulation.

    In adddition, it can be intuitive to want to have access to a Box's \`ref\`. Again, we don't pass this down as it leaks the implementation of the Box to the caller.

    If you need to use these features, please use a \`<div>\` instead.
  `}
    name="Blacklisted properties & refs"
  />
);

const PaddingSwatch = (props: *) => (
  <Box
    {...props}
    dangerouslySetInlineStyle={{
      __style: { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
    }}
  >
    <Box color="white" padding={1}>
      {props.label}
    </Box>
  </Box>
);

card(
  <Box
    description={`
    Padding is applied in boints and is always symmetric. You should try to use padding before you use margins as they compose better and don't collapse.

    ~~~jsx
    <Box padding={1} />
    <Box paddingX={1} />
    <Box paddingY={1} />
    ~~~
  `}
    name="Padding"
    display="flex"
    direction="row"
    justifyContent="between"
    alignItems="center"
    wrap
  >
    <PaddingSwatch padding={1} label="1" />
    <PaddingSwatch paddingX={1} label="X=1" />
    <PaddingSwatch paddingY={1} label="Y=1" />
  </Box>
);

const MarginSwatch = (props: *) => (
  <Box
    margin={1}
    dangerouslySetInlineStyle={{
      __style: { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
    }}
  >
    <Box
      padding={1}
      {...props}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
      }}
    >
      {JSON.stringify(props)}
    </Box>
  </Box>
);

card(
  <Box
    description={`
    Margins are applied in boints and are asymmetric. Margins can be -6 to 6 boints. You can set margin to be auto in the left and right axis.

    In the example on the right the outer \`Box\` is in transparent red, and the inner \`Box\` is transparent blue.

    ~~~jsx
    <Box margin={1} />
    <Box marginTop={1} />
    <Box marginBottom={1} />
    <Box marginLeft={1} />
    <Box marginRight={1} />
    ~~~
  `}
    name="Margins"
  >
    <Box
      display="flex"
      direction="row"
      justifyContent="between"
      alignItems="center"
      wrap
    >
      <MarginSwatch margin={1} />
      <MarginSwatch marginTop={1} />
      <MarginSwatch marginBottom={1} />
      <MarginSwatch marginLeft={1} />
      <MarginSwatch marginRight={1} />
    </Box>
    <Box
      display="flex"
      direction="row"
      justifyContent="between"
      alignItems="center"
      wrap
    >
      <MarginSwatch margin={-1} />
      <MarginSwatch marginTop={-1} />
      <MarginSwatch marginBottom={-1} />
      <MarginSwatch marginLeft={-1} />
      <MarginSwatch marginRight={-1} />
    </Box>
  </Box>
);

card(
  <Example
    description={`
    Position is static by default but can be made absolute. \`Box\` has helpers to help align to absolute edges (top, bottom, left, right). These can be used in combination with padding to achieve desired offsets from edges.
  `}
    name="Example: Absolute positioning"
    defaultCode={`
<Box position="relative" color="white" height={200}>
<Box position="absolute" top left padding={1}>
  Top, left
</Box>
<Box position="absolute" top right padding={1}>
  Top, right
</Box>
<Box position="absolute" bottom left padding={1}>
  Bottom, left
</Box>
<Box position="absolute" bottom right padding={1}>
  Bottom, right
</Box>
</Box>
`}
    scope={{ Box }}
  />
);

card(
  <Combination
    name="Colors"
    color={[
      'red',
      'white',
      'lightGray',
      'gray',
      'darkGray',
      'green',
      'pine',
      'olive',
      'blue',
      'navy',
      'midnight',
      'purple',
      'eggplant',
      'maroon',
      'watermelon',
      'orange',
      'transparent',
      'lightWash',
      'darkWash',
    ]}
  >
    {props => <Box width={60} height={60} shape="circle" {...props} />}
  </Combination>
);

card(
  <Combination
    name="Shapes"
    shape={[
      'square',
      'rounded',
      'pill',
      'circle',
      'roundedTop',
      'roundedRight',
      'roundedBottom',
      'roundedLeft',
    ]}
  >
    {props => (
      <Box
        color="gray"
        width={props.shape === 'pill' ? 120 : 60}
        height={60}
        {...props}
      />
    )}
  </Combination>
);

export default () => <CardPage cards={cards} />;
