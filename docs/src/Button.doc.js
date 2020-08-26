// @flow strict
import React, { type Node } from 'react';
import { Button, Stack, Text } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

const buildDescription = (lines: Array<string>): Node => (
  <Stack gap={1}>
    {lines.map((line, idx) => (
      <Text key={idx} color="gray">
        {line}
      </Text>
    ))}
  </Stack>
);

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
        description: buildDescription([
          'Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          'Use IconButton if you only need a button with an icon and no text.',
          'Optional with button-type and submit-type buttons.',
          'Accessibility: It populates aria-label.  Screen readers read the `accessibilityLabel` prop, if present, instead of `text`.',
        ]),
        href: 'accessibilityI',
      },
      {
        name: 'accessibilityControls',
        type: 'string',
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.',
          'Optional with button-type buttons.',
          'Accessibility: It populates aria-controls.',
        ]),
        href: 'accessibilityII',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Indicate that a button component hides or exposes collapsible components and expose whether they are currently expanded or collapsed.',
          'Optional with button-type buttons.',
          'Accessibility: It populates aria-expanded.',
        ]),
        href: 'accessibilityII',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Indicate that a button component controls the appearance of menus and expose whether they are currently opened or closed.',
          'Optional with button-type buttons.',
          'Accessibility: It populates aria-haspopup.',
        ]),
        href: 'accessibilityII',
      },
      {
        name: 'color',
        type: `gray' | 'red' | 'blue' | 'transparent' | 'white'`,
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
        href: 'combinations',
      },
      {
        name: 'iconEnd',
        type: '$Keys<typeof icons>',
        required: false,
        defaultValue: false,
        description: buildDescription([
          'Add a Gestalt icon to be displayed after the button text. Sometimes an icon can help clarify the usage of a button. Menus are a common use case.',
          'Accessibility: Icons on buttons are not accessible for screen readers.',
          'Use IconButton if you only need buttons with icons and no text.',
        ]),
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
        type: '({ event: SyntheticMouseEvent<> }) => void',
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Callback fired when a button component is clicked (pressed and released) with a mouse or keyboard.',
          'Required with button-type buttons.',
        ]),
        href: 'selected',
      },
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg'`,
        required: false,
        defaultValue: 'md',
        description:
          'Display a button in different sizes. Size only changes top & bottom padding modifying the component height: sm (32px), md (40px), lg (48px).',
        href: 'height',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        defaultValue: null,
        description: buildDescription([
          'Text to render inside the button to convey the function and purpose of the button. The button text has a fix size.',
          'Accessibility: Screen readers read the `accessibilityLabel` prop, if present, instead of the `text` prop. See `accessibilityLabel` for more info.',
        ]),
        href: 'basic-button',
      },
      {
        name: 'textColor',
        type: `'white' | 'darkGray' | 'blue' | 'red'`,
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Primary colors to apply to the text inside the Button.',
          'Text colors are automatically paired with the defined button `color`.',
          '`textColor` should only be used when using a white background color; it may become necessary to manually override the text color to match that of the parent`s background. Do not override the text color for any button besides those with white background as it breaks design standards.',
        ]),
        href: 'textColor',
      },
      {
        name: 'type',
        type: `'submit' | 'button' | 'link'`,
        required: false,
        defaultValue: 'button',
        description: buildDescription([
          'Select a button variant:',
          '-`button`: Use to render simple push buttons with no default behavior and control custom functionality inside the `onClick` callback. The button is rendered as an button or  `<button> tag`.',
          '-`submit`: Use to submit forms.  The button is inside/associated with a form. The button is rendered as an button or `<button> tag`.',
          '-`link`: Use for buttons to act like links. The button is rendered as an anchor or `<a> tag`.',
          'Required with submit-type and link-type buttons.',
        ]),
        href: 'type',
      },
      {
        name: 'selected',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: buildDescription([
          'Control the "selected" state of a button component to toggle binary states.',
          'Optional with button-type buttons.',
        ]),
        href: '',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        defaultValue: null,
        description: buildDescription([
          'Specify a redirect url.',
          'Required with link-type buttons.',
        ]),
        href: 'type',
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
        name: 'rel',
        type: `'none' | 'nofollow'`,
        required: false,
        defaultValue: 'none',
        description: 'Optional with link-type buttons.',
        href: 'type',
      },
      {
        name: 'target',
        type: `null | 'self' | 'blank'`,
        required: false,
        defaultValue: 'null',
        description: buildDescription([
          'Define the frame or window to open the anchor defined on `href`:',
          '- `null` opens the anchor in the same window.',
          '- `blank` opens the anchor in a new window.',
          '- `self` opens an anchor in the same frame.',
          'Optional with link-type buttons.',
        ]),
        href: 'type',
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
    name="Types"
    id="type"
    defaultCode={`
<Row gap={1}>
    <Tooltip text="button-type button">
      <Button onClick={() => {}} text="Clear search history" inline />
    </Tooltip>
    <Tooltip text="submit-type button">
      <Button type="submit" name='satisfaction-questionaire' text="Submit your response" inline />
    </Tooltip>
    <Tooltip text="link-type button">
      <Button type="link" target='blank' href='https://www.pinterest.com' text="Visit pinterest.com" inline />
    </Tooltip>
</Row>
`}
  />
);

card(
  <Example
    name="Height"
    id="height"
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
function MenuButtonExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button
          accessibilityExpanded={!!open}
          accessibilityHaspopup
          iconEnd={open ? "arrow-down" : "arrow-forward"}
          inline
          onClick={() => setOpen(!open)}
          text="Menu"
        />
      </Box>

      {open && (
        <Layer>
          <Flyout
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
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
  <Example
    id="ref"
    name="ref"
    defaultCode={`
function ButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <>
      <Button
        inline
        onClick={() => setOpen(true)}
        ref={anchorRef}
        text="Show Flyout"
      />
      {open && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setOpen(false)}
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
    name="Accessibility I"
    id="accessibilityI"
    defaultCode={`
function AccessibilityExample() {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <Button
      accessibilityLabel={isFollowing ? "Following Alberto on Pinterest" : "Follow Alberto on Pinterestlow"}
      onClick={() => setIsFollowing(!isFollowing)}
      inline
      text={isFollowing ? "Following" : "Follow"}
    />
  );
}
`}
  />
);

card(
  <Example
    name="Accessibility II"
    id="accessibilityII"
    defaultCode={`
function AccessibilityExample() {
  const [isOpen, setOpen] = React.useState(false);
  const COLLAPSIBLE_MENU = "collapsible-menu"

  return (
    <Box column={5}>
      <Button
        accessibilityControls={COLLAPSIBLE_MENU}
        accessibilityExpanded={isOpen}
        accessibilityHasPopup="true"
        inline
        iconEnd={isOpen ? "arrow-down" : "arrow-forward"}
        onClick={() => setOpen(!isOpen)}
        text={isOpen ? "Hide the settings menu" : "Show the settings menu"}
      />
      {isOpen && (
        <Box fit={false} id={COLLAPSIBLE_MENU} padding={2}>
          <Stack gap={1}>
            <Button size="sm" inline text="Language"/>
            <Button size="sm" inline text="Privacy"/>
            <Button size="sm" inline text="Notifications"/>
          </Stack>
        </Box>
      )}
    </Box>
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
