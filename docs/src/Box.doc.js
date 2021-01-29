// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import CombinationNew from './components/CombinationNew.js';

import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Box"
    description="Box is a low level component that can be used to build the foundation of pretty much anything. Using Box allows you to focus on the important content, without worrying about the pixel details."
  />
);

card(
  <MainSection name="Examples" showHeading={false}>
    <MainSection.Subsection
      description={`The following examples are all built using the \`Box\` component and its various properties. `}
    >
      <MainSection.Card
        title="Media Object"
        description={`
           The [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) is a common pattern for displaying data. What's interesting about this example is the use of \`flex\` to align the items. If you try changing the size of the \`Avatar\` or the number of lines of \`Text\`, both will stay aligned because they are center aligned.
        `}
        cardSize="md"
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
      <MainSection.Card
        title="Double-sided Media Object"
        description={`
           In this example we use \`flex="grow"\` to mark a flex child as something that can expand. Try removing the \`grow\` property and see what happens.
         `}
        cardSize="md"
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
  <Box paddingX={1} flex="grow">
    <Text weight="bold">Chris Lloyd</Text>
    <Text>joined 2 years ago</Text>
  </Box>
  <Box paddingX={1}>
    <Button text="Follow" size="sm" color="red" />
  </Box>
</Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
    <Box maxWidth={390}>
      <Module.Expandable
        id="ModuleExample3"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        items={[
          {
            title: 'Example with icon',
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: 'title icon',
            icon: 'lock',
          },
        ]}
      />
    </Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
        <Box margin={-2}>
      <Box padding={2}>
        <Checkbox
          checked={false}
          id="coral"
          label="Coral"
          subtext="Botanical art in coral and green"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Botanical art in coral and green"
                src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                fit="contain"
                naturalWidth={1}
                naturalHeight={1}
              />
            </Box>
          }
          name="favorite art"
          onChange={({ checked }) => {
            console.log('Checked Coral');
          }}
        />
      </Box>
      <Box padding={2}>
        <Checkbox
          checked
          id="blue"
          label="Blue"
          subtext="Typography and shoe in blue"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Typography and shoe in blue"
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
                fit="contain"
                naturalWidth={1}
                naturalHeight={1}
              />
            </Box>
          }
          name="favorite art"
          onChange={({ checked }) => {
            console.log('Checked Blue');
          }}
        />
      </Box>
    </Box>
