// @flow strict
import { type Node } from 'react';
import { Dropdown } from 'gestalt';
import PropTable from '../components/PropTable.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

const commonDropdownItemProps = [
  {
    name: 'badgeText',
    type: 'string',
    description:
      "When supplied, will display a [Badge](/badge) next to the item's label. See the [Badges](#Badges) variant to learn more.",
  },
  {
    name: 'dataTestId',
    type: 'string',
    description: 'When supplied, will add a data-test-id prop to the dom element.',
  },
  {
    name: 'children',
    type: 'React.Node',
    description:
      'If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link. See the [Custom item content](#Custom-item-content) variant to learn more.',
  },
  {
    name: 'option',
    type: '{| label: string, value: string, subtext?: string |}',
    required: true,
    description: 'Object detailing the label, value, and optional subtext for this item.',
  },
];

export default function DropdownPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Dropdown">
      <PageHeader
        name="Dropdown"
        description={generatedDocGen?.description}
        badge="pilot"
        defaultCode={`
      function IntroMenuButtonDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const onSelect = ({ item }) => setSelected(item);

        return (
          <Flex justifyContent="center">
            <Button
              accessibilityControls="demo-dropdown-example"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              selected={open}
              size="lg"
              text="Menu"
            />
            {open && (
              <Dropdown anchor={anchorRef.current} id="demo-dropdown-example" onDismiss={() => setOpen(false)}>
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 1", label: "Item 1" }}
                  selected={selected}
                />
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
                  selected={selected}
                />
                <Dropdown.Link
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  badgeText="New"
                  onSelect={onSelect}
                  option={{ value: "item 4", label: "Item 4" }}
                  selected={selected}
                />
                <Dropdown.Link
                  badgeText="New"
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
                />
                <Dropdown.Link
                  href="/combobox"
                  option={{ value: "item 6", label: "Item 6 navigates internally" }}
                />
              </Dropdown>
            )}
          </Flex>
        );
      }`}
      />
      <PropTable
        Component={Dropdown}
        id="Dropdown"
        props={[
          {
            name: 'anchor',
            type: '?HTMLElement',
            description:
              'Ref for the element that the Dropdown will attach to, will most likely be a [Button](/button). See the [Accessibility](#Accessibility) guidelines to learn more.',
          },
          {
            name: 'children',
            required: true,
            type:
              'React.ChildrenArray<React.Element<typeof DropdownItem | typeof DropdownSection>>',
            description:
              'Must be instances of Dropdown.Item, Dropdown.Link or Dropdown.Section components. See the [Types of items](#Types-of-items) variant to learn more.',
          },

          {
            name: 'dangerouslyRemoveLayer',
            type: 'boolean',
            defaultValue: false,
            description:
              'Removes the Layer component around Popover. Should only be used in cases where Layer breaks the Dropdown positionings such as when the anchor element is within a sticky component.',
          },
          {
            name: 'headerContent',
            type: 'React.Node',
            description:
              'Content to display at the top of the Dropdown before any items or sections. See the [Custom header](#Custom-header) variant to learn more.',
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description:
              'Unique id to identify each Dropdown. Used for [Accessibility](#Accessibility) purposes.',
          },
          {
            name: 'idealDirection',
            type: `'up' | 'right' | 'down' | 'left'`,
            description: 'Preferred direction for the Dropdown to open.',
            defaultValue: 'down',
          },
          {
            name: 'onDismiss',
            type: '() => void',
            required: true,
            description: 'Callback fired when the menu is closed.',
          },
          {
            name: 'zIndex',
            type: 'interface Indexable { index(): number; }',
            description:
              'An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](/zindex%20classes)',
          },
        ]}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Displaying a list of actions, options, or links. Usually displays 3 or more options.
          - Allowing complex functionality that a [SelectList](/selectlist) can't accomplish.
          - Taking immediate action or navigating users to another view.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - In cases when there are less than 3 items in the list, and there is space to display all options. Consider [RadioButtons](/radiobutton) or [Checkboxes](/checkbox) instead.
          - When it is desirable to filter a long list of options. Use [ComboBox](/combobox) instead.
          - Displaying a list of actions or options using the browser's native select functionality. Use [SelectList](/selectlist) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Dropdown when features such as subtext, custom headers or badges are needed, since this functionality is not available in [SelectList](/selectlist)."
            defaultCode={`
      function BestPracticeDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const onSelect = ({ item }) => setSelected(item);

        return (
          <Flex justifyContent="center">
            <Button
              accessibilityControls="selectlist-dropdown-example1"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              selected={open}
              size="lg"
              text="Menu"
            />
            {open && (
              <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example1" onDismiss={() => setOpen(false)}>
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 1", label: "Item 1" }}
                  selected={selected}
                />
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
                  selected={selected}
                />
                <Dropdown.Link
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  badgeText="New"
                  onSelect={onSelect}
                  option={{ value: "item 4", label: "Item 4" }}
                  selected={selected}
                />
                <Dropdown.Link
                  badgeText="New"
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
                />
                <Dropdown.Link
                  href="/combobox"
                  option={{ value: "item 6", label: "Item 6 navigates internally" }}
                />
              </Dropdown>
            )}
          </Flex>
        );
      }`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Dropdown for a simple list of items. Use [SelectList](/selectlist) instead for the added native mobile functionality. The exception to this is multiple Dropdowns or SelectLists that could be grouped together to create visual inconsistency, such as filters. In this case, use Dropdowns for all."
            defaultCode={`
    function SimpleListDropdownExample() {
      const [open, setOpen] = React.useState(false);
      const [selected, setSelected] = React.useState(null);
      const anchorRef = React.useRef(null);
      const onSelect = ({ item }) => setSelected(item);

      return (
        <Flex justifyContent="center">
          <Button
            accessibilityControls="selectlist-dropdown-example2"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
            text="Date range"
          />
          {open && (
            <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example2" onDismiss={() => setOpen(false)}>
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 1", label: "Last 7 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 2", label: "Last 14 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 3", label: "Last 21 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 4", label: "Last 30 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 5", label: "Last 60 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 6", label: "Last 90 days" }}
                selected={selected}
              />
            </Dropdown>
          )}
        </Flex>
          );
        }`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order the items in Dropdown either alphabetically or by usage. Place destructive actions at the bottom."
            defaultCode={`
function OrderDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="selectlist-dropdown-example3"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Menu"
        bgColor="lightGray"
        icon="ellipsis"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
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
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Attach Tooltips to menu items. Use the \`subtext\` property if additional explanation is needed."
            defaultCode={`
function NoTooltipsDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="tooltips-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="tooltips-dropdown-example" onDismiss={() => setOpen(false)}>
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
          >
            <Box width="100%">
              <Tooltip text="Hides this Pin for this account only">
                <Text>Hide Pin</Text>
              </Tooltip>
            </Box>
          </Dropdown.Item>
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
  );
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`Add an icon indicator when links are external using the \`isExternal\` prop. External links are either links outside of Pinterest or another sub-site of Pinterest.`}
            defaultCode={`
function ExternalLinksDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="do-icon-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="do-icon-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Settings", label: "Settings" }}
            selected={selected}
          />
          <Dropdown.Item
            badgeText="New"
            onSelect={onSelect}
            option={{ value: "Report a bug", label: "Report a bug" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: "Get help", label: "Get help" }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add custom elements within Dropdown. While some custom elements may be technically possible, it is best to avoid customization that becomes difficult to maintain."
            defaultCode={`
function CustomContentDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="dont-custom-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="dont-custom-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Settings", label: "Settings" }}
            selected={selected}
          />
          <Dropdown.Item
            badgeText="New"
            onSelect={onSelect}
            option={{ value: "Report a bug", label: "Report a bug" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: "Get help", label: "Get help" }}
          >
            <Icon accessibilityLabel="Ad" color="darkGray" icon="ad"/>
            <Text>Get help</Text>
          </Dropdown.Link>
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
    Remember to include the following ARIA attributes on the element used for the \`anchor\` prop:

    * \`accessibilityControls\`: lets the screen reader know that this element controls the Dropdown menu (should match the \`id\` property passed to Dropdown). Populates the [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityHaspopup\`: lets the screen reader know that there is a Dropdown menu linked to the trigger. Populates the [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityExpanded\`: informs the screen reader whether the Dropdown menu is currently open or closed. Populates the [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
  `}
        />
        <MainSection.Subsection
          title="Keyboard interaction"
          description={`
    * Hitting \`Enter\` or \`Space\` key on the Dropdown's trigger opens the menu
    * \`Escape\` key closes the menu, while moving focus back on the Dropdown's trigger
    * Arrow keys are used to navigate items within the menu
    * \`Enter\` key selects an item within the Menu
    * \`Tab\` or \` Shift + Tab\` close the menu and move focus accordingly
  `}
        />
      </MainSection>
      <MainSection name="Localization">
        <MainSection.Subsection
          title="Truncation"
          description={`
      When the text of the Dropdown.Item becomes longer than the width of the menu, either intentionally or through localization, the text will truncate at one line. Subtext will wrap as needed to display the full text.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function TruncationDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item.value === (selected || {}).value ? null : item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="truncation-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="truncation-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            badgeText="New"
            onSelect={onSelect}
            option={{
              value: 'Homefeed anpassen',
              label: 'Homefeed anpassen',
              subtext:
                'Aktualisieren Sie Ihren Homefeed, um Ihre Vorlieben und Ideen besser widerzuspiegeln',
            }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: 'Hilfe anfordern', label: 'Hilfe anfordern' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{
              value: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
              label: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
            }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Subcomponents" />
      <PropTable
        Component={Dropdown?.Item}
        name="Dropdown.Item"
        id="Dropdown.Item"
        props={[
          ...commonDropdownItemProps,
          {
            name: 'onSelect',
            type:
              '({| event: SyntheticInputEvent<>, item: {label: string, value: string, subtext?: string} |}) => void',
            required: true,
            description: 'Callback when the user selects an item using the mouse or keyboard.',
          },
          {
            name: 'selected',
            type:
              '{| label: string, value: string, subtext?: string |} | Array<{| label: string, value: string, subtext?: string |}>',
            description:
              'Either the selected item info or an array of selected items, used to determine when the "selected" icon appears on an item.',
          },
        ]}
      />
      <PropTable
        Component={Dropdown?.Link}
        name="Dropdown.Link"
        id="Dropdown.Link"
        props={[
          ...commonDropdownItemProps,
          {
            name: 'href',
            type: 'string',
            required: true,
            description:
              'Directs users to the url when item is selected. See the [Types of items](#Types-of-items) variant to learn more.',
          },
          {
            name: 'isExternal',
            type: 'boolean',
            description:
              'When true, adds an arrow icon to the end of the item to signal this item takes users to an external source and opens the link in a new tab. Do not add if the item navigates users within the app. See the [Best practices](#Best-practices) for more info.',
          },
          {
            name: 'onClick',
            type:
              'AbstractEventHandler<| SyntheticMouseEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLButtonElement>, {| dangerouslyDisableOnNavigation: () => void |}',
            description: [
              'Callback fired when clicked (pressed and released) with a mouse or keyboard. ',
              'See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.',
            ],
          },
        ]}
      />
      <PropTable
        Component={Dropdown?.Section}
        name="Dropdown.Section"
        id="Dropdown.Section"
        props={[
          {
            name: 'children',
            type: 'React.ChildrenArray<React.Element<typeof DropdownItem>>',
            required: true,
            description: 'Any Dropdown.Items and/or Dropdown.Links to be rendered',
          },
          {
            name: 'label',
            type: 'string',
            required: true,
            description:
              'Label for the section. See the [Sections](#Sections) variant for more info.',
          },
        ]}
      />
      <MainSection name="Variants">
        <MainSection.Subsection title="Types of items" columns={2}>
          <MainSection.Card
            cardSize="md"
            title="Action/Selection"
            description={`Typically a Dropdown item triggers an action, like “Hide a Pin”, or makes a selection, like “Cozy” for a layout setting. Use Dropdown.Item for these use cases. \`onSelect\` handles the user interaction, with the optional \`selected\` indicating the currently-selected item.`}
            defaultCode={`
function ActionDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text={selected ? selected.label : 'Display'}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="action-variant-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Cozy', label: 'Cozy' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Comfy', label: 'Comfy' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            title="Link"
            description={`If an item navigates to a new page, use Dropdown.Link with the required \`href\` prop. If the item navigates to a page outside of the current context, (either a non-Pinterest site or a different Pinterest sub-site), the \`isExternal\` prop should also be specified to display the "up-right" icon. Optional additional actions to be taken on navigation are handled by \`onClick\`. Dropdown.Link can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.
`}
            defaultCode={`
function LinkDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="link-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="link-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Link
            href="https://pinterest.com"
            option={{ value: 'Create new board', label: 'Create new board' }}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            onClick={() => { /* log click here */ }}
            option={{ value: 'Get help', label: 'Get help' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: 'See terms and privacy', label: 'See terms and privacy' }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sections"
          description="Dropdown can also be composed of Dropdown.Section(s), which simply require a label. Use Dropdown.Section(s) to create hierarchy within a single Dropdown. Dropdown.Sections, Dropdown.Items and Dropdown.Links can be mixed as needed."
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
          title="Custom header"
          description={`Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu. It can be used instead of a section header if the menu contains only one type of content that needs additional description. It can contain anything, but most often will contain just text and/or a link.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function CustomHeaderExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="header-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          headerContent={
            <Text align="start" size="sm">
              This Pin was inspired by your{' '}
              <Text weight="bold" size="sm">
                <Link href="https://pinterest.com">recent activity</Link>
              </Text>
            </Text>
          }
          id="header-dropdown-example"
          onDismiss={() => {
            setOpen(false);
          }}
        >
          <Dropdown.Item
            onSelect={() => alert('Pin has been hidden')}
            option={{ value: 'item 1', label: 'Hide Pin' }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{
              value: 'item 2',
              label: 'Report Pin',
            }}
            selected={selected}
          />
          <Dropdown.Section label="View options">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'item 3', label: 'Default' }}
              selected={selected}
            />
            <Dropdown.Item
              badgeText="New"
              onSelect={onSelect}
              option={{ value: 'item 4', label: 'Compact' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'item 5', label: 'List' }}
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
          title="Subtext"
          description={`Each Dropdown item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed. Use this text to add an additional description of the Dropdown item.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SubtextDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({item}) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="subtext-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="subtext-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Accounts">
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Pepper the Pupper',
                label: 'Pepper the Pupper',
                subtext: 'pepper@thepupper.com',
              }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Mizu the Kitty',
                label: 'Mizu the Kitty',
                subtext: 'mizu@thekitty.com',
              }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="More options">
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Settings',
                label: 'Settings',
              }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Tune your home feed', label: 'Tune your home feed' }}
              selected={selected}
            />
            <Dropdown.Link
              href="https://pinterest.com"
              isExternal
              option={{ value: 'Get help', label: 'Get help' }}
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
          title="Badges"
          description={`A [Badge](/badge) can be used to indicate a new product surface or feature within the Dropdown using \`badgeText\`. Multiple badges within a Dropdown should be avoided when possible.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function BadgesDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({item}) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="badges-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="badges-dropdown-example" onDismiss={() => setOpen(false)}>
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
          title="Custom item content"
          description={`
      If needed, users can supply custom content to each Dropdown.Item or Dropdown.Link. This can be useful when extra functionality is needed. However, please use with caution and only when absolutely necessary.

      To ensure the entire width of the item is clickable, you will likely need to surround your custom content with a full-width Box.
    `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function CustomIconButtonPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="custom-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="custom-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Link
            isExternal
            option={{ value: 'item 1', label: 'Custom link 1' }}
          >
            <Box width="100%">
              <Text>
                <Link hoverStyle="none" href="https://pinterest.com" target="blank">
                  Custom link 1
                </Link>
              </Text>
            </Box>
          </Dropdown.Link>
          <Dropdown.Link
            isExternal
            option={{ value: 'item 2', label: 'Another custom link' }}
          >
            <Box width="100%">
              <Text>
                <Link hoverStyle="none" href="https://google.com" target="blank">
                  Another custom link
                </Link>
              </Text>
            </Box>
          </Dropdown.Link>
        </Dropdown>
      )}
    </Flex>
  );
}
      `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/button), [IconButton](/iconbutton)**
It is most common to anchor Dropdown to Button or IconButton.

**[ScrollBoundaryContainer](/scrollboundarycontainer)**
ScrollableContainer is needed for proper positioning when the Dropdown is located within a scrolling container. The use of ScrollableContainer ensures the Dropdown remains attached to its anchor when scrolling.

**[SelectList](/selectlist)**
If users need to select from a short, simple list (without needing sections, subtext details, or the ability to filter the list), use SelectList.

**[ComboBox](/combobox)**
If users need the ability to choose an option by typing in an input and filtering a long list of options, use ComboBox.

**[OnLinkNavigationProvider](/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
`}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Dropdown' }) },
  };
}
