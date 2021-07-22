// @flow strict
import { Fragment, type Node } from 'react';
import { IconButton } from 'gestalt';
import PropTable from './components/PropTable.js';
import CombinationNew from './components/CombinationNew.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="IconButton"
    description="IconButton allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.
 Some buttons are specialized for particular tasks, such as navigation or presenting menus."
    defaultCode={`
function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="sections-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="sections-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badgeText="New"
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
      `}
  />,
);

card(
  <PropTable
    Component={IconButton}
    name="IconButton"
    id="IconButton"
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'Label for screen readers to announce IconButton. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
      },
      {
        name: 'bgColor',
        type:
          '"transparent" | "darkGray" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "red"',
        defaultValue: 'transparent',
        description:
          'Primary colors to apply to the IconButton background. See [color](#Color) variant to learn more.',
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{| __path: string |}`,
        description:
          'Defines a new icon different from the built-in Gestalt icons. See [custom icon](#Custom-icon) variant to learn more.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'When disabled, IconButton looks inactive and cannot be interacted with.',
      },
      {
        name: 'iconColor',
        type: `"darkGray" | "gray" | "red" | "white"`,
        defaultValue: 'gray',
        description:
          'Primary color to apply to the [Icon](/Icon). See [color](#Color) variant to learn more.',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        description:
          'Icon displayed in IconButton to convey the behavior of the component. Refer to the [Icon](/Icon) component of the documentation regarding the available icon options.',
      },

      {
        name: 'onClick',
        type:
          '({| event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| disableOnNavigation: () => void |}> |}) => void',
        description:
          'Callback fired when the component is clicked, pressed or tapped. See [OnLinkNavigationProvider](/OnLinkNavigationProvider) to learn more about link navigation.',
      },
      {
        name: 'padding',
        type: `1 | 2 | 3 | 4 | 5`,
        description:
          'Sets a padding for the IconButton. See the [size](#Size) variant to learn more.',
      },
      {
        name: 'ref',
        type: `HTMLButtonElement | HTMLAnchorElement`,
        description:
          'Forward the ref to the underlying button or anchor element. See the [ref](#Ref) variant to learn more.',
      },
      {
        name: 'tabIndex',
        type: `-1 | 0`,
        defaultValue: 0,
        description:
          'Removes IconButton from sequential keyboard navigation to improve accessibility. See the [Accessibility](#Keyboard-interaction) guidelines for details on proper usage.',
      },
      {
        name: 'role',
        type: `'button' | 'link'`,
        defaultValue: 'button',
        description:
          'Defines the user interaction in the component. See the [role](#Role) variant to learn more.',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        defaultValue: 'md',
        description:
          'The maximum height and width of IconButton. See the [size](#Size-and-padding) variant to learn more.',
      },
    ]}
  />,
);

card(
  <PropTable
    Component={IconButton}
    name="Additional role = button"
    id="role_button"
    props={[
      {
        name: 'role',
        type: 'button',
        description:
          'Sets button interaction in the component. See the [role](#Role) variant to learn more.',
      },
      {
        name: 'accessibilityControls',
        type: 'string',
        description:
          'Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButton so that screen reader users can identify the relationship between elements. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        description:
          'Indicates that IconButton hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        description:
          'Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
      },
      {
        name: 'selected',
        type: 'boolean',
        description:
          'Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more.',
      },
    ]}
  />,
);

card(
  <PropTable
    Component={IconButton}
    name="Additional role = link"
    id="role_link"
    props={[
      {
        name: 'role',
        type: 'link',
        required: true,
        description:
          'Sets link interaction in the component. See the [role](#Role) variant and [OnLinkNavigationProvider](/OnLinkNavigationProvider) to learn more about link navigation.',
      },
      {
        name: 'href',
        type: 'string',
        required: true,
        description: 'Specifies a link URL.',
      },
      {
        name: 'rel',
        type: `'none' | 'nofollow'`,
        description:
          'Specifies the relationship between the current document and the linked document. See the [role](#Role) variant to learn more.',
      },
      {
        name: 'target',
        type: `null | 'self' | 'blank'`,
        description: `Define the frame or window to open the anchor defined on \`href\`. See the [role](#Role) variant to learn more.`,
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
- Interface space is limited. Prefer using a [Button](/Button) if space is available.
- Triggering a [Modal](/Modal) to complete a related task.
- Creating visual separation of actions in text-heavy contents.
- Less-emphasis actions that don't impede users from completing a task.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
- Displaying icons that don't have actions associated with them. Use an [Icon](/Icon) instead.
- Displaying multiple IconButtons on a surface that uses the same icon for different actions.
- Text is better suited to convey the action and/or the icon isn't quickly recognizable by users.
- Destructive high-emphasis actions, e.g "delete", "remove".
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use IconButton to perform low-emphasis actions, such as opening a [Modal](/Modal) to edit a board."
        defaultCode={`
function HeadingExample(props) {
  const ModalWithHeading = ({
    onDismiss,
  }) => {

    return (
      <Modal
        accessibilityModalLabel="Edit board"
        heading="Edit board"
        onDismiss={onDismiss}
        footer={
          <Flex alignItems="center" justifyContent="end">
            <Button color="red" text="Save"/>
          </Flex>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Box marginBottom={8}>
            <TextField
              id="name"
              onChange={({ value }) => console.log(value)}
              placeholder='Like "Places to go" or "Recipes to Make"'
              label="Name"
              type="text"
            />
          </Box>
          <Checkbox
            checked={false}
            id="secret"
            label="Keep this board secret"
            subtext="So only you and collaborators can see it."
            name="languages"
            onChange={({ checked }) => {
              console.log(checked);
            }}
          />
        </Box>
      </Modal>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <IconButton
        accessibilityLabel="Open edit modal"
        icon="edit"
        onClick={() => setShouldShow(true)}
        size="lg"
      />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Pair IconButton with a regular button to perform a high-emphasis action. IconButton should be a secondary action among regular buttons. "
        defaultCode={`
<Flex gap={2}>
  <Button text="Cancel" size="lg"/>
  <IconButton
    accessibilityLabel="Open edit modal"
    icon="trash-can"
    onClick={() => {}}
    iconColor="red"
    size="lg"
  />
</Flex>
`}
      />

      <MainSection.Card
        cardSize="md"
        type="do"
        description='Consider grouping multiple actions in an "ellipsis" IconButton to avoid distraction with an overload of icons.'
        defaultCode={`
function OrderDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex gap={2}>
      <IconButton
        accessibilityLabel="Click to go back."
        icon="arrow-back"
        size="md"
      />
      <IconButton
        accessibilityLabel="Share pin"
        icon="share"
        size="md"
      />
      <IconButton
        accessibilityLabel="Edit pin"
        icon="edit"
        size="md"
      />
      <IconButton
        accessibilityControls="selectlist-dropdown-example3"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Menu"
        icon="ellipsis"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="md"
      />
      <Button text="Visit" size="md"/>
      <Button color="red" text="Save" size="md"/>
      {open && (
        <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example3" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Download image", label: "Download image" }}
            selected={selected}
          />
          <Dropdown.Item
            badgeText="New"
            onSelect={onSelect}
            option={{ value: "Hide Pin", label: "Hide Pin" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: "Report Pin", label: "Report Pin" }}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  )
}`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Display more than 4 icon buttons in a single row as it can cause cognitive load and usability issues."
        defaultCode={`