`}
      />
    </MainSection.Subsection>
  </MainSection>
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
        name: 'borderStyle',
        type: `"sm" | "lg" | "shadow" | "none"`,
        defaultValue: 'none',
        description:
          'Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. Alternatively, "shadow" can be specified to add a box shadow instead of a solid border',
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
      ...['left', 'right', 'top', 'bottom'].map((name) => ({
        name,
        type: 'boolean',
        defaultValue: false,
        href: 'absolutePositioning',
      })),
      ...[
        {
          name: 'margin',
          description:
            'Scale is in 4px increments so a margin of 2 is 8px. Supports 3 responsive breakpoints: sm, md, lg. Each sets the margin from that breakpoint and up.',
        },
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
      })),
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
      ...[
        {
          name: 'padding',
          description:
            'Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up.',
        },
        { name: 'paddingX', description: 'Horizontal padding (left/right)' },
        { name: 'paddingY', description: 'Vertical padding (top/bottom)' },
      ].map(({ description = '', name }) => ({
        description,
        name,
        type: '0 .. 12',
        defaultValue: 0,
        responsive: true,
        href: 'padding',
      })),
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
        href: 'zindex',
        type: 'interface Indexable { index(): number; }',
        description: `An object representing the zIndex value of the Box.`,
      },
    ]}
  />
);

card(
  <MainSection
    name="Accessibility"
    description={`The \`visuallyHidden\` option of the \`display\` property can be used to prevent content from being visible while ensuring that screen readers still have access to the content. This can be useful when adding context for screen reader users, such as adding a pause to the labels of [Checkboxes](/checkboxes). `}
  >
    <MainSection.Subsection
      title="Visually Hidden Content"
      description={`
    Setting \`display="visuallyHidden"\` on \`Box\` allows for an element to be visually hidden but still be read by screen readers.
  `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<>
  <Text>Enable your screen reader to hear the following text:</Text>
  <Box display="visuallyHidden">In the darkest night, Box will rise to bring the light. The Lloyd has spoken.</Box>
</>
`}
      />
    </MainSection.Subsection>
  </MainSection>
);

card(
  <MainSection
    name="Localization and Inclusion"
    description={`Utilizing the \`marginStart\` and \`marginEnd\`  properties (instead of left and right specifics) will account for right-to-left languages and maintain proper spacing.`}
  >
    <MainSection.Subsection
      description={`
    Some languages (ex. Arabic, Hebrew) read from right to left (RTL) instead of from left to right. \`marginStart\` and \`marginEnd\` are margins that offer RTL support.

    \`marginStart\` is a left margin that flips to a right margin in a RTL layout.

    \`marginEnd\` is a right margin that flips to a left margin in a RTL layout.

    You can toggle the page direction using the button below to see this behavior.
    `}
      title="Page Direction"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
        function Example() {
          const MarginSwatch = (props) => (
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

          const toggleRTL = () => {
            if (document.documentElement) {
              const isRTL = document.documentElement.dir === 'rtl';
              document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
            }
          };

          return (
            <Box maxWidth={200} marginBottom={2}>
              <Button size="sm" onClick={toggleRTL} text="Toggle Page Direction" />
              <MarginSwatch marginStart={1} />
              <MarginSwatch marginEnd={1} />
              <MarginSwatch marginStart={-1} />
              <MarginSwatch marginEnd={-1} />
            </Box>
          );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`Borders are controlled by the \`borderStyle\` property. Specifying a size ("sm" or "lg") enables a solid, light gray color in that width, while specifying "shadow" adds a box-shadow instead.`}
      title="Borders"
    >
      <MainSection.Card
        cardSize="sm"
        title='borderStyle="sm"'
        defaultCode={`<Box
        width={60}
        height={60}
        rounding="circle"
        color="white"
        borderStyle="sm"
      />`}
      />
      <MainSection.Card
        cardSize="sm"
        title='borderStyle="lg"'
        defaultCode={`<Box
        width={60}
        height={60}
        rounding="circle"
        color="white"
        borderStyle="lg"
      />`}
      />
      <MainSection.Card
        cardSize="sm"
        title='borderStyle="shadow"'
        defaultCode={`<Box
        width={60}
        height={60}
        rounding="circle"
        color="white"
        borderStyle="shadow"
      />`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection description="" title="Colors">
      <CombinationNew
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
        {(props) => <Box width={60} height={60} rounding="circle" {...props} />}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`The \`rounding\` property sets a border radius for the \`Box\`. Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in 4px increments.`}
      title="Rounding"
    >
      <CombinationNew rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
        {(props) => (
          <Box
            color="gray"
            width={props.rounding === 'pill' ? 120 : 70}
            height={70}
            {...props}
          />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection description="" title="Opacity">
      <CombinationNew
        opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
      >
        {(props) => <Box color="darkGray" width={60} height={60} {...props} />}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
    Box uses Flexbox to achieve layout. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  `}
      title="Flex Layout"
    >
      <CombinationNew
        justifyContent={['start', 'end', 'center', 'between', 'around']}
        alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
      >
        {(props) => (
          <Box
            display="flex"
            width="75%"
            height="75%"
            {...props}
            borderStyle="shadow"
          >
            <Box margin={1} color="gray" height={8} width={8} />
            <Box margin={1} color="gray" height={16} width={8} />
            <Box margin={1} color="gray" height={32} width={8} />
          </Box>
        )}
      </CombinationNew>
    </MainSection.Subsection>
  </MainSection>
);

// card(
//   <Example
//     description={`
//     The [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) is a common pattern for displaying data. What's interesting about this example is the use of \`flex\` to align the items. If you try changing the size of the \`Avatar\` or the number of lines of \`Text\`, both will stay aligned because they are center aligned.

//     Also, this is a good example of symmetrical padding. Try re-ordering the \`Avatar\` and the \`Box\` containing the text. You don't need to do any styling to keep the padding the same because it's symmetrical (\`paddingX\`). People often use something like \`marginStart\` here but in doing so you lose flexibility and have to change styling if you make changes to the structure.
//   `}
//     name="Example: Media object"
//     defaultCode={`
// <Box
//   alignItems="center"
//   direction="row"
//   display="flex"
//   marginStart={-1}
//   marginEnd={-1}
// >
//   <Box paddingX={1}>
//     <Avatar name="chrislloyd" size="md" />
//   </Box>
//   <Box paddingX={1}>
//     <Text weight="bold">Chris Lloyd</Text>
//     <Text>joined 2 years ago</Text>
//   </Box>
// </Box>
// `}
//   />
// );

// card(
//   <Example
//     description={`
//     In this example we use \`flex="grow"\` to mark a flex child as something that can expand. Try removing the \`grow\` property and see what happens.
//   `}
//     name="Example: Double-sided media object"
//     defaultCode={`
// <Box
//   alignItems="center"
//   direction="row"
//   display="flex"
//   marginStart={-1}
//   marginEnd={-1}
// >
//   <Box paddingX={1}>
//     <Avatar name="chrislloyd" size="md" />
//   </Box>
//   <Box paddingX={1}  flex="grow">
//     <Text weight="bold">Chris Lloyd</Text>
//     <Text>joined 2 years ago</Text>
//   </Box>
//   <Box paddingX={1}>
//     <Button text="Follow" size="sm" color="red" />
//   </Box>
// </Box>
// `}
//   />
// );

// card(
//   <Combination
//     description={`
//     Box uses Flexbox to achieve layout. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
//   `}
//     id="layout"
//     name="Layout"
//     justifyContent={['start', 'end', 'center', 'between', 'around']}
//     alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
//     layout="4column"
//   >
//     {(props) => (
//       <Box display="flex" width={96} {...props}>
//         <Box margin={1} color="gray" height={8} width={8} />
//         <Box margin={1} color="gray" height={16} width={8} />
//         <Box margin={1} color="gray" height={32} width={8} />
//       </Box>
//     )}
//   </Combination>
// );

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
    Padding is applied in 4px increments and is always symmetric. You should try to use padding before you use margins as they compose better and don't collapse.

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

card(
  <Example
    name="Responsive padding"
    description="Control the padding on different screen sizes by setting the `smPadding`, `mdPadding` or `lgPadding` properties. In the example, we increase the padding by 4px for every breakpoint."
    defaultCode={`
function ResponsivePadding() {
  return (
    <Box padding={0} smPadding={1} mdPadding={2} lgPadding={3} color="lightGray">
      <Box width={40} height={40} color="green" />
    </Box>
  );
}`}
  />
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
    Margins are applied in 4px increments and are asymmetric. You can set margin to be auto in the left and right axis.

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

// card(
//   <Card
//     description={`
//     Borders are controlled by the "borderStyle" prop. Specifying a size ("sm" or "lg") enables a solid light gray color in that width, while specifying "shadow" adds a box-shadow instead.
//   `}
//     id="border"
//     name="Borders"
//   >
//     <Combination
//       id="border"
//       borderStyle={['sm', 'lg', 'shadow']}
//       showHeading={false}
//       layout="4column"
//     >
//       {(props) => (
//         <Box
//           width={60}
//           height={60}
//           rounding="circle"
//           color="white"
//           {...props}
//         />
//       )}
//     </Combination>
//   </Card>
// );

// card(
//   <Combination
//     id="color"
//     name="Colors"
//     layout="4column"
//     color={[
//       'red',
//       'white',
//       'lightGray',
//       'gray',
//       'darkGray',
//       'green',
//       'pine',
//       'olive',
//       'blue',
//       'navy',
//       'midnight',
//       'purple',
//       'orchid',
//       'eggplant',
//       'maroon',
//       'watermelon',
//       'orange',
//       'transparent',
//       'transparentDarkGray',
//       'lightWash',
//       'darkWash',
//     ]}
//   >
//     {(props) => <Box width={60} height={60} rounding="circle" {...props} />}
//   </Combination>
// );

// card(
//   <Card
//     description={`
//     Sets a border radius for the Box. Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in 4px increments.
//   `}
//     id="rounding"
//     name="Rounding"
//   >
//     <Combination
//       id="rounding"
//       rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}
//       showHeading={false}
//     >
//       {(props) => (
//         <Box
//           color="gray"
//           width={props.rounding === 'pill' ? 120 : 70}
//           height={70}
//           {...props}
//         />
//       )}
//     </Combination>
//   </Card>
// );

// card(
//   <Card
//     description={`
//     Sets a css opacity value for the Box. Be sure to maintain accessibility when using this prop. The contrast of the text should still be <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html" target="_blank">WCAG 2.0 AA compatible</a>.
//   `}
//     id="opacity"
//     name="Opacity"
//   >
//     <Combination
//       id="opacity"
//       opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
//       showHeading={false}
//     >
//       {(props) => <Box color="darkGray" width={60} height={60} {...props} />}
//     </Combination>
//   </Card>
// );

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
      <Flex alignItems="start" direction="column" gap={6}>
        <Button
          inline
          color="red"
          onClick={() => setOpen(true)}
          size="sm"
          text="Anchor a Flyout to Box"
        />
        <Box borderStyle='sm' padding={3} ref={anchorRef} rounding={1}>
          <Text>I'm a Box</Text>
        </Box>
      </Flex>
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
