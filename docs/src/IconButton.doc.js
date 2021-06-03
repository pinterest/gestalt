// @flow strict
import type { Node } from 'react';
import { IconButton } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import { customNavigationDescription } from './components/docsUtils.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="IconButton"
    description="IconButton allows users to take actions and make choices with a single click on a specific Icon. IconButton is typically found in forms, dialog, and toolbars. Some buttons are specialized for particular tasks, such as navigation or presenting menus."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to provide context about the icon button component behavior. IconButton does not have text for screen reader to read and provide context. Therefore, we must pass an alternative text.',
          'Accessibility: It populates aria-label.',
        ],
        href: 'basic',
      },
      {
        name: 'accessibilityControls',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          `Specify the 'id' of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.`,
          'Optional with button-role buttons.',
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
          'Optional with button-role buttons.',
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
          'Optional with button-role buttons.',
          'Accessibility: It populates aria-haspopup.',
        ],
        href: 'accessibility',
      },
      {
        name: 'bgColor',
        type:
          '"transparent" | "transparentDarkGray" | "darkGray" | "gray" | "lightGray" | "white" | "red"',
        required: false,
        defaultValue: 'transparent',
        description: 'Primary colors to apply to the button background.',
        href: 'backgroundColorCombinations',
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{ __path: string }`,
        required: false,
        defaultValue: null,
        description: [
          'Define a new icon different from the built-in Gestalt icons.',
          `When using 'dangerouslySetSvgPath', the viewbox around the SVG path must be 24x24 px`,
        ],
        href: 'icon',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description:
          'Set disabled state so IconButton looks inactive, cannot be interacted with, and actions are not available.',
        href: 'roles',
      },
      {
        name: 'iconColor',
        type: `"darkGray" | "gray" | "red" | "white"`,
        required: false,
        defaultValue: 'gray',
        description: 'Primary color to apply to the Gestalt Icon.',
        href: 'iconColor',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        required: false,
        defaultValue: null,
        description: [
          'Add a Gestalt icon to be displayed and convey the behaviour of the button.',
          `Accessibility: Icons are visual information and are not accessible for screen readers. 'accessibilityLabel' must be passed to provide sufficient context to the IconButton.`,
        ],
        href: 'icon',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        defaultValue: null,
        description: ['Specify a link URL.', 'Required with link-role buttons.'],
        href: 'roles',
      },
      {
        name: 'onClick',
        type:
          '({ event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| disableOnNavigation: () => void |}> }) => void',
        required: false,
        defaultValue: null,
        description: [
          'Callback fired when a button component is clicked (pressed and released) with a mouse or keyboard.',
          'Required with button-role buttons.',
          'See [custom navigation](#Custom-navigation) variant for examples.',
        ],
        href: 'selected',
      },
      {
        name: 'padding',
        type: `1 | 2 | 3 | 4 | 5`,
        required: false,
        defaultValue: null,
        description: [
          'Sets a padding for the IconButton.',
          `Combine the 'padding' with 'size' options for different icon/button size ratios. If omitted, padding is derived from the default padding for each 'size' prop.`,
          'Padding options are 1-5 representing the padding in boints.',
        ],
        href: 'padding',
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
        description: 'Forward the ref to the underlying button or anchor element',
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
        href: 'roles',
      },
      {
        name: 'role',
        type: `'button' | 'link'`,
        required: false,
        defaultValue: 'button',
        description: [
          `Select a button variant:`,
          `- 'button': Use to render 'submit' or 'button'-type buttons. The button is rendered as a \`<button>\`.`,
          `- 'link': Use for buttons to act like links. The button is rendered as an \`<a>\`.`,
          `Required with link-role buttons.`,
        ],
        href: 'roles',
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
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        required: false,
        defaultValue: 'md',
        description:
          'Display an IconButton in different sizes. Size changes the component padding modifying its fixed height & width: xs (24px), sm (32px), md (40px), lg (48px), xl (56px).',
        href: 'size',
      },
      {
        name: 'target',
        type: `null | 'self' | 'blank'`,
        required: false,
        defaultValue: 'null',
        description: [
          'Define the frame or window to open the anchor defined on `href`:',
          `- 'null' opens the anchor in the same window.`,
          `- 'blank' opens the anchor in a new window.`,
          `- 'self' opens an anchor in the same frame.`,
          'Optional with link-role buttons.',
        ],
        href: 'roles',
      },
    ]}
  />,
);

card(
  <Example
    name="Basic IconButton"
    id="basic"
    defaultCode={`
<IconButton
  accessibilityLabel="Open edit modal to edit Board"
  icon="edit"
/>
`}
  />,
);

