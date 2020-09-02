// @flow strict
import React, { type Node } from 'react';
import { IconButton } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="IconButton"
    description="The IconButton component allows you to define an action with a specific Icon."
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
        name: 'bgColor',
        type:
          '"transparent" | "transparentDarkGray" | "darkGray" | "gray" | "lightGray" | "white" | "red"',
        defaultValue: 'transparent',
        required: true,
        href: 'backgroundColorCombinations',
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{ __path: string }`,
        description: `When using this prop, make sure that the viewbox around the SVG path is 24x24`,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'disabledCombinations',
      },
      {
        name: 'iconColor',
        type: `"darkGray" | "gray" | "red" | "white"`,
        defaultValue: 'gray',
        href: 'iconColorCombinations',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        description: `This allows type checking for a valid icon name based on the keys from the list of icons in
        Icon.`,
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Specify a link URL.',
          'Required with link-role buttons.',
        ],
        href: 'roles',
      },
      {
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'padding',
        type: `1 | 2 | 3 | 4 | 5`,
        description: `Padding in boints. If omitted, padding is derived from the \`size\` prop.`,
        href: 'paddingCombinations',
      },
      {
        name: 'rel',
        type: `'none' | 'nofollow'`,
        required: false,
        defaultValue: 'none',
        description: 'Optional with link-role buttons.',
        href: 'roles',
      },
      {
        name: 'ref',
        type: `React.Ref<'button'> | React.Ref<'a'>`,
        description: 'Forward the ref to the underlying button element',
        href: 'refExample',
      },
      {
        name: 'role',
        type: `'button' | 'link'`,
        required: false,
        defaultValue: 'button',
        description: [
          `Select a button variant:`,
          `- 'button': Use to render 'submit' or 'button'-type buttons. The button is rendered as a '<button>'.`,
          `- 'link': Use for buttons to act like links. The button is rendered as an '<a>'.`,
          `Required with link-role buttons.`,
        ],
        href: 'roles',
      },
      {
        name: 'selected',
        type: 'boolean',
        defaultValue: false,
        href: 'selectedCombinations',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px`,
        defaultValue: 'md',
        href: 'sizeCombinations',
      },
      {
        name: 'target',
        type: `null | 'self' | 'blank'`,
        required: false,
        defaultValue: 'null',
        description: [
          'Define the frame or window to open the anchor defined on `href`:',
          '- `null` opens the anchor in the same window.',
          '- `blank` opens the anchor in a new window.',
          '- `self` opens an anchor in the same frame.',
          'Optional with link-role buttons.',
        ],
        href: 'roles',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<IconButton
  accessibilityLabel="Love"
  bgColor="white"
  icon="heart"
  iconColor="red"
  onClick={() => { console.log('❤️')}}
/>
`}
  />
);

card(
  <Example
    name="Roles"
    id="roles"
    defaultCode={`
function Example() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Stack gap={3}>
      <Row gap={1}>
        <Tooltip text="Default IconButton">
          <IconButton accessibilityLabel='Default IconButton' icon='share' onClick={() => {}} disabled={disabled} />
        </Tooltip>
        <Tooltip text="Link IconButton">
          <IconButton accessibilityLabel='Link IconButton' icon='link' role="link" target="blank" href="https://www.pinterest.com" disabled={disabled} />
        </Tooltip>
      </Row>
      <Row gap={1}>
        <Switch
          onChange={() => setDisabled(!disabled)}
          id="disable-buttons"
          switched={disabled}
        />
        <Box paddingX={2} flex="grow">
          <Label htmlFor="disable-buttons">
            <Text>Disable buttons</Text>
          </Label>
        </Box>
      </Row>
    </Stack>
  );
}
`}
  />
);

card(
  <Example
    id="accessibility-popup"
    description={`
      We want to make sure every button on the page is unique when being read by screenreader.
      - \`accessibilityHaspopup\` specifies that the button has associated content (i.e. Flyout).
      - \`accessibilityLabel\` updates the spoken text.
  `}
    name="Example: Accessibility (Popup)"
    defaultCode={`
function A11yExPopup() {
  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <>
      <Box display="inlineBlock" ref={anchorRef}>
        <IconButton
          accessibilityLabel="see more"
          accessibilityHaspopup
          icon="ellipsis"
          iconColor="darkGray"
          onClick={() => setOpen(!isOpen)}
        />
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
    </>
  );
}
`}
  />
);

card(
  <Example
    id="accessibility-disclosure"
    description={`
      We want to make sure every button on the page is unique when being read by screenreader.
      - \`accessibilityControls\` specifies the \`id\` of an associated content element (i.e. Accordion panel) which is controlled by this icon button.
      - \`accessibilityExpanded\` specifies that the associated content (i.e. Accordion panel) is open.
      - \`accessibilityLabel\` updates the spoken text.

      Be sure to internationalize your \`accessibilityLabel\`.
  `}
    name="Example: Accessibility (Disclosure)"
    defaultCode={`
function A11yExDisclosure() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Box display="inlineBlock">
        <IconButton
          accessibilityControls="accordion-panel"
          accessibilityExpanded={isOpen}
          accessibilityLabel={isOpen ? 'See less': 'See more'}
          icon={isOpen ? 'arrow-up' : 'arrow-down'}
          iconColor="darkGray"
          onClick={() => setOpen(!isOpen)}
        />
      </Box>
      {isOpen && (
        <Box
          aria-label={isOpen ? 'See less': 'See more'}
          id="accordion-panel"
          padding={2}
          role="region"
        >
          <Text>I am an accordion panel.</Text>
        </Box>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`
    A \`IconButton\` with an anchor ref to a Flyout component
  `}
    defaultCode={`
function IconButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <>
      <IconButton
        accessibilityLabel="Love Reaction"
        bgColor="white"
        icon="heart"
        iconColor="red"
        onClick={() => setOpen(true)}
        ref={anchorRef}
      />
      {open && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setOpen(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">You loved this pin!</Text>
          </Box>
        </Flyout>
      )}
    </>
  );
}`}
  />
);

card(
  <Combination
    id="sizeCombinations"
    name="Combinations: Size with default padding"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="paddingCombinations"
    name="Combinations: Size with custom padding"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
    padding={[1, 2, 3, 4, 5]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="iconColorCombinations"
    name="Combinations: Icon Color"
    iconColor={['darkGray', 'gray', 'red', 'white']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="backgroundColorCombinations"
    name="Combinations: Background Color"
    bgColor={[
      'transparent',
      'transparentDarkGray',
      'darkGray',
      'gray',
      'lightGray',
      'white',
    ]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="selectedCombinations"
    name="Combinations: Selected"
    color={['gray']}
    selected={[false, true]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="disabledCombinations"
    name="Combinations: Disabled"
    description="Icon buttons can be disabled as well. Adding the disabled flag to any color combination will add a 50% opacity and remove interactivity"
    iconColor={['darkGray', 'gray', 'red', 'white']}
  >
    {props => (
      <IconButton icon="heart" accessibilityLabel="" disabled {...props} />
    )}
  </Combination>
);

export default cards;
