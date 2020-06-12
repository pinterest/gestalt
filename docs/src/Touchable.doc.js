// @flow strict
import React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Touchable"
    description="Touchable allows for elements to be clickable / touched in an accessible way. We add cursor & focus styles, trigger the `onTouch` when hitting Space / Enter and correct aria roles."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityControls',
        type: 'string',
        description:
          'Identifies the element whose contents or presence are controlled by the current element. Populates aria-controls.',
        href: 'accessibility-disclosure',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        description:
          'Use this property on elements that can expand to reveal additional information. Populates aria-expanded.',
        href: 'accessibility-disclosure',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        description:
          'Indicates that the element has a popup context menu or sub-level menu. Populates aria-haspopup.',
        href: 'accessibility-popup',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        description:
          'String that clients such as VoiceOver will read to describe the element. Populates aria-label.',
        href: 'accessibility-popup',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description:
          'Disables the Touchable area, prevents the events, remove the element from the tab order and populates aria-label.',
        defaultValue: false,
        href: 'disabled',
      },
      {
        name: 'fullHeight',
        type: 'boolean',
        href: 'fullHeightWidthExample',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultValue: true,
        href: 'fullHeightWidthExample',
      },
      {
        name: 'inline',
        type: 'boolean',
      },
      {
        name: 'mouseCursor',
        type: `"copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut"`,
        defaultValue: 'pointer',
        href: 'basicExample',
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticFocusEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onTouch',
        type:
          '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement> }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'rounding',
        type: `"pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
        href: 'basicExample',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
    description={`
    For a generic container to be clickable, use the Touchable component.

    If you have a \`Link\` or \`Button\` inside of Touchable, you can apply \`e.stopPropagation()\` so the \`onTouch\` doesn't get triggered.
  `}
    name="Example"
    defaultCode={`
function TouchableExample() {
  const [clicks, setClicks] = React.useState(0);

  return (
    <Box padding={2} width={150}>
      <Touchable
        mouseCursor="zoomIn"
        onTouch={() => setClicks(clicks + 1)}
        rounding={2}
      >
        <Mask rounding={2}>
          <Image
            alt="Antelope Canyon"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/DwYrGy6/stock14.jpg"
          />
        </Mask>
        <Box paddingY={2}>
          <Link
            href="https://en.wikipedia.org/wiki/Antelope_Canyon"
            onClick={({ event }) => event.stopPropagation()}
          >
            <Text align="center">Wiki Link</Text>
          </Link>
        </Box>
      </Touchable>
      <Box paddingY={2}>
        <Text color="gray" align="center">
          Clicked{' '}
          {clicks}{' '}
          {clicks === 1 ? 'time' : 'times'}
        </Text>
      </Box>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    id="fullHeightWidthExample"
    description={`
    \`fullWidth\` and \`fullHeight\` are flags on \`Touchable\` controlling how it is sized relative to the parent container.
    If one is set to \`true\`, the \`Touchable\` component will expand to the full size of its parent in that direction.
  `}
    name="Full width and full height"
    defaultCode={`
<Box color="white" display="flex" width={500} height={250}>
  <Box column={6}>
    <Touchable fullHeight>
      <Box height="100%" color="lightGray">
        <Text align="center">
          Full parent height
        </Text>
      </Box>
    </Touchable>
  </Box>
  <Box column={6}>
    <Touchable>
      <Box height="100%" color="lightGray">
        <Text align="center">
          Child height only
        </Text>
      </Box>
    </Touchable>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    id="accessibility-popup"
    description={`
      We want to make sure every touchable on the page is unique when being read by screenreader.
      - \`accessibilityHaspopup\` specifies that the button has associated content (i.e. Flyout).
      - \`accessibilityLabel\` updates the spoken text.
  `}
    name="Example: Accessibility (Popup)"
    defaultCode={`
function A11yExPopup() {
  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <Touchable
          accessibilityHaspopup
          accessibilityLabel="see more"
          onTouch={() => setOpen(!isOpen)}
        >
        <Box
          alignItems="center"
          borderSize="sm"
          display="flex"
          padding={2}
          rounding="pill"
        >
            <Box paddingX={1}>
              <Text weight="bold">See more</Text>
            </Box>
            <Box paddingX={1}>
              <Icon accessibilityLabel="" color="darkGray" icon="ellipsis" />
            </Box>
            </Box>
        </Touchable>
      </Box>
      {isOpen && (
        <Flyout
          anchor={anchorRef && anchorRef.current}
          idealDirection="right"
          onDismiss={() => undefined}
        >
          <Box padding={2}>
            <Text>I am a popup.</Text>
          </Box>
        </Flyout>
      )}
    </Box>
  );
}
`}
  />
);

card(
  <Example
    id="accessibility-disclosure"
    description={`
      We want to make sure every touchable area on the page is unique when being read by screenreader.
      - \`accessibilityControls\` specifies the \`id\` of an associated content element (i.e. Accordion panel) which is controlled by this touchable area.
      - \`accessibilityExpanded\` specifies that the associated content (i.e. Accordion panel) is open.
      - \`accessibilityLabel\` updates the spoken text.

      Be sure to internationalize your \`accessibilityLabel\`.
  `}
    name="Example: Accessibility (Disclosure)"
    defaultCode={`
function A11yExDisclosure() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Box>
      <Box display="inlineBlock" width={200}>
        <Touchable
          accessibilityControls="accordion-panel"
          accessibilityExpanded={isOpen}
          onTouch={() => setOpen(!isOpen)}
        >
          <Box
            alignItems="center"
            borderSize="sm"
            display="flex"
            justifyContent="between"
            padding={2}
            rounding="pill"
          >
            <Box paddingX={1}>
              <Text weight="bold">{isOpen ? 'Collapse' : 'Expand'}</Text>
            </Box>
            <Box paddingX={1}>
              <Icon accessibilityLabel="" icon={isOpen ? 'arrow-up' : 'arrow-down'} color="darkGray" />
            </Box>
          </Box>
        </Touchable>
      </Box>
      {isOpen && (
        <Box id="accordion-panel" role="region" padding={2}>
          <Text>I am an accordion panel.</Text>
        </Box>
      )}
    </Box>
  );
}
`}
  />
);

card(
  <Example
    id="disabled"
    description={`Disabled will reimplement the button's disabled behavior.`}
    name="Example: Disabled"
    defaultCode={`
function DisabledEx() {
  const [clickCount, setClickCount] = React.useState(0);
  const hasReachedLimit = clickCount === 5;
  const bgColor = hasReachedLimit ? 'lightGray' : 'white';
  const icon = hasReachedLimit ? 'face-sad' : 'face-happy';

  return (
    <Box>
      <Box display="inlineBlock" width={200}>
        <Touchable
          accessibilityControls="count-panel"
          disabled={hasReachedLimit}
          onTouch={() => setClickCount(clickCount + 1)}
        >
          <Box
            alignItems="center"
            borderSize="sm"
            color={bgColor}
            display="flex"
            justifyContent="between"
            padding={2}
            rounding="pill"
          >
            <Box paddingX={1}>
              <Text weight="bold">Click me</Text>
            </Box>
            <Box paddingX={1}>
              <Icon accessibilityLabel="" icon={icon} color="darkGray" />
            </Box>
          </Box>
        </Touchable>
      </Box>
      <Box id="count-panel" role="region" padding={2}>
        <Text>Number of clicks: {clickCount}</Text>
      </Box>
    </Box>
  );
}
`}
  />
);

export default cards;