card(
  <Example
    name="Roles"
    id="roles"
    defaultCode={`
function Example() {
  const [disabled, setDisabled] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(false);

  return (
    <Flex alignItems="start" direction="column" gap={6}>
      <Flex gap={2}>
        <Tooltip text="Default IconButton">
          <IconButton
            accessibilityLabel="Default IconButton"
            icon="share"
            onClick={() => {}}
            disabled={disabled}
            tabIndex={tabIndex ? -1 : 0}
          />
        </Tooltip>
        <Tooltip text="Link IconButton">
          <IconButton
            accessibilityLabel="Link IconButton"
            icon="visit"
            role="link"
            target="blank"
            href="https://www.pinterest.com"
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
  />,
);

card(
  <Combination id="size" name="Size" size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {(props) => (
      <IconButton accessibilityLabel={`Size ${props.color}`} icon="angled-pin" {...props} />
    )}
  </Combination>,
);

card(
  <Combination
    id="padding"
    name="Size: Icon/Button Ratio "
    size={['xs', 'sm', 'md', 'lg', 'xl']}
    padding={[1, 2, 3, 4, 5]}
  >
    {(props) => (
      <IconButton
        accessibilityLabel={`Size ${props.color}`}
        bgColor="red"
        icon="angled-pin"
        {...props}
      />
    )}
  </Combination>,
);

card(
  <Combination
    id="bgColor"
    name="Background Color"
    bgColor={[
      'transparent',
      'transparentDarkGray',
      'darkGray',
      'gray',
      'lightGray',
      'white',
      'red',
    ]}
    layout="4column"
  >
    {(props) => (
      <IconButton
        accessibilityLabel={`Background Color ${props.color}`}
        icon="angled-pin"
        {...props}
      />
    )}
  </Combination>,
);

card(
  <Combination id="iconColor" name="Icon Color" iconColor={['darkGray', 'gray', 'red', 'white']}>
    {(props) => (
      <IconButton
        icon="angled-pin"
        accessibilityLabel={`Icon Color ${props.color}`}
        bgColor={props.iconColor === 'white' ? 'red' : undefined}
        {...props}
      />
    )}
  </Combination>,
);

card(
  <Example
    name="Selected state"
    id="selected"
    defaultCode={`
function Example() {
  const [selected, setSelected] = React.useState(false);
  return (
    <IconButton
      accessibilityLabel="Open edit modal to edit Board"
      icon="check"
      onClick={() => {setSelected(!selected)}}
      selected={selected}
    />
  );
}
`}
  />,
);

card(
  <Example
    name="Icon"
    id="icon"
    defaultCode={`<Flex gap={2}>
  <Tooltip text="Built-in Gestalt Icon">
    <IconButton
      accessibilityLabel="Add icon"
      icon="directional-arrow-right"
    />
  </Tooltip>
  <Tooltip text="Custom Icon">
    <IconButton
      accessibilityLabel="Open edit modal to edit Board"
      dangerouslySetSvgPath={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
    />
  </Tooltip>
</Flex>
`}
  />,
);

card(
  <Example
    id="ref"
    name="ref"
    defaultCode={`
function IconButtonPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const anchorRef = React.useRef(null);
  return (
    <React.Fragment>
      <IconButton
        accessibilityLabel="Love Reaction to a Pin"
        bgColor="white"
        icon="heart"
        iconColor="red"
        onClick={() => { setOpen(true), setChecked(!checked) } }
        selected={checked}
        ref={anchorRef}
      />
      {open && checked &&(
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setOpen(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">You loved this pin!</Text>
          </Box>
        </Popover>
      )}
    </React.Fragment>
  );
}`}
  />,
);

card(
  <Example
    name="Accessibility: controls, expanded, & popup"
    id="accessibility"
    defaultCode={`
function MenuIconButtonExample() {
  const [selected, setSelected] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <React.Fragment>
      <IconButton
        accessibilityLabel="Open the options menu"
        accessibilityControls="menu"
        accessibilityExpanded={selected}
        accessibilityHaspopup
        selected={selected}
        icon="menu"
        onClick={() => setSelected(!selected)}
        ref={anchorRef}
      />
      {selected && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setSelected(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box
              id="menu"
              direction="column"
              display="flex"
              padding={2}
            >
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
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Custom navigation"
      description={customNavigationDescription('IconButton')}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [onNavigationMode, setOnNavigationMode] = React.useState('provider_disabled');

  const onNavigation = ({ href,target }) => {
    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <OnLinkNavigationProvider onNavigation/>. Disabled link: '+href+'. Opening business.pinterest.com instead.');
      window.open('https://business.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }

  const customOnNavigation = () => {
    // eslint-disable-next-line no-alert
    alert('CUSTOM NAVIGATION set on <IconButton onClick/>. Disabled link: https://pinterest.com. Opening help.pinterest.com instead.');
    window.open('https://help.pinterest.com', '_blank');
  }

  const onClickHandler = ({ event, disableOnNavigation }) => {
    if (onNavigationMode === 'provider_disabled') {
      disableOnNavigation()
    } else if (onNavigationMode === 'link_custom') {
      event.preventDefault();
      disableOnNavigation();
      customOnNavigation();
    }
  }

  const linkProps = {
    href:"https://pinterest.com",
    onClick: onClickHandler,
    target:"blank",
  }

  return (
    <OnLinkNavigationProvider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation controller:</Text>
            <RadioButton
              checked={onNavigationMode === 'provider_disabled'}
              id="provider_disabled"
              label="Default navigation (disabled custom navigation set on OnLinkNavigationProvider)"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_disabled')}
              value="provider_disabled"
            />
            <RadioButton
              checked={onNavigationMode === 'provider_custom'}
              id="provider_custom"
              label="Custom navigation set on OnLinkNavigationProvider"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_custom')}
              value="provider_custom"
            />
            <RadioButton
              checked={onNavigationMode === 'link_custom'}
              id="link_custom"
              label="Custom navigation set on IconButton"
              name="navigation"
              onChange={() => setOnNavigationMode('link_custom')}
              value="link_custom"
            />
          <Divider/>
        </Flex>
        <IconButton
          {...linkProps}
          accessibilityLabel="Link IconButton"
          icon="visit"
          iconColor="darkGray"
          role="link"
          size="lg"
        />
      </Flex>
    </OnLinkNavigationProvider>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[OnLinkNavigationProvider](/OnLinkNavigationProvider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
See [custom navigation](#Custom-navigation) variant for examples.
      `}
    />
  </MainSection>,
);

export default cards;
