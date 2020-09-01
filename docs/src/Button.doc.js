// @flow strict
import React, { type Node } from 'react';
import { Button } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Button"
    description="Buttons allow users to take actions, and make choices, with a single click. They are typically found in forms, dialog, and toolbars. Some buttons are specialized for particular tasks, such as navigation or presenting menus."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          'Use IconButton if you only need a button with an icon and no text.',
          'Accessibility: It populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of `text`.',
        ],
        href: 'accessibilityLabel',
      },
      {
        name: 'accessibilityControls',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-controls.',
        ],
        href: 'accessibility',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: [
          'Indicate that a button component hides or exposes collapsible components and expose whether they are currently expanded or collapsed.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-expanded.',
        ],
        href: 'accessibility',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: [
          'Indicate that a button component controls the appearance of menus and expose whether they are currently opened or closed.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-haspopup.',
        ],
        href: 'accessibility',
      },
      {
        name: 'color',
        type: `'gray' | 'red' | 'blue' | 'transparent' | 'white'`,
        required: false,
        defaultValue: 'gray',
        description: 'Primary colors to apply to the button background.',
        href: 'combinations',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description:
          'Set disabled state so buttons look inactive, cannot be interacted with, and actions are not available.',
        href: 'type-roles',
      },
      {
        name: 'iconEnd',
        type: '$Keys<typeof icons>',
        required: false,
        defaultValue: false,
        description: [
          'Add a Gestalt icon to be displayed after the button text. Sometimes an icon can help clarify the usage of a button. Menus are a common use case.',
          'Accessibility: Icons on buttons are not accessible for screen readers.',
          'Use IconButton if you only need buttons with icons and no text.',
        ],
        href: 'iconEnd',
      },
      {
        name: 'inline',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description:
          'Display a button as an inline element so that it does not start on a new line breaking the flow of the content. Inline buttons are sized by the text within the button, whereas the default block buttons expand to the full width of their container.',
        href: 'width',
      },
      {
        name: 'onClick',
        type:
          '({ event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> }) => void',
        required: false,
        defaultValue: null,
        description: [
          'Callback fired when a button component is clicked (pressed and released) with a mouse or keyboard.',
          'Required with button-role + button-type buttons.',
        ],
        href: 'selected',
      },
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg'`,
        required: false,
        defaultValue: 'md',
        description:
          'Display a button in different sizes. Size changes the component padding modifying its fixed height: sm (32px), md (40px), lg (48px).',
        href: 'size',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          'Accessibility: Screen readers read the `accessibilityLabel` prop, if present, instead of the `text` prop. See `accessibilityLabel` for more info.',
        ],
        href: 'basic-button',
      },
      {
        name: 'textColor',
        type: `'white' | 'darkGray' | 'blue' | 'red'`,
        required: false,
        defaultValue: null,
        description: [
          'Primary colors to apply to the text inside the Button.',
          'Text colors are automatically paired with the defined button `color`.',
          '`textColor` should only be used when using a white background color; it may become necessary to manually override the text color to match that of the parent`s background. Do not override the text color for any button besides those with white background as it breaks design standards.',
        ],
        href: 'textColor',
      },
      {
        name: 'type',
        type: `'submit' | 'button'`,
        required: false,
        defaultValue: 'button',
        description: [
          'Select a type of button-role button:',
          '-`button`: Use to render simple push buttons with no default behavior and control custom functionality inside the `onClick` callback.',
          '-`submit`: Use to submit forms. The button is inside/associated with a form.',
        ],
        href: 'type-roles',
      },
      {
        name: 'selected',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: [
          'Control the "selected" state of a button component to toggle binary states.',
          'Optional with button-role + button-type buttons.',
        ],
        href: 'selected',
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
        href: 'type-roles',
      },
      {
        name: 'ref',
        type: `React.Ref<'button'> | React.Ref<'a'>`,
        required: false,
        defaultValue: null,
        description:
          'Forward the ref to the underlying button or anchor element.',
        href: 'ref',
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
        href: 'type-roles',
      },
      {
        name: 'rel',
        type: `'none' | 'nofollow'`,
        required: false,
        defaultValue: 'none',
        description: 'Optional with link-role buttons.',
        href: 'type-roles',
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
        href: 'type-roles',
      },
    ]}
  />
);

card(
  <Example
    name="Basic button"
    id="basic-button"
    defaultCode={`<Button text="Medium-sized button" inline />`}
  />
);

