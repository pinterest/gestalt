// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';
import PropTable from '../../../docs-components/PropTable.js';
import CombinationNew from '../../../docs-components/CombinationNew.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import Page from '../../../docs-components/Page.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';

import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
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
        accessibilityLabel="Create Pin Menu"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        tooltip={{text: "Create", idealDirection: "up"}}
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
              badge={{ text: 'New' }}
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
      <PropTable
        Component={IconButton}
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
            type: '"transparent" | "darkGray" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "red"',
            defaultValue: 'transparent',
            description:
              'Primary colors to apply to the IconButton background. See [background color](#Background-color) variant to learn more.',
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
              'Primary color to apply to the [Icon](/components/web/icon). See [icon color](#Icon-color) variant to learn more.',
          },
          {
            name: 'icon',
            type: '$Keys<typeof icons>',
            description:
              'Icon displayed in IconButton to convey the behavior of the component. Refer to the [iconography](/foundations/iconography/library#Search-icon-library) guidelines regarding the available icon options.',
          },

          {
            name: 'onClick',
            type: '({| event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> |}) => void',
            description:
              'Callback fired when the component is clicked, pressed or tapped. See [OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider) to learn more about link navigation.',
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
              'The maximum height and width of IconButton. See the [size](#Size) variant to learn more.',
          },
          {
            name: 'tabIndex',
            type: `-1 | 0`,
            defaultValue: 0,
            description:
              'Removes IconButton from sequential keyboard navigation to improve accessibility. See the [Accessibility](#Keyboard-interaction) guidelines for details on proper usage.',
          },
          {
            name: 'tooltip',
            type: `{| text: string, accessibilityLabel?: string, inline?: boolean, idealDirection?: 'up' | 'right' | 'down' | 'left', zIndex?: Indexable, |}`,
            description: `Adds a [Tooltip](/components/web/tooltip) on hover/focus of the IconButton. See the [With Tooltip](#With-Tooltip) variant to learn more.`,
          },
        ]}
      />
      <PropTable
        Component={IconButton}
        name='Additional role="button"'
        id="role_button"
        props={[
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
            name: 'role',
            type: 'button',
            description:
              'Sets button interaction in the component. See the [role](#Role) variant to learn more.',
          },
          {
            name: 'selected',
            type: 'boolean',
            description:
              'Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more.',
          },
          {
            name: 'type',
            type: `'submit' | 'button'`,
            required: false,
            defaultValue: 'button',
            description: 'Use "submit" if IconButton is used within or associated with a form.',
          },
        ]}
      />
      <PropTable
        Component={IconButton}
        name='Additional role="link"'
        id="role_link"
        props={[
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
            name: 'role',
            type: 'link',
            required: true,
            description:
              'Sets link interaction in the component. See the [role](#Role) variant and [OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider) to learn more about link navigation.',
          },
          {
            name: 'target',
            type: `null | 'self' | 'blank'`,
            description: `Define the frame or window to open the anchor defined on \`href\`. See the [role](#Role) variant to learn more.`,
          },
        ]}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Interface space is limited. Prioritize using a [Button](/components/web/buttons/button) if space is available.
