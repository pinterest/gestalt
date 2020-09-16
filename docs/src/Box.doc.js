// @flow strict
import React, { type Node } from 'react';
import { Box, Button } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

const marginProps = [
  { name: 'margin', description: 'Scale is in boints, where 1bt is 4px' },
  { name: 'marginTop' },
  { name: 'marginRight' },
  { name: 'marginBottom' },
  { name: 'marginLeft' },
  { name: 'marginStart' },
  { name: 'marginEnd' },
].map((prop: {| name: string, description?: string |}) => ({
  name: prop.name,
  type: '-12 ... 12 | "auto"',
  defaultValue: 0,
  responsive: true,
  description: prop.description,
  href: 'margins',
}));

const absolutePositioningProps = ['left', 'right', 'top', 'bottom'].map(
  name => ({
    name,
    type: 'boolean',
    defaultValue: false,
    href: 'absolutePositioning',
  })
);

const paddingProps = ['padding', 'paddingX', 'paddingY'].map(name => ({
  name,
  type: '0 .. 12',
  defaultValue: 0,
  responsive: true,
  href: 'padding',
}));

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
        type: '{ __style: { [key: string]: string | number | void } }',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'display',
        type: `"none" | "flex" | "block" | "inlineBlock" | "visuallyHidden"`,
        defaultValue: 'block',
        responsive: true,
        href: 'display',
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
        type: `"start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"`,
        defaultValue: 'stretch',
        description:
          "Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.",
      },
      {
        name: 'alignItems',
        type: `"start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
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
        name: 'borderSize',
        type: `"sm" | "lg" | "none"`,
        defaultValue: 'none',
        description:
          'Specify a border width for the box. "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray',
        href: 'border',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "darkWash" | "eggplant" | "gray" | "green" | "lightGray" | "lightWash" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "transparent" | "transparentDarkGray" | "watermelon" | "white"`,
        defaultValue: 'transparent',
        href: 'color',
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
        type: `"start" | "end" | "center" | "between" | "around" | "evenly"`,
        defaultValue: 'start',
        description:
          'Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.',
        href: 'layout',
      },
      ...absolutePositioningProps,
      ...marginProps,
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
        name: 'height',
        type: `number | string`,
        description: `Use numbers for pixels: height={100} and strings for percentages: height="100%"`,
      },
      {
        name: 'width',
        type: `number | string`,
        description: `Use numbers for pixels: width={100} and strings for percentages: width="100%"`,
      },
      {
        name: 'opacity',
        type: `0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1`,
      },
      {
        name: 'overflow',
        type: `"visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto"`,
        defaultValue: 'visible',
      },
      ...paddingProps,
      {
        name: 'position',
        type: `"static" | "absolute" | "relative" | "fixed"`,
        defaultValue: 'static',
        href: 'absolutePositioning',
      },
      {
        name: 'ref',
        type: "React.Ref<'div'>",
        description: 'Forward the ref to the underlying div element',
        href: 'refExample',
      },
      {
        name: 'role',
        type: 'string',
      },
      {
        name: 'rounding',
        type: `"pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
        href: 'rounding',
      },
      {
        name: 'userSelect',
        type: `"auto" | "none"`,
        defaultValue: 'auto',
        description: `controls whether or not user can select text`,
      },
      {
        name: 'wrap',
        type: 'boolean',
        defaultValue: false,
        description: `By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.`,
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description: `An object representing the zIndex value of the Box.`,
      },
    ]}
  />
);

card(
  <Example
    description={`
    The [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) is a common pattern for displaying data. What's interesting about this example is the use of \`flex\` to align the items. If you try changing the size of the \`Avatar\` or the number of lines of \`Text\`, both will stay aligned because they are center aligned.

    Also, this is a good example of symmetrical padding. Try re-ordering the \`Avatar\` and the \`Box\` containing the text. You don't need to do any styling to keep the padding the same because it's symmetrical (\`paddingX\`). People often use something like \`marginStart\` here but in doing so you lose flexibility and have to change styling if you make changes to the structure.
  `}
    name="Example: Media object"
    defaultCode={`
<Box
  alignItems="center"
  direction="row"
  display="flex"
  marginStart={-1}
  marginEnd={-1}
>
  <Box paddingX={1}>
    <Avatar name="chrislloyd" size="md" />
  </Box>
  <Box paddingX={1}>
    <Text weight="bold">Chris Lloyd</Text>
    <Text>joined 2 years ago</Text>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`
    In this example we use \`flex="grow"\` to mark a flex child as something that can expand. Try removing the \`grow\` property and see what happens.
  `}
    name="Example: Double-sided media object"
    defaultCode={`
<Box
  alignItems="center"
  direction="row"
  display="flex"
  marginStart={-1}
  marginEnd={-1}
>
  <Box paddingX={1}>
    <Avatar name="chrislloyd" size="md" />
  </Box>
  <Box paddingX={1}  flex="grow">
    <Text weight="bold">Chris Lloyd</Text>
    <Text>joined 2 years ago</Text>
  </Box>
  <Box paddingX={1}>
    <Button text="Follow" size="sm" color="red" />
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`
    Setting \`display="visuallyHidden"\` on \`Box\` allows for an element to be visually hidden but still be read by screenreaders.
  `}
    id="display"
    name="Example: Visually Hidden"
    defaultCode={`
<>
  <Text>Enable your screenreader to hear the following text:</Text>
  <Box display="visuallyHidden">In the darkest night, Box will rise to bring the light. The Lloyd has spoken.</Box>
</>
`}
  />
);

