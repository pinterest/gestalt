// @flow strict
import * as React from 'react';
import { Button } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Button"
    description="
A form component that should be used to make something happen on the same page (i.e. open a modal).
You are able to specify the color, type, and width of buttons to change their appearance."
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
        name: 'color',
        type: `"blue" | "gray" | "red" | "transparent" | "white"`,
        defaultValue: 'gray',
        href: 'color',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'selected',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'iconEnd',
        type: '$Keys<typeof icons>',
        description:
          'Add an icon to be displayed after the button text. This allows type checking for a valid icon name based on the keys from the list of icons in Icon.',
        href: 'iconEnd',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
        href: 'widths',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'md',
        description: 'sm: 32px, md: 40px, lg: 48px',
        href: 'combinations',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
      },
      {
        name: 'textColor',
        type: `"blue" | "red" | "darkGray" | "white"`,
        description:
          'The color for the text shown inside the Button. Note: should only be used for "white" buttons',
        href: 'textColor',
      },
      {
        name: 'type',
        type: `"submit" | "button"`,
        defaultValue: 'button',
        href: 'types',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<Button text="Medium sized button" inline />
`}
  />
);

card(
  <Example
    description={`
    There are two different width options for buttons. The inline buttons are
    are sized by the text within the button, whereas the default block buttons
    expand to the full width of their container. The default \`inline\` is false.
  `}
    id="widths"
    name="Widths"
    defaultCode={`
<Box margin={-2}>
  <Box padding={2}>
    <Button text="Inline button" inline />
  </Box>
  <Box padding={2}>
    <Button text="Default full width button" />
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`\`transparent\` and \`white\` are our secondary colors for \`Button\`.`}
    id="color"
    name="Colors: Dark Backgrounds"
    defaultCode={`
<Box color="darkGray" maxWidth={320} rounding={2} padding={4}>
  <Box marginBottom={4}>
    <Text color="white">
      Explore today’s trending ideas, curated finds, and personalized
      picks.
    </Text>
  </Box>
  <Box display="flex" direction="row" marginLeft={-2} marginRight={-2}>
    <Box display="flex" direction="row" column={6} paddingX={2}>
      <Button color="transparent" text="Later" />
    </Box>
    <Box column={6} paddingX={2}>
      <Button color="white" text="Learn more" />
    </Box>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`When using the \`white\` background color for \`Button\` it may become necessary to
      override the text color within the button to match that of the parent's background. For this you
      may use the \`textColor\` prop to manually set the text color. NOTE: please refrain from overriding
      the text color for any button besides those with white background as it breaks our design standards.`}
    id="textColor"
    name="Text colors"
    defaultCode={`
<Box display="flex">
  <Box color="blue" maxWidth={320} rounding={2} padding={4} margin={4}>
    <Box marginBottom={4}>
      <Text color="white">
        Click to crop, rotate, apply filters, or edit your image.
      </Text>
    </Box>
    <Box display="flex" direction="row" marginLeft={-2} marginRight={-2}>
      <Box display="flex" direction="row" column={6} paddingX={2}>
        <Button color="transparent" text="Later" />
      </Box>
      <Box column={6} paddingX={2}>
        <Button color="white" textColor="blue" text="Got it" />
      </Box>
    </Box>
  </Box>
  <Box color="red" maxWidth={320} rounding={2} padding={4} margin={4}>
    <Box marginBottom={4}>
      <Text color="white">
        Oops, something went wrong! Would you like to try again?
      </Text>
    </Box>
    <Box display="flex" direction="row" marginLeft={-2} marginRight={-2}>
      <Box display="flex" direction="row" column={6} paddingX={2}>
        <Button color="transparent" text="Cancel" />
      </Box>
      <Box column={6} paddingX={2}>
        <Button color="white" textColor="red" text="Try again" />
      </Box>
    </Box>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`
A "selected" state should be used as a toggle state to turn something on or off.
  `}
    id="selected"
    name="Selected state"
    defaultCode={`

function Example() {
  const [selected, setSelected] = React.useState(true);
  return (
    <Button
      inline
      color="red"
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
    description={`
    There are 2 types of buttons: button and submit. Use the \`submit\` type when you do not
    need to specify an \`onClick\` handler. The default type is \`button\`.
  `}
    id="types"
    name="Types"
    defaultCode={`
<Box margin={-2} display="flex">
  <Box padding={2}>
    <Button onClick={() => {}} text="Clear" type="button" inline />
  </Box>
  <Box padding={2}>
    <Button color="red" text="Submit" type="submit" inline />
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description={`
    Sometimes an icon can help clarify the usage of the button. Menus are a common use case.
  `}
    id="iconEnd"
    name="Icons"
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
          color="white"
          iconEnd="arrow-down"
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
    <Box>
      <Box
        color="lightGray"
        display="inlineBlock"
        ref={anchorRef}
        rounding="pill"
      >
        <Button
          accessibilityHaspopup
          accessibilityLabel="see more"
          onClick={() => setOpen(!isOpen)}
          inline
          text="See more"
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
      We want to make sure every button on the page is unique when being read by screenreader.
      - \`accessibilityControls\` specifies the \`id\` of an associated content element (i.e. Accordion panel) which is controlled by this button.
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
      <Box
        color="lightGray"
        display="inlineBlock"
        rounding="pill"
        width={200}
      >
        <Button
          accessibilityControls="accordion-panel"
          accessibilityExpanded={isOpen}
          accessibilityLabel={isOpen ? 'See less': 'See more'}
          onClick={() => setOpen(!isOpen)}
          text={isOpen ? 'Collapse' : 'Expand'}
        />
      </Box>
      {isOpen && (
        <Box id="accordion-panel" padding={2} role="region">
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
  <Combination
    id="combinations"
    name="Combinations"
    color={['gray', 'red']}
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
