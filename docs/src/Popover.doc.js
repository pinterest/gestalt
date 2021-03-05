// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Popover"
    description="Popovers (formerly known as Flyouts) are similar to modals. They’re an alternative when there is less content to display, or to make the interaction feel faster."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'anchor',
        type: '?HTMLElement',
        required: true,
        description: 'Ref for the element that the Popover will attach to',
        href: 'anchor',
      },
      {
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the Popover to open',
        href: 'idealDirection',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'positionRelativeToAnchor',
        type: 'boolean',
        defaultValue: true,
        description: 'Depicts if the Popover shares a relative root with the anchor element',
        href: 'anchor',
      },
      {
        name: 'color',
        type: `"blue" | "orange" | "red" | "white" | "darkGray"`,
        defaultValue: 'white',
        description:
          'The background color of the Popover; red matches other default error messaging',
        href: 'errorPopover',
      },
      {
        name: 'shouldFocus',
        type: 'boolean',
        defaultValue: true,
        description: 'Focus on the popover when opened',
        href: 'errorPopover',
      },
      {
        name: 'showCaret',
        type: 'boolean',
        defaultValue: false,
        description: 'Show the caret on the popover',
        href: 'showCaret',
      },
      {
        name: 'size',
        type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number`,
        description: `xs: 180px, sm: 230px, md: 284px, lg: 320px, xl: 360px, flexible: no inherent sizing from popover. Sets the maximum width of the Popover.`,
        defaultValue: 'sm',
        href: 'basicExample',
      },
    ]}
  />,
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button
          accessibilityExpanded={!!open}
          accessibilityHaspopup
          onClick={() => setOpen(!open)}
          text="Help"
        />
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="up"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box padding={3} display="flex" alignItems="center" direction="column" column={12}>
              <Text align="center">
                Need help with something? Check out our Help Center.
              </Text>
              <Box paddingX={2} marginTop={3}>
                <Button color="red" text="Visit the help center" />
              </Box>
            </Box>
          </Popover>
        </Layer>}
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="showCaret"
    name="Example: Show Caret"
    defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button
          accessibilityExpanded={!!open}
          accessibilityHaspopup
          onClick={() => setOpen(!open)}
          text="Help"
        />
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="up"
            showCaret
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box padding={3} column={12}>
              <Text align="center">
                Popover with a caret, not a 🥕
              </Text>
            </Box>
          </Popover>
        </Layer>}
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="errorPopover"
    name="Example: ErrorPopover"
    description={`Popover can also take on additional roles. Like [TextField](#TextField) and [TextArea](#TextArea), this component
can be used to highlight errors on other types of form fields by setting the \`color\` to \`red.\``}
    defaultCode={`
function ErrorPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button onClick={() => setOpen(!open)} text="Remove" />
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="red"
            idealDirection="up"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            shouldFocus={false}
            size="md"
          >
            <Box padding={3}>
              <Text color="white">
                Oops! This item is out of stock.
              </Text>
            </Box>
          </Popover>
        </Layer>
      }
    </Box>
  );
}
`}
  />,
);

card(
  <Card
    id="anchor"
    description={`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Popover
    calculates its position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`Popover\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `}
    name="anchor"
  />,
);

card(
  <Card
    id="idealDirection"
    description={`
    The \`Popover\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential popovers
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the popover will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction.

    If no \`idealDirection\` is provided, the popover will open in the direction where there is the
    most space available within the viewport. If there is not enough space in any direction, the popover
    will no longer be context-specific (with a caret to the anchor) and will appear at the bottom of
    the screen. This is to ensure that users are always able to view the contents of the popover,
    regardless of their screen size.
  `}
    name="Ideal Direction Preference"
  />,
);

card(
  <Card
    description={`
    We recommend passing in the following ARIA attributes to the anchor element:

    * \`aria-haspopup\` lets the screen reader know that there is a popover linked to the trigger.
    * \`aria-expanded\` informs the screen reader whether the popover is currently open or closed.
  `}
    name="Accessibility"
  />,
);

export default cards;