<Flex gap={2}>
  <IconButton
    accessibilityLabel="Click to go back."
    icon="arrow-back"
    size="md"
  />
  <IconButton
    accessibilityLabel="Share pin"
    icon="share"
    size="md"
  />
  <IconButton
    accessibilityLabel="Edit pin"
    icon="edit"
    size="md"
  />
  <IconButton
    accessibilityLabel="Edit pin"
    icon="add"
    size="md"
  />
  <IconButton
    accessibilityLabel="Edit pin"
    icon="search"
    size="md"
  />
  <Button color="red" text="Save" size="md"/>
</Flex>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Display a [Tooltip](/Tooltip) in conjunction with IconButton to provide context when the IconButton solely would be insufficient."
        defaultCode={`
<Tooltip text="Send pin">
  <IconButton
    accessibilityLabel=""
    icon="share"
    size="lg"
  />
</Tooltip>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Add an IconButton on top of images unless it has a background that ensures easy readability and accessible contrast. Check the [background color](#Color) variant to learn more."
        defaultCode={`
<Box height={250} paddingX={2} width={250} >
  <Mask rounding={6} wash>
    <Image
        alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.ibb.co/x65Wctf/image.jpg"
      >
        <Box height="100%" padding={3} display="flex" justifyContent="end" alignItems="end">
          <IconButton
            accessibilityLabel="Share pin"
            icon="share"
            size="md"
            iconColor="white"
          />
        </Box>
      </Image>
  </Mask>
</Box>
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="ARIA attributes"
      description={`
IconButton conveys the component behavior using iconography. IconButton requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/Icon). In the example below, the screen reader reads: "More Options."

If IconButton is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that IconButton controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to IconButton. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="accessibility-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="accessibility-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
      `}
      />
      <MainSection.Subsection
        title="Keyboard interaction"
        description={`
The default behaviour for IconButton is to be focusable in sequential keyboard navigation in the order defined by the document's source order.

Use \`tabIndex\` to remove IconButton from the sequential keyboard navigation to improve accessibility. The example below shows a common use case when two consecutive and visually different elements perform the same action. One of them, in this case IconButton, can be removed from keyboard navigation to prevent screen readers from announcing the same interaction twice.
If IconButton is disabled, it's also unreachable from keyboard navigation.`}
      />
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example(props) {
  return (
    <Flex gap={2}>
      <Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" size="md" />
      <Flex gap={2} alignItems="center">
        <Text inline weight="bold">
          <Link
            accessibilityLabel="Open the setting page"
            target="blank"
            inline
            href="https://www.pinterest.com/settings/"
          >
            James Jones
          </Link>
        </Text>
        <IconButton
          accessibilityLabel="Open the setting page"
          href="https://www.pinterest.com/settings/"
          icon="edit"
          role="link"
          size="xs"
          tabIndex="-1"
          target="blank"
        />
      </Flex>
    </Flex>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(<MainSection name="Localization" description="Be sure to localize `accessibilityLabel`." />);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Role"
      columns={2}
      description={`IconButton can be use for navigation and actions. If IconButton acts as a link, set \`role = link\` and pass role-specific [props](#role_linkProps).


\`target\` is optional and defines the frame or window to open the anchor defined on href:
* "null" opens the anchor in the same window.
* "blank" opens the anchor in a new window.
* "self" opens an anchor in the same frame.

\`rel\` is optional. Use "follow" for external links to specify to web crawlers not follow the link.

IconButtons that act as links can be paired with [OnLinkNavigationProvider](/OnLinkNavigationProvider). See [OnLinkNavigationProvider](/OnLinkNavigationProvider) to learn more about link navigation.

If IconButton acts as a button, pass role-specific [props](#role_buttonProps).`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Tooltip text="Button">
  <IconButton
    accessibilityLabel="This IconButton is an example of IconButton acting as a button"
    icon="share"
    onClick={() => {}}
  />
</Tooltip>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Tooltip text="Link">
  <IconButton
    accessibilityLabel="This IconButton is an example of IconButton acting as a link"
    icon="visit"
    role="link"
    target="blank"
    href="https://www.pinterest.com"
  />
</Tooltip>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Size"
      description={`IconButton is available in 5 fixed sizes:

1. \`xl\` (56px)
    Extra large IconButtons should be used sparingly and only in places where the UI has a case for an extra-large IconButton.
2. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
3. \`md\` (40px)
    Medium is the size used on more dense UI such as business surfaces or internal tools.
4. \`sm\` (32px)
    Small Icon button should be used sparingly and only in places where the UI is very dense.
5. \`xs\` (24px)
    Use sparingly and only in places where the UI is very dense or has a case for an extra-small IconButton as they can be hard to see for people with visual impairments.

Use padding sparingly. Padding options are 1-5 representing the padding in boints units. Combine the \`padding\` with \`size\` options for custom icon/button size ratios. If omitted, padding is derived from the default padding for each \`size\` prop.`}
    >
      <CombinationNew size={['xs', 'sm', 'md', 'lg', 'xl']}>
        {({ size }) => (
          <IconButton
            accessibilityLabel={`Example size ${size}`}
            bgColor="lightGray"
            icon="add"
            iconColor="darkGray"
            size={size}
          />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Color"
      description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`iconColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Dark Gray ("darkGray"). Medium emphasis, used for secondary actions.
3. Light Gray ("lightGray"). Low emphasis when placed on white backgrounds, used for tertiary actions, and medium emphasis, used for secondary actions when placed on dark backgrounds.
4. White ("white"). Used in a dark mode scheme or over a dark-colored background creating better visibility.

Follow these guidelines for \`bgColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Dark Gray ("darkGray"). Medium emphasis, used for secondary actions.
3. Transparent Dark Gray ("transparentDarkGray"). Medium emphasis, used for secondary actions, usually above a colored background.
4. Light Gray ("lightGray"). Low emphasis when placed on white backgrounds, used for tertiary actions, and medium emphasis, used for secondary actions when placed on dark backgrounds.
5. White ("white"). Used when there is a need of an IconButton over an image or colored background to provide a better contrast and visibility.
6. Transparent ("transparent"). Used when there is a need to have an IconButton over an image without a background.
`}
    >
      <Fragment>
        <CombinationNew iconColor={['darkGray', 'gray', 'red', 'white']}>
          {({ iconColor }) => (
            <IconButton
              accessibilityLabel={`Example icon color ${iconColor}`}
              icon="add"
              iconColor={iconColor}
            />
          )}
        </CombinationNew>
        <CombinationNew
          bgColor={[
            'transparent',
            'transparentDarkGray',
            'darkGray',
            'gray',
            'lightGray',
            'white',
            'red',
          ]}
        >
          {({ bgColor }) => (
            <IconButton
              accessibilityLabel={`Example background color ${bgColor}`}
              bgColor={bgColor}
              icon="add"
            />
          )}
        </CombinationNew>
      </Fragment>
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Custom icon"
      columns={2}
      description="IconButton accepts both Gestalt [Icons](/Icon) and custom icons, as shown in the second example. For custom icons, follow our [Icon and SVG guidelines](/Faq#Icons-and-SVGs)."
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Tooltip text="Built-in Gestalt Icon">
  <IconButton
    accessibilityLabel="Add icon"
    icon="directional-arrow-right"
  />
</Tooltip>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Tooltip text="Custom Icon">
  <IconButton
    accessibilityLabel="Open edit modal to edit Board"
    dangerouslySetSvgPath={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
  />
</Tooltip>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Selected state"
      description={`IconButton has a \`selected\` state to visually indicate that the element is selected, open, and/or active. If the selected state  controls the display of a Popover-based component (open/closed), use \`accessibilityExpanded\` to inform screen reader users. See the [Accessibility](#Keyboard-interaction) guidelines to learn more.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="sections-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="sections-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badgeText="New"
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
      `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Ref"
      description={`To control focus or position and anchor components to IconButton, use \`ref\` as shown in the example below.`}
    >
      <MainSection.Card
        cardSize="lg"
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
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Writing"
    description="When pairing IconButton with [Tooltip](/Tooltip), refer to the Tooltip component for writing guidelines.

"
  >
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`
- Use a descriptive label to describe the IconButton action by beginning with a verb.
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`Use the words "image" or "icon" in the description label; instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit".`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Button](/Button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/Icon)**
IconButtons use icons instead of text to convey available actions on a screen. Use an existing one from the Gestalt [Icon](/Icon) library.

**[OnLinkNavigationProvider](/OnLinkNavigationProvider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

**[Dropdown](/Dropdown)**
It's most common to anchor Dropdown to [Button](/Button) or IconButton.
      `}
    />
  </MainSection>,
);

export default cards;
