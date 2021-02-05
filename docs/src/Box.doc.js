// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import CombinationNew from './components/CombinationNew.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Box"
    description="Box is a component primitive that can be used to build the foundation of pretty much any other component. It keeps details like spacing, borders and colors consistent with the rest of Gestalt, while allowing the developer to focus on the content."
  />,
);

card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'dangerouslySetInlineStyle',
        type: '{ __style: { [key: string]: string | number | void } }',
        href: 'Best-Practices',
      },
      {
        name: 'children',
        type: 'React.Node',
        href: 'Best-Practices',
      },
      {
        name: 'display',
        type: `"none" | "flex" | "block" | "inlineBlock" | "visuallyHidden"`,
        defaultValue: 'block',
        responsive: true,
        href: 'Column-Layout',
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
        description: `Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. See the Borders section for more details.`,
        href: 'Borders',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "darkWash" | "eggplant" | "gray" | "green" | "lightGray" | "lightWash" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "transparent" | "transparentDarkGray" | "watermelon" | "white"`,
        defaultValue: 'transparent',
        href: 'Colors',
      },
      {
        name: 'fit',
        type: 'boolean',
        defaultValue: false,
        description: 'Sets the max-width of the Box to 100%',
        href: 'Sizing',
      },
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
      },
      ...['left', 'right', 'top', 'bottom'].map((name) => ({
        name,
        type: 'boolean',
        defaultValue: false,
        href: 'Absolute-Positioning',
        description: 'Helper to specify location when using absolute positioning.',
      })),
      ...[
        {
          name: 'margin',
          description:
            'Scale is in 4px increments so a margin of 2 is 8px. Supports 3 responsive breakpoints: sm, md, lg. Each sets the margin from that breakpoint and up.',
        },
        { name: 'marginTop' },
        { name: 'marginBottom' },
        {
          name: 'marginStart',
          description:
            'Applies margin to the left in left-to-right languages, and to the right in right-to-left languages.',
        },
        {
          name: 'marginEnd',
          description:
            'Applies margin to the right in left-to-right languages, and to the left in right-to-left languages.',
        },
      ].map((prop: {| name: string, description?: string |}) => ({
        name: prop.name,
        type: '-12 ... 12 | "auto"',
        defaultValue: 0,
        responsive: true,
        description: prop.description,
        href: 'Auto-Margins',
      })),
      {
        name: 'column',
        type: `0 .. 12`,
        responsive: true,
        href: 'Column-Layout',
      },
      {
        name: 'maxHeight',
        type: `number | string`,
        description: `Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%"`,
        href: 'Sizing',
      },
      {
        name: 'maxWidth',
        type: `number | string`,
        description: `Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%"`,
        href: 'Sizing',
      },
      {
        name: 'minHeight',
        type: `number | string`,
        description: `Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%"`,
        href: 'Sizing',
      },
      {
        name: 'minWidth',
        type: `number | string`,
        description: `Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%"`,
        href: 'Sizing',
      },
      {
        name: 'height',
        type: `number | string`,
        description: `Use numbers for pixels: height={100} and strings for percentages: height="100%"`,
        href: 'Sizing',
      },
      {
        name: 'width',
        type: `number | string`,
        description: `Use numbers for pixels: width={100} and strings for percentages: width="100%"`,
        href: 'Sizing',
      },
      {
        name: 'opacity',
        type: `0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1`,
        href: 'Opacity',
      },
      {
        name: 'overflow',
        type: `"visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto"`,
        defaultValue: 'visible',
        href: 'Sizing',
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
        href: 'Responsive-Padding',
      })),
      {
        name: 'position',
        type: `"static" | "absolute" | "relative" | "fixed"`,
        defaultValue: 'static',
        href: 'Absolute-Positioning',
      },
      {
        name: 'ref',
        type: "React.Ref<'div'>",
        description: 'Forward the ref to the underlying div element',
        href: 'Using-as-a-ref',
      },
      {
        name: 'role',
        type: 'string',
        href: 'Using-Role',
        description: 'Used to designate the Box as a type of element or landmark using ARIA roles.',
      },
      {
        name: 'rounding',
        type: `"pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
        href: 'Rounding',
      },
      {
        name: 'userSelect',
        type: `"auto" | "none"`,
        defaultValue: 'auto',
        description: `Controls whether or not user can select text`,
      },
      {
        name: 'wrap',
        type: 'boolean',
        defaultValue: false,
        description: `By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.`,
      },
      {
        name: 'zIndex',
        href: 'Z-Index',
        type: 'interface Indexable { index(): number; }',
        description: `An object representing the zIndex value of the Box.`,
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`
        Use Box as a building block when creating other components or layouts that do not rely on flexbox. The included properties should cover any variations needed to create a diverse range of options.

        If you find yourself using Box for flexbox layouts, consider [Flex](/Flex) instead.
        `}
        defaultCode={`
<Box column={12}>
  <Box column={12}>
    <Box color="midnight" height={50} width="100%">
      <Text color="white" weight="bold">Header</Text>
    </Box>
    <Box column={6} display="inlineBlock">
      <Box color="maroon" height={50} width="100%">
        <Text color="white" weight="bold">Body 50% Content</Text>
      </Box>
    </Box>
    <Box column={6} display="inlineBlock">
      <Box color="eggplant" height={50} width="100%">
        <Text color="white" weight="bold">Body 50% Content</Text>
      </Box>
    </Box>
    <Box color="midnight" height={50} width="100%">
      <Text color="white" weight="bold">Footer</Text>
    </Box>
  </Box>
</Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`Don’t use the \`onClick\`, \`className\` and \`style\` properties.

Box is a pass-through component, meaning that any other properties you provide to it will be directly applied to the underlying \`<div>\`. The above properties are exceptions, however.  We don’t allow  \`onClick\`  for  accessibility reasons, so consider a [Button](/Button) or [TapArea](/TapArea) instead. We remove \`className\` and \`style\` to ensure style encapsulation. If necessary, \`dangerouslySetInlineStyle\` can be used to supply a style not supported by Box props.

If you need to use these features for animation purposes, use a \`<div>\` instead.`}
        defaultCode={`
<Box
  className="This class name will not appear"
  style={{backgroundColor: "orange"}}
  color="midnight"
  column={12}
  height={100}
  padding={4}
>
  <Box
    onClick={() => {console.log("This won't get logged.");}}
    paddingX={1}
    color="maroon"
    height={50}
  >
    <Text color="white" weight="bold">Clicking here will do nothing</Text>
  </Box>
</Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`When addressing the spacing of the Box, use padding before you use margins, as padding will compose better and won't collapse. Padding is applied in 4px increments and is always symmetric. Learn more about [margin collapsing]("https://css-tricks.com/what-you-should-know-about-collapsing-margins/"). `}
        defaultCode={`
<Box>
  <Box marginTop={4} color="blue" width={200} height={50}>
    <Box
      color="green"
      height={50}
      marginTop={2}
    >
      <Box
        color="midnight"
        height={50}
        marginTop={3}
      >
        <Text color="white" weight="bold">
          These all collapsed
        </Text>
      </Box>
    </Box>
  </Box>
  <Box marginTop={4} paddingY={1} color="blue" width={200} height={100}>
    <Box
      color="green"
      height={100}
      paddingY={2}
    >
      <Box
        color="midnight"
        height={100}
        padding={2}
      >
        <Text color="white" weight="bold">
          These are not collapsed, because they use padding
        </Text>
      </Box>
    </Box>
  </Box>
</Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`Avoid using arbitrary \`<div>\` elements. Instead, when building a component, prioritize using Box. If you need to set a custom style, you can do so using the \`dangerouslySetInlineStyle\` prop. However, this should be avoided whenever possible by utilizing the other props provided in Box. We provide a [lint rule]("https://github.com/pinterest/gestalt/blob/master/packages/eslint-plugin-gestalt/src/no-dangerous-style-duplicates.js") to prevent this from happening.`}
        defaultCode={`
function MenuButtonExample() {
  const firstBoxHeight = 50;
  const secondBoxHeight = 25;

  return (
    <Box paddingY={2}>
      <Box
        color="midnight"
        height={firstBoxHeight}
        padding={2}
        marginBottom={1}
      >
        <Text color="white" weight="bold">
          This uses a proper, Gestalt colored Box
        </Text>
      </Box>
      <div
        style={{backgroundColor: '#6e0f3c', color: 'white'}}
      >
        This could be using Box, but isn't.
      </div>
      <Box
        color="eggplant"
        dangerouslySetInlineStyle={{
          __style: {
            paddingBottom: '${50 + 25}px',
          },
        }}
        height={50}
        padding={2}
        marginTop={1}
      >
        <Text color="white" weight="bold">
          This uses dangerouslySetInlineStyle to add a calculated paddingBottom
        </Text>
      </Box>
    </Box>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Accessibility"
    description={`The \`visuallyHidden\` option of the \`display\` property can be used to prevent content from being visible while ensuring that screen readers still have access to the content. This can be useful when adding context for screen reader users, such as adding a pause to the labels of [Checkboxes](/checkboxes). `}
  >
    <MainSection.Subsection
      title="Visually hidden content"
      description={`
    Setting \`display="visuallyHidden"\` on Box allows for an element to be visually hidden but still be read by screen readers.
  `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<React.Fragment>
  <Text>Enable your screen reader to hear the following text:</Text>
  <Box display="visuallyHidden">In the darkest night, Box will rise to bring the light. The Lloyd has spoken.</Box>
</React.Fragment>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Using role"
      description={`
    Setting the  \`role\` property on Box classifies the Box as the semantically appropriate HTML element. For example, setting \`role="banner"\` will designate that Box to be the equivalent of a \`<header>\` within the page, allowing assistive technology to classify the Box appropriately.

    Using the \`role\` property can prevent an excess of generic \`<div>s\` and give the user better context. Learn more about [ARIA roles]("https://www.w3.org/TR/wai-aria/#usage_intro").
  `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Box column={12}>
  <Box role="feed" color="midnight" width="100%" padding={2}>
    <Text color="white" weight="bold">Container: role="feed"</Text>
    <Box column={8} display="inlineBlock">
      <Box role="article" title="Article 1" color="maroon" height={50} width="100%" padding={2}>
        <Text color="white" weight="bold">Content: role="article"</Text>
      </Box>
    </Box>
    <Box column={4} display="inlineBlock">
      <Box role="form" color="eggplant" height={50} width="100%" padding={2}>
        <Text color="white" weight="bold">Contact Form: role="form"</Text>
      </Box>
    </Box>
  </Box>
  <Box role="navigation" title="Site Map" color="pine" height={50} width="100%" padding={2}>
    <Text color="white" weight="bold">Site Map: role="navigation"</Text>
  </Box>
</Box>
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Utilizing the \`marginStart\` and \`marginEnd\`  properties will account for right-to-left languages and maintain proper spacing.`}
  >
    <MainSection.Subsection
      description={`
    Some languages (ex. Arabic, Hebrew) read from right to left (RTL) instead of from left to right. For this reason, we use \`marginStart\` and \`marginEnd\` (as opposed to left and right options) to support RTL. If specific left and right options are needed, use \`dangerouslySetInlineStyle\`.

    \`marginStart\` is a left margin that flips to a right margin in a RTL layout.

    \`marginEnd\` is a right margin that flips to a left margin in a RTL layout.

    You can toggle the page direction using the button below to see this behavior.
    `}
      title="Page direction"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example() {
  const MarginSwatch = (props) => (
    <Box
      margin={1}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: 'rgba(110, 15, 60, 0.2)' },
      }}
    >
      <Box
        padding={1}
        {...props}
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'rgba(19, 58, 94, 0.2)' },
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
      <MarginSwatch marginStart={2} />
      <MarginSwatch marginEnd={2} />
      <MarginSwatch marginStart={-2} />
      <MarginSwatch marginEnd={-2} />
    </Box>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
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
    <MainSection.Subsection title="Colors">
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
        {(props) => <Box width={60} height={60} rounding="circle" color={props.color} />}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`The \`rounding\` property sets a border radius for the Box. Options are \`circle\` or \`pill\` for fully rounded corners or 0-8 representing the radius in 4px increments.`}
      title="Rounding"
    >
      <CombinationNew rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
        {(props) => (
          <Box
            color="gray"
            width={props.rounding === 'pill' ? 120 : 70}
            height={70}
            rounding={props.rounding}
          />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection description="" title="Opacity">
      <CombinationNew opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}>
        {(props) => <Box color="darkGray" width={60} height={60} opacity={props.opacity} />}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
    The \`column\` property allows for automatic widths based on a 12-column grid. To create responsive layouts, specify different values for \`smColumn\`, \`mdColumn\`, and \`lgColumn\`.
  `}
      title="Column layout"
    >
      <CombinationNew column={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}>
        {(props) => <Box height={100} color="midnight" column={props.column} />}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
    Box can also be sized using a mixture of \`width\`, \`height\`, \`max/min width\`, \`max/min height\`, and \`fit\`.

    When setting the size of a Box, the \`overflow\` property may need to be set in order to hide or scroll content that is outside the bounds of the Box.
    `}
      title="Sizing"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Box borderStyle="lg" column={12}>
  <Box width="25%" minHeight={25} maxHeight={100} overflow="hidden" padding={2} borderStyle="sm" color="eggplant">
    <Text color="white"> Add or remove text in the editor to see the min and max heights take affect.</Text>
  </Box>
  <Box width="50%" height={100} padding={2} borderStyle="sm" color="maroon">
    <Text color="white">Width and Height can be specified with numbers for "px" values or percentages</Text>
  </Box>
  <Box width="75%" minWidth={100} maxWidth={500} padding={2} borderStyle="sm" color="eggplant">
    <Text color="white">Change the screen width to see the min and max widths take affect </Text>
  </Box>
  <Box fit padding={2} borderStyle="sm" color="maroon">
    <Text color="white">"fit" sets width to 100% </Text>
  </Box>