card(
  <Example
    name="Types & Roles"
    id="type-roles"
    defaultCode={`
function Example() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Stack gap={3}>
      <Row gap={1}>
        <Tooltip text="Default button">
          <Button onClick={() => {}} text="Clear search history" inline disabled={disabled} />
        </Tooltip>
        <Tooltip text="Submit button">
          <Button type="submit" name='satisfaction-questionaire' text="Submit your response" inline disabled={disabled} />
        </Tooltip>
        <Tooltip text="Link button">
          <Button role="link" target='blank' href='https://www.pinterest.com' text="Visit pinterest.com" inline disabled={disabled} />
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
    name="Size"
    id="size"
    defaultCode={`<Row gap={1}>
  <Button size='sm' text="Small-sized button" inline />
  <Button text="Medium-sized button" inline />
  <Button size='lg' text="Large-sized button" inline />
</Row>`}
  />
);

card(
  <Example
    name="Width"
    id="widths"
    defaultCode={`
<>
  <Box padding={2}>
    <Button text="Inline button" inline />
  </Box>
  <Box padding={2}>
    <Button text="Default full-width button" />
  </Box>
</>`}
  />
);

card(
  <Example
    name="Icons"
    id="iconEnd"
    defaultCode={`
    <Button iconEnd='download' text="Download CVS file" inline />
`}
  />
);

card(
  <Example
    name="Selected state"
    id="selected"
    defaultCode={`
function Example() {
  const [selected, setSelected] = React.useState(false);
  return (
    <Button
      inline
      selected={selected}
      onClick={() => {setSelected(!selected)}}
      text={selected ? 'Selected' : 'Deselected'}
    />
  );
}
`}
  />
);

card(
  <Example
    id="ref"
    name="ref"
    defaultCode={`
function ButtonFlyoutExample() {
  const [selected, setSelected] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <>
      <Button
        inline
        onClick={() => setSelected(!selected)}
        ref={anchorRef}
        selected={selected}
        text={selected ? "Hide Flyout" : "Show Flyout"}
      />
      {selected && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setSelected(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">This is a Button with an anchor ref to a Flyout component</Text>
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
    name="Text color"
    id="textColor"
    defaultCode={`

function TextColorExample() {
  const { name: colorSchemeName } = useColorScheme();
  return (
    <Box display="flex">
      <Box color="blue" column={4} rounding={2} padding={4} margin={4}>
        <Box marginBottom={4}>
          <Text color="white">
            Click to crop, rotate, apply filters, or edit your image.
          </Text>
        </Box>
        <Row justifyContent="center" gap={1} >
          <Button color="transparent" text="Later" textColor="white" />
          <Button color="white" textColor={colorSchemeName === 'darkMode' ? 'darkGray' : 'blue'} text="Got it" />
        </Row>
      </Box>
      <Box color="red" column={4} rounding={2} padding={4} margin={4}>
        <Box marginBottom={4}>
          <Text color="white">
            Oops, something went wrong! Would you like to try again?
          </Text>
        </Box>
        <Row justifyContent="center" gap={1} >
          <Button color="transparent" text="Cancel" textColor="white" />
          <Button color="white" textColor={colorSchemeName === 'darkMode' ? 'darkGray' : 'red'} text="Try again" />
        </Row>
      </Box>
      <Box color="darkGray" column={4} rounding={2} padding={4} margin={4}>
        <Box marginBottom={4}>
          <Text color="white">
            Explore today’s trending ideas, curated finds, and personalized picks.
          </Text>
        </Box>
        <Row justifyContent="center" gap={1} >
          <Button color="transparent" text="Later" />
          <Button color="white" text="Learn more" />
        </Row>
      </Box>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    name="Accessibility: label"
    id="accessibilityLabel"
    defaultCode={`
function AccessibilityExample() {
  const [selected, setSelected] = React.useState(false);

  return (
    <Button
      accessibilityLabel={selected ? "Unfollow Alberto on Pinterest" : "Follow Alberto on Pinterest"}
      onClick={() => setSelected(!selected)}
      inline
      selected={selected}
      text={selected ? "Unfollow" : "Follow"}        />
  );
}
`}
  />
);

card(
  <Example
    name="Accessibility: controls, expanded, & popup"
    id="accessibility"
    defaultCode={`
function MenuButtonExample() {
  const [selected, setSelected] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button
          accessibilityExpanded={selected}
          accessibilityHaspopup
          selected={selected}
          inline
          onClick={() => setSelected(!selected)}
          text="Menu"
        />
      </Box>

      {selected && (
        <Layer>
          <Flyout
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setSelected(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box direction="column" display="flex" padding={2}>
              <Box padding={2}>
                <Text weight="bold">
                  Option 1
                </Text>
              </Box>
              <Box padding={2}>
                <Text weight="bold">
                  Option 2
                </Text>
              </Box>
            </Box>
          </Flyout>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Combination
    id="combinations"
    name="Combinations"
    color={['gray', 'red', 'blue', 'white', 'transparent']}
    disabled={[false, true]}
    selected={[false, true]}
    size={['sm', 'md', 'lg']}
  >
    {(props, i) => (
      <Button
        id={`example-${i}`}
        onChange={() => {}}
        {...props}
        text="Button"
      />
    )}
  </Combination>
);

export default cards;
