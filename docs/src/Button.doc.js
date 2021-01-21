// @flow strict
import React, { type Node } from 'react';
import { Button } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

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
          'Indicate that a button component controls the appearance of interactive popup elements, such as menu or dialog.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-haspopup.',
        ],
        href: 'accessibility',
      },
      {
        name: 'color',
        type: `'gray' | 'red' | 'blue' | 'transparent' | 'transparentWhiteText' | 'white'`,
        required: false,
        defaultValue: 'gray',
        description: [
          'Primary colors to apply to the button background.',
          'Accessibility: Use `transparentWhiteText` to increase the contrast between a dark background and a transparent-Button text.',
        ],
        href: 'color',
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
        name: 'tabIndex',
        type: `-1 | 0`,
        required: false,
        defaultValue: 0,
        description: [
          'Remove the component from sequential keyboard navigation to improve accessibility. The component is not focusable with keyboard navigation but it can be focused with Javascript or visually by clicking with the mouse.',
          `The default behaviour for the component is to be focusable in sequential keyboard navigation in the order defined by the document's source order.`,
          `If component is disabled, the component is also unreachable from keyboard navigation.`,
        ],
        href: 'type-roles',
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
  <MainSection
    name="Best Practices"
    description="Buttons communicate actions that users can take and are typically placed in UIs including closeup modules, modals, flyouts, forms, cards, and bars."
  >
    <MainSection.Subsection>
      <MainSection.Card
        type="do"
        description="Do place primary buttons to the right or bottom of other button styles."
        defaultCode={`
      <ButtonGroup>
        <Button text="Button" inline color="gray"/>
        <Button text="Button" inline color="red"/>
      </ButtonGroup>
    `}
      />
      <MainSection.Card
        description="Don't place more than one primary button per surface."
        type="don't"
        defaultCode={`
      <ButtonGroup>
        <Button text="Button" inline color="red"/>
        <Button text="Button" inline color="red"/>
      </ButtonGroup>
    `}
      />
      <MainSection.Card
        description="Don't place more than one primary button per surface."
        type="info"
        title="Info Example"
        defaultCode={`
      <ButtonGroup>
        <Button text="Button" inline color="red"/>
        <Button text="Button" inline color="red"/>
      </ButtonGroup>
    `}
      />
    </MainSection.Subsection>
  </MainSection>
);

card(
  <Example
    name="Basic Button"
    id="basic-button"
    defaultCode={`<Button text="Medium-sized button" inline />`}
  />
);

card(
  <Example
    name="Types &amp; Roles"
    id="type-roles"
    defaultCode={`
function Example() {
  const [disabled, setDisabled] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(false);

  return (
    <Flex alignItems="start" direction="column" gap={6}>
      <Flex gap={2}>
        <Tooltip text="Default button">
          <Button
            onClick={() => {}}
            text="Clear search history"
            inline
            disabled={disabled}
            tabIndex={tabIndex ? -1 : 0}
          />
        </Tooltip>
        <Tooltip text="Submit button">
          <Button
            type="submit"
            name="satisfaction-questionaire"
            text="Submit your response"
            inline
            disabled={disabled}
            tabIndex={tabIndex ? -1 : 0}
          />
        </Tooltip>
        <Tooltip text="Link button">
          <Button
            role="link"
            target="blank"
            href="https://www.pinterest.com"
            text="Visit pinterest.com"
            inline
            disabled={disabled}
            tabIndex={tabIndex ? -1 : 0}
          />
        </Tooltip>
      </Flex>
      <Flex gap={2}>
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
      </Flex>
      <Flex gap={2}>
        <Switch
          onChange={() => setTabIndex(!tabIndex)}
          id="unreachable-buttons"
          switched={tabIndex}
        />
        <Box paddingX={2} flex="grow">
          <Label htmlFor="unreachable-buttons">
            <Text>Remove from keyboard navigation with tabIndex</Text>
          </Label>
        </Box>
      </Flex>
    </Flex>
  );
}
`}
  />
);

card(
  <Example
    name="Size"
    id="size"
    defaultCode={`<Flex gap={2}>
  <Button size="sm" text="Small-sized button" inline />
  <Button text="Medium-sized button" inline />
  <Button size="lg" text="Large-sized button" inline />
</Flex>`}
  />
);

card(
  <MainSection
    name="Variants"
    description="Buttons can vary by size and/or color (hierarchy)."
  >
    <MainSection.Subsection
      title="Size"
      description="There are 3 size options: sm, md, and lg. Lg is the default for Pinner product."
    >
      <MainSection.Card
        cardSize="sm"
        title="Lg"
        description="Large is the only size available in Pinner product and is considered the default size."
        defaultCode={`
        <Button text="Button" inline color="red" size="lg"/>

    `}
      />
      <MainSection.Card
        cardSize="sm"
        title="Md"
        description="Medium"
        defaultCode={`
        <Button text="Button" inline color="red" size="md"/>

    `}
      />
      <MainSection.Card
        cardSize="sm"
        title="Sm"
        description="Small"
        defaultCode={`
        <Button text="Button" inline color="red" size="sm"/>

    `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection title="Hierarchy">
      <MainSection.Card
        cardSize="sm"
        title="Primary"
        description="High emphasis, used for primary actions."
        defaultCode={`
        <Button text="Button" inline color="red"/>

    `}
      />
      <MainSection.Card
        cardSize="sm"
        title="Secondary"
        description="Medium emphasis, used for secondary actions."
        defaultCode={`
        <Button text="Button" inline color="gray" />

    `}
      />
      <MainSection.Card
        cardSize="sm"
        title="Tertiary"
        shaded
        description="Low emphasis when placed on white backgrounds, used for tertiary actions, and medium emphasis, used for secondary actions when placed on dark backgrounds."
        defaultCode={`
        <Button text="Button" inline color="white"/>

    `}
      />
    </MainSection.Subsection>
  </MainSection>
);

card(
  <Combination
    id="color"
    name="Color"
    color={['gray', 'red', 'blue', 'white', 'transparent']}
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

card(
  <Example
    name="Color: transparent"
    id="transparent"
    defaultCode={`function Example() {
  const [selected, setSelected] = React.useState(false);
  return (
    <Box column={3}>
      <Box margin={3}>
        <Button
          text="Toggle text color & compare contrast"
          onClick={() => setSelected(!selected)}
          selected={selected}/>
      </Box>
      <Image
        alt="Image to compare contrast between text color and background."
        color="rgb(231, 186, 176)"
        naturalHeight={751}
        naturalWidth={564}
        src="https://i.ibb.co/7bQQYkX/stock2.jpg"
      >
        <Box padding={2}>
        <Button
          color={selected ? 'transparentWhiteText' : 'transparent'}
          iconEnd="add-pin"
          text="Save this image"
          inline />
        </Box>
        <Box padding={2} position="absolute" bottom right>
          <Button
          color={selected ? 'transparent' : 'transparentWhiteText'}
          iconEnd="pin-hide"
          text="Hide this image"
          inline />
        </Box>
      </Image>
    </Box>
  )
};
`}
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
    <Button iconEnd="download" text="Download CVS file" inline />
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
      text={selected ? "Selected" : "Deselected"}
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
          accessibilityControls="menu"
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
            <Box id="menu" direction="column" display="flex" padding={2}>
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

export default cards;