</Box>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
      Control the padding on different screen sizes by setting the \`smPadding\`, \`mdPadding\` or \`lgPadding\` properties. In the example, we increase the padding by 4px for every breakpoint in either all directions, the x-axis only or the y-axis only.`}
      title="Responsive padding"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Flex gap={3}>
  <Box padding={0} smPadding={1} mdPadding={2} lgPadding={3} color="darkWash">
    <Box width={40} height={40} color="maroon" />
  </Box>
  <Box paddingX={0} smPaddingX={1} mdPaddingX={2} lgPaddingX={3} color="darkWash">
    <Box width={40} height={40} color="midnight" />
  </Box>
  <Box paddingY={0} smPaddingY={1} mdPaddingY={2} lgPaddingY={3} color="darkWash">
    <Box width={40} height={40} color="eggplant" />
  </Box>
</Flex>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
      Auto margin is a useful tool when positioning items without using flexbox layouts. By setting any of the margin properties to "auto", the margin will extend to fill the extra space.

      This can be seen below, where the 5-column width Box is centered using \`margin="auto"\` and the 3-column width Box uses \`marginStart="auto"\` to automatically adjust the Box to the far edge.
      `}
      title="Auto margins"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Box color="midnight" marginStart={12} marginEnd={12} column={12}>
  <Box borderStyle="sm" color="maroon" margin="auto" column={5} height={100}/>
  <Box borderStyle="sm" color="eggplant" marginStart="auto" column={3} height={100}/>