card(
  <Combination
    description={`
    Box uses Flexbox to achieve layout. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  `}
    id="layout"
    name="Layout"
    justifyContent={['start', 'end', 'center', 'between', 'around']}
    alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
  >
    {props => (
      <Box display="flex" width={96} {...props}>
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

    If you need to use these features, please use a \`<div>\` instead.
  `}
    name="Disallowed properties"
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
  <Card
    description={`
    Padding is applied in boints and is always symmetric. You should try to use padding before you use margins as they compose better and don't collapse.

    ~~~jsx
    <Box padding={1} />
    <Box paddingX={1} />
    <Box paddingY={1} />
    ~~~
  `}
    id="padding"
    name="Padding"
  >
    <Box
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
  </Card>
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
  <Card
    description={`
    Margins are applied in boints and are asymmetric. Margins can be -6 to 6 boints. You can set margin to be auto in the left and right axis.

    In the example on the right the outer \`Box\` is in transparent red, and the inner \`Box\` is transparent blue.

    Instead of using \`marginLeft\` and \`marginRight\`, opt for the RTL-language-aware \`marginStart\` and \`marginEnd\`.

    ~~~jsx
    <Box margin={1} />
    <Box marginTop={1} />
    <Box marginBottom={1} />
    <Box marginStart={1} />
    <Box marginEnd={1} />
    ~~~
  `}
    id="margins"
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
      <MarginSwatch marginStart={1} />
      <MarginSwatch marginEnd={1} />
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
      <MarginSwatch marginStart={-1} />
      <MarginSwatch marginEnd={-1} />
    </Box>
  </Card>
);

card(
  <Card
    description={`
    Auto margin is a useful tool when using flexbox layouts. When a flex container has extra space and no components are set to grow, the browser would normally place elements next to each other. By setting any of the margin properties to "auto", the margin will extend to fill the extra space.

    ~~~jsx
    <Box display="flex" direction="column" height={120} color="green">
      <Box>This is a title!</Box>
      <Box>This one is a subtitle.</Box>
      <Box marginTop="auto">
        I’m pushed to the bottom due to marginTop: auto.
      </Box>
    </Box>
    ~~~
  `}
    id="auto-margin"
    name="Auto Margin"
  >
    <Box display="flex" direction="column" height={120} color="green">
      <Box>This is a title!</Box>
      <Box>This one is a subtitle.</Box>
      <Box marginTop="auto">
        I’m pushed to the bottom due to marginTop: auto.
      </Box>
    </Box>
  </Card>
);

const toggleRTL = () => {
  if (document.documentElement) {
    const isRTL = document.documentElement.dir === 'rtl';
    document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
  }
};

card(
  <Card
    description={`
    Some languages (ex. Arabic, Hebrew) read from right to left (RTL) instead of from left to right. \`marginStart\` and \`marginEnd\` are margins that offer RTL support.

    \`marginStart\` is a left margin that flips to a right margin in a RTL layout.

    \`marginEnd\` is a right margin that flips to a left margin in a RTL layout.

    You can toggle the page direction using the button below to see this behavior.
    `}
    name="Page Direction"
  >
    <Box maxWidth={200} marginBottom={2}>
      <Button size="sm" onClick={toggleRTL} text="Toggle Page Direction" />
      <MarginSwatch marginStart={1} />
      <MarginSwatch marginEnd={1} />
      <MarginSwatch marginStart={-1} />
      <MarginSwatch marginEnd={-1} />
    </Box>
  </Card>
);

card(
  <Example
    description={`
    Position is static by default but can be made absolute. \`Box\` has helpers to help align to absolute edges (top, bottom, left, right). These can be used in combination with padding to achieve desired offsets from edges.
  `}
    id="absolutePositioning"
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
  />
);

card(
  <Card
    description={`
    Borders are controlled by the "borderSize" prop. Setting a size enables a solid light gray color in that width.
  `}
    id="border"
    name="Borders"
  >
    <Combination borderSize={['sm', 'lg']} showHeading={false}>
      {props => (
        <Box
          width={60}
          height={60}
          rounding="circle"
          color="white"
          {...props}
        />
      )}
    </Combination>
  </Card>
);

card(
  <Combination
    id="color"
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
      'orchid',
      'eggplant',
      'maroon',
      'watermelon',
      'orange',
      'transparent',
      'transparentDarkGray',
      'lightWash',
      'darkWash',
    ]}
  >
    {props => <Box width={60} height={60} rounding="circle" {...props} />}
  </Combination>
);