- Triggering a [Modal](/components/web/modal) to complete a related task.
- Creating visual separation of actions in text-heavy content.
- Lower-emphasis actions that don't impede users from completing a task.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Displaying icons that don't have actions associated with them. Use an [Icon](/components/web/icon) instead.
- Displaying multiple IconButtons on a surface that uses the same icon for different actions.
- Text is better suited to convey the action and/or the icon isn't quickly recognizable by users.
- Destructive, high-emphasis actions, e.g "delete", "remove".
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use IconButton to perform low-emphasis actions, such as opening a [Modal](/components/web/modal) to edit a board."
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
        tooltip={{text: "Edit Pin"}}
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
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
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
      <Tooltip text="Go back to previous page">
        <IconButton
          accessibilityLabel="Back"
          icon="arrow-back"
          size="md"
        />
      </Tooltip>
      <Tooltip text="Send pin">
        <IconButton
          accessibilityLabel="Share"
          icon="share"
          size="md"
        />
      </Tooltip>
      <Tooltip text="Edit board details">
        <IconButton
          accessibilityLabel="Edit"
          icon="edit"
          size="md"
        />
      </Tooltip>
      <IconButton
        accessibilityControls="selectlist-dropdown-example3"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Open menu"
        icon="ellipsis"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="md"
        tooltip={{text: "More options"}}
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
            badge={{ text: 'New' }}
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
  <Tooltip text="Navigate to previous page">
    <IconButton
      accessibilityLabel="Back"
      icon="arrow-back"
      size="md"
    />
  </Tooltip>
  <Tooltip text="Send pin">
    <IconButton
      accessibilityLabel="Share"
      icon="share"
      size="md"
    />
  </Tooltip>
  <Tooltip text="Edit board details and sections">
    <IconButton
      accessibilityLabel="Customize"
      icon="edit"
      size="md"
    />
  </Tooltip>
  <Tooltip text="Create new pin or board">
    <IconButton
      accessibilityLabel="Create"
      icon="add"
      size="md"
    />
  </Tooltip>
  <Tooltip text="Search this board">
    <IconButton
      accessibilityLabel="Search"
      icon="search"
      size="md"
    />
  </Tooltip>
  <Button color="red" text="Save" size="md"/>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Display a [Tooltip](/components/web/tooltip) in conjunction with IconButton to provide context when the icon alone would be insufficient to convey the purpose of the button."
            defaultCode={`
  <IconButton
    accessibilityLabel="Share"
    icon="share"
    size="lg"
    tooltip={{text: "Send pin to others"}}
  />
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
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
IconButton conveys the component behavior using iconography. IconButton requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/components/web/icon). In the example below, the screen reader reads: "Create Pin menu". **The label should describe the intent of the action, not the Icon itself.** For example, use "Edit board" instead of "Pencil".

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
        accessibilityLabel="Create Pin Menu"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        tooltip={{text: "Create Pin", idealDirection: "up"}}
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
            accessibilityLabel="Open the settings page"
            target="blank"
            inline
            href="https://www.pinterest.com/settings/"
          >
            James Jones
          </Link>
        </Text>
        <IconButton
          accessibilityLabel="Open the settings page"
          href="https://www.pinterest.com/settings/"
          icon="edit"
          role="link"
          size="xs"
          tabIndex="-1"
          target="blank"
          tooltip={{text: "Edit name"}}
        />
      </Flex>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection name="Localization" description="Be sure to localize `accessibilityLabel`." />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Role"
          columns={2}
          description="IconButton can be use for navigation or actions."
        >
          <MainSection.Card
            cardSize="md"
            title="role = link"
            description={`If IconButton acts as a link, set \`role = link\` and pass role-specific [props](#role_linkProps).

\`target\` is optional and defines the frame or window to open the anchor defined on href:
* "null" opens the anchor in the same window.
* "blank" opens the anchor in a new window.
* "self" opens an anchor in the same frame.

\`rel\` is optional. Use "nofollow" for external links to specify to web crawlers not follow the link.

IconButtons that act as links can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider) to learn more about link navigation.`}
            defaultCode={`
<IconButton
  accessibilityLabel="This IconButton is an example of IconButton acting as a link"
  icon="visit"
  role="link"
  target="blank"
  href="https://www.pinterest.com"
  tooltip={{text: "Link example"}}
/>
`}
          />
          <MainSection.Card
            cardSize="md"
            title="role = button"
            description="If IconButton acts as a button, pass role-specific [props](#role_buttonProps)."
            defaultCode={`
<IconButton
  accessibilityLabel="This IconButton is an example of IconButton acting as a button"
  icon="share"
  onClick={() => {}}
  tooltip={{text: "Button Example"}}
/>
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
    Small IconButton should be used sparingly and only in places where the UI is very dense.
5. \`xs\` (24px)
    Use sparingly and only in places where the UI is very dense or has a case for an extra-small IconButton as they can be hard to see for people with visual impairments.

Use padding sparingly. The padding options are 1-5, which represents the padding in increments of 4 pixels (2 = 8px padding). Combine the \`padding\` with \`size\` options for custom icon/button size ratios. If omitted, padding is derived from the default padding for each \`size\` prop.`}
        >
          <CombinationNew size={['xl', 'lg', 'md', 'sm', 'xs']}>
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
          title="Icon color"
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`iconColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Dark Gray ("darkGray"). Medium emphasis, used for secondary actions.
3. Gray ("gray"). Low emphasis when placed on white backgrounds, used for tertiary actions. Medium emphasis when placed on dark backgrounds, used for secondary actions.
4. White ("white"). Used in a dark mode scheme or over a dark-colored background creating better visibility.
`}
        >
          <CombinationNew iconColor={['red', 'darkGray', 'gray', 'white']}>
            {({ iconColor }) => (
              <IconButton
                accessibilityLabel={`Example icon color ${iconColor}`}
                icon="add"
                iconColor={iconColor}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Background color"
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`bgColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Light Gray ("lightGray"). Medium emphasis, used for secondary actions.
3. Transparent Dark Gray ("transparentDarkGray"). Medium emphasis, used for secondary actions, usually above a colored background.
4. Gray ("gray"). Used for tertiary actions or in cases where the primary "red" is not an option. Medium emphasis when placed on dark backgrounds, used for secondary actions.
5. White ("white"). Used when there is a need of an IconButton over an image or colored background to provide better contrast and visibility.
6. Transparent ("transparent"). Used when there is a need to have an IconButton over an image without a background.
7. Dark Gray ("darkGray"). Used as the [selected state](#Selected-state) for IconButton.

`}
        >
          <CombinationNew
            bgColor={[
              'red',
              'lightGray',
              'transparentDarkGray',
              'gray',
              'white',
              'transparent',
              'darkGray',
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
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With Tooltip"
          description={`
            By specifying the \`tooltip\` property, a [Tooltip](/components/web/tooltip) will automatically be triggered when IconButton is hovered or focused. If the Tooltip \`text\` does not provide more information than the IconButton \`accessibilityLabel\`, set the tooltip prop's \`accessibilityLabel\` to an empty string, as seen below in the Edit example.
          `}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex gap={4}>
  <IconButton
    accessibilityLabel="Sharing"
    icon="share"
    tooltip={{
      text: "This Pin is private unless you share it with others.",
      idealDirection: "up"
    }}
  />
  <IconButton
    accessibilityLabel="Edit"
    icon="edit"
    tooltip={{
      text: "Edit",
      accessibilityLabel: "",
      idealDirection: "up"
    }}
  />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Custom icon"
          columns={2}
          description="IconButton accepts both Gestalt [Icons](/components/web/icon) and custom icons, as shown in the second example. For custom icons, follow our [custom SVG icons](/foundations/iconography/library#Custom-SVG-icons) guidelines."
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<IconButton
  accessibilityLabel="Go to next steps"
  icon="directional-arrow-right"
  tooltip={{text: "Built-in Gestalt Icon"}}
/>
`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<IconButton
  accessibilityLabel="Go to next steps"
  dangerouslySetSvgPath={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
  tooltip={{text: "Custom Icon"}}
/>
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
        accessibilityLabel="Create Pin Menu"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        tooltip={{text: "Create", accessibilityLabel: "", idealDirection: "up"}}
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
              badge={{ text: 'New' }}
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
          description={`To control focus, or position any anchor components to IconButton, use \`ref\`, as shown in the example below.`}
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
        accessibilityLabel="Favorite this Pin"
        bgColor="white"
        icon="heart"
        iconColor="red"
        onClick={() => { setOpen(true), setChecked(!checked) } }
        selected={checked}
        ref={anchorRef}
        tooltip={{text: "Favorite this pin", accessibilityLabel: ""}}
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
      </MainSection>
      <MainSection
        name="Writing"
        description="When pairing IconButton with [Tooltip](/components/web/tooltip), refer to the Tooltip component for writing guidelines.

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
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/components/web/buttons/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/components/web/icon)**
IconButtons use icons instead of text to convey available actions on a screen. Use an existing one from the Gestalt [Icon](/components/web/icon) library.

**[OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

**[Dropdown](/components/web/dropdown)**
It's most common to anchor Dropdown to [Button](/components/web/buttons/button) or IconButton.
      `}
        />
      </MainSection>{' '}
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'IconButton' }) },
  };
}