</Box>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
    Position is static by default but can be made absolute. \`Box\` has helpers to help align to absolute edges (top, bottom, left, right). These can be used in combination with padding to achieve desired offsets from edges.

    `}
      title="Absolute positioning"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Box height={100}>
  <Box position="absolute" top left padding={2} color="midnight">
    <Text color="white">Top Left</Text>
  </Box>
  <Box position="absolute" top right padding={2} color="midnight">
    <Text color="white">Top Right</Text>
  </Box>
  <Box position="absolute" bottom left padding={2} color="midnight">
    <Text color="white">Bottom Left</Text>
  </Box>
  <Box position="absolute" bottom right padding={2} color="midnight">
    <Text color="white">Bottom Right</Text>
  </Box>
  <Box color="maroon" width={400} height="100%"/>
</Box>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`The \`ref\` property can be used to anchor a [Flyout](/Flyout) to a Box.`}
      title="Using as a ref"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function BoxFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <React.Fragment>
      <Flex alignItems="start" direction="column" gap={6}>
        <Button
          inline
          color="red"
          onClick={ () => setOpen((prevVal) => !prevVal) }
          size="sm"
          text={open ? "Close Flyout" : "Anchor a Flyout to Box"}
        />
        <Box borderStyle='sm' padding={3} ref={anchorRef} rounding={1}>
          <Text>I'm a Box</Text>
        </Box>
      </Flex>
      {open && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => {}}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">I'm a Flyout anchored to a Box</Text>
          </Box>
        </Flyout>
      )}
    </React.Fragment>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`It's possible to use Box with external elements using the CSS \`z-index\` property by capturing those values in controlled objects. The example below shows using a \`FixedZIndex\` for a value that comes from somewhere else, and a \`CompositeZIndex\` to layer the Box on top of it.`}
      title="Z-Index"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example() {
  const HEADER_ZINDEX = new FixedZIndex(100);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <Box height={150} column={12} overflow="scroll" tabIndex={0}>
      <Sticky top={0} zIndex={HEADER_ZINDEX}>
        <Box color="maroon" width="80%" height={60} padding={2}>
          <Text color="white">This is sticky and won't move when scrolling</Text>
        </Box>
      </Sticky>
      <Box color="midnight" width="50%" height={100} zIndex={zIndex} position="relative" padding={2}>
        <Text color="white">This will float above the maroon Box when scrolling</Text>
      </Box>
      <Box color="pine" width="30%" height={120} padding={2}>
        <Text color="white">This will go behind the maroon Box</Text>
      </Box>
    </Box>
)}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Related"
    description={`
      [Flex](/Flex)

      - Use Flex for flexbox layouts, especially when even spacing between elements is desired, by using the \`gap\` property.

      [Container](/Container)

      - Use Container to responsively layout content with a max-width on large screens.

      [ScrollableContainer](/ScrollableContainer)

      - For proper positioning when using anchor components (Flyout, Tooltip, etc.) that can scroll within the viewport, use a ScrollableContainer.

      [TapArea](/TapArea)

      - If a tap target is needed in order to click on a portion of the page, use TapArea, since \`onClick\` is not supported on Box.

      [Sticky](/Sticky)

      - Use Sticky if a portion of the page should stick to either the top or bottom when scrolling.

    `}
  />,
);

export default cards;