card(
  <Card
    description={`
    Sets a border radius for the Box. Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in boints.
  `}
    id="rounding"
    name="Rounding"
  >
    <Combination
      rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}
      showHeading={false}
    >
      {props => (
        <Box
          color="gray"
          width={props.rounding === 'pill' ? 120 : 70}
          height={70}
          {...props}
        />
      )}
    </Combination>
  </Card>
);

card(
  <Card
    description={`
    Sets a css opacity value for the Box. Be sure to maintain accessibility when using this prop. The contrast of the text should still be <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html" target="_blank">WCAG 2.0 AA compatible</a>.
  `}
    id="opacity"
    name="Opacity"
  >
    <Combination
      opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
      showHeading={false}
    >
      {props => <Box color="darkGray" width={60} height={60} {...props} />}
    </Combination>
  </Card>
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`
    A \`Box\` with an anchor ref to a Flyout component
  `}
    defaultCode={`
function ButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <>
      <Stack gap={6}>
        <Button
          inline
          color="red"
          onClick={() => setOpen(true)}
          size="sm"
          text="Anchor a Flyout to Box"
        />
        <Box borderSize='sm' padding={3} ref={anchorRef} rounding={1}>
          <Text>I'm a Box</Text>
        </Box>
      </Stack>
      {open && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setOpen(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">I'm a Flyout anchored to a Box</Text>
          </Box>
        </Flyout>
      )}
    </>
  );
}`}
  />
);

card(
  <Example
    description={`
It's possible to use box with external elements using the css \`z-index\` property by capturing those values in controlled objects. The example below shows using a \`FixedZIndex\` for a value that comes from somewhere else, and a \`CompositeZIndex\` to layer the Box on top of it.
  `}
    id="zindex"
    name="ZIndex"
    defaultCode={`
function Example() {
  const HEADER_ZINDEX = new FixedZIndex(100);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return <Box color="blue" width={60} height={60} zIndex={zIndex} />
}
`}
  />
);

export default cards;
