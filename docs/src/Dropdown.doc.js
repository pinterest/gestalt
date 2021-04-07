// @flow strict
import type { Node } from 'react';
import { Dropdown } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import { customNavigationDescription } from './components/docsUtils.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<FeedbackCallout componentName="Dropdown" />);

card(
  <PageHeader
    name="Dropdown"
    description={`
    Dropdown displays a list of actions, options or links. It is triggered when a user interacts with a Button, Textfield or other control. Dropdown allows for complex functionality that can’t be accomplished with SelectList.
    `}
    badge="pilot"
    defaultCode={`
      function IntroMenuButtonDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const handleSelect = ({item}) => {
          setSelected(item);
        };

        return (
          <Box display="flex" justifyContent="center">
            <Button
              accessibilityControls="demo-dropdown-example"
              accessibilityHaspopup
              accessibilityExpanded={open}
              iconEnd="arrow-down"
              text="Menu"
              inline
              ref={anchorRef}
              selected={open}
              size="lg"
              onClick={ () => setOpen((prevVal) => !prevVal) }
            />
            {open && (
              <Dropdown id="demo-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: "item 1", label: "Item 1" }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  isExternal
                  href="https://pinterest.com"
                  option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{ value: "item 4", label: "Item 4" }}
                />
                <Dropdown.Item
                  isExternal
                  badgeText="New"
                  option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
                  href="https://pinterest.com"
                />
                <Dropdown.Item
                  option={{ value: "item 6", label: "Item 6 navigates internally" }}
                  href="/typeahead"
                />
              </Dropdown>
            )}
          </Box>
        );
      }`}
  />,
);

card(
  <PropTable
    Component={Dropdown}
    name="Dropdown"
    id="Dropdown"
    props={[
      {
        name: 'anchor',
        type: '?HTMLElement',
        description:
          'Ref for the element that the Dropdown will attach to, will most likely be a [Button](/Button). See the [Accessibility](#Accessibility) guidelines to learn more.',
      },
      {
        name: 'children',
        required: true,
        type: 'React.ChildrenArray<React.Element<typeof DropdownItem | typeof DropdownSection>>',
        description:
          'Must be instances of Dropdown.Item and/or Dropdown.Section components. See the [Types of items](#Types-of-items) variant to learn more.',
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
        name: 'onSelect',
        type:
          '({| event: SyntheticInputEvent<>, item: {label: string, value: string, subtext?: string} |}) => void',
        description: 'Callback fired when you select an item.',
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description:
          'An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](/ZIndex%20Classes)',
      },
    ]}
  />,
);

card(
  <PropTable
    Component={Dropdown.Item}
    name="Dropdown.Item"
    id="Dropdown.Item"
    props={[
      {
        name: 'badgeText',
        type: 'string',
        description:
          "When supplied, will display a [Badge](/Badge) next to the item's label. See the [Badges](#Badges) variant to learn more.",
      },
      {
        name: 'children',
        type: 'React.Node',
        description:
          'If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link. See the [Custom item content](#Custom-item-content) variant to learn more.',
      },
      {
        name: 'isExternal',
        type: 'boolean',
        description:
          'When true, adds an arrow icon to the end of the item to signal this item takes users to an external source and opens the link in a new tab. Do not add if the item navigates users within the app. See the [Best practices](#Best-practices) for more info.',
      },
      {
        name: 'option',
        type: '{| label: string, value: string, subtext?: string |}',
        required: true,
        description: 'Object detailing the label, value, and optional subtext for this item.',
      },
      {
        name: 'selected',
        type:
          '{| label: string, value: string, subtext?: string |} | Array<{| label: string, value: string, subtext?: string |}>',
        description:
          'Either the selected item info or an array of selected items, used to determine when the "selected" icon appears on an item.',
      },
      {
        name: 'handleSelect',
        type:
          '({| event: SyntheticInputEvent<>, item: {label: string, value: string, subtext?: string} |}) => void',
        required: true,
        description: 'Callback when the user selects an item.',
      },
      {
        name: 'href',
        type: 'string',
        description:
          'When supplied, wraps the item in a Link, and directs users to the url when item is selected. See the [Types of items](#Types-of-items) variant to learn more.',
      },
      {
        name: 'onClick',
        type:
          'AbstractEventHandler<| SyntheticMouseEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLButtonElement>, {| disableOnNavigation: () => void |}',
        description: [
          'Callback fired when a component is activated with a mouse or keyboard. ',
          'See the [Custom navigation context](#Custom-navigation-context) variant and [Provider](/Provider) for more info.',
        ],
      },
    ]}
  />,
);

card(
  <PropTable
    Component={Dropdown.Section}
    name="Dropdown.Section"
    id="Dropdown.Section"
    props={[
      {
        name: 'children',
        type: 'React.ChildrenArray<React.Element<typeof DropdownItem>>',
        required: true,
        description: 'Any Dropdown.Items to be rendered',
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Label for the section. See the [Sections](#Sections) variant for more info.',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Dropdown when features such as subtext, custom headers or badges are needed, since this functionality is not available in [SelectList](/SelectList)."
        defaultCode={`
      function BestPracticeDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const handleSelect = ({item}) => {
          setSelected(item);
        };

        return (
          <Box display="flex" justifyContent="center">
            <Button
              accessibilityHaspopup
              accessibilityExpanded={open}
              iconEnd="arrow-down"
              text="Menu"
              inline
              ref={anchorRef}
              selected={open}
              size="lg"
              onClick={ () => setOpen((prevVal) => !prevVal) }
            />
            {open && (
              <Dropdown onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: "item 1", label: "Item 1" }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  isExternal
                  href="https://pinterest.com"
                  option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{ value: "item 4", label: "Item 4" }}
                />
                <Dropdown.Item
                  isExternal
                  badgeText="New"
                  option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
                  href="https://pinterest.com"
                />
                <Dropdown.Item
                  option={{ value: "item 6", label: "Item 6 navigates internally" }}
                  href="/typeahead"
                />
              </Dropdown>
            )}
          </Box>
        );
      }`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use Dropdown for a simple list of items. Use [SelectList](/SelectList) instead for the added native mobile functionality. The exception to this is multiple Dropdowns or SelectLists that could be grouped together to create visual inconsistency, such as filters. In this case, use Dropdowns for all."
        defaultCode={`
    function SimpleListDropdownExample() {
      const [open, setOpen] = React.useState(false);
      const [selected, setSelected] = React.useState(null);
      const anchorRef = React.useRef(null);
      const handleSelect = ({item}) => {
        setSelected(item);
      };

      return (
        <Box display="flex" justifyContent="center">

        <Button
          accessibilityControls="selectlist-dropdown-example"
          accessibilityHaspopup
          accessibilityExpanded={ open }
          iconEnd="arrow-down"
          text="Date range"
          inline
          selected={open}
          icon="add"
          size="lg"
          onClick={ () => setOpen((prevVal) => !prevVal) }
          ref={anchorRef}
        />
        {open && (
          <Dropdown id="selectlist-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 1", label: "Last 7 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 2", label: "Last 14 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 3", label: "Last 21 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 4", label: "Last 30 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 5", label: "Last 60 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 6", label: "Last 90 days" }}
            />
          </Dropdown>
        )}
      </Box>
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
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityLabel="Menu"
        accessibilityHaspopup
        accessibilityExpanded={open}
        icon="ellipsis"
        iconColor="darkGray"
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Download image", label: "Download image" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "Hide Pin", label: "Hide Pin" }}
          />
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            option={{ value: "Report Pin", label: "Report Pin" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
          />
        </Dropdown>
      )}
    </Box>
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
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityControls="tooltips-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        inline
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="tooltips-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Download image", label: "Download image" }}
          />

          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "Hide Pin", label: "Hide Pin" }}
          >
            <Box width="100%">
              <Tooltip text="Hides this Pin for this account only">
                <Text>Hide Pin</Text>
              </Tooltip>
            </Box>
          </Dropdown.Item>
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            option={{ value: "Report Pin", label: "Report Pin" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
          />
        </Dropdown>
      )}
    </Box>
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
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityControls="do-icon-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        inline
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="do-icon-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Settings", label: "Settings" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "Report a bug", label: "Report a bug" }}
          />
          <Dropdown.Item
            isExternal
            href="https://help.pinterest.com/en?source=gear_menu_web"
            option={{ value: "Get help", label: "Get help" }}
          />
          <Dropdown.Item
            isExternal
            href="https://policy.pinterest.com/en/privacy-policy"
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Avoid adding custom elements within Dropdown. While some custom elements may be technically possible, it is best to avoid customization that becomes difficult to maintain."
        defaultCode={`
function CustomContentDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityControls="dont-custom-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        inline
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="dont-custom-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Settings", label: "Settings" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "Report a bug", label: "Report a bug" }}
          />
          <Dropdown.Item
            isExternal
            href="https://help.pinterest.com/en?source=gear_menu_web"
            option={{ value: "Get help", label: "Get help" }}
          >
            <Icon icon="ad" color="darkGray" accessibilityLabel="Ad"/>
            <Text>Get help</Text>
          </Dropdown.Item>
          <Dropdown.Item
            isExternal
            href="https://policy.pinterest.com/en/privacy-policy"
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
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
  </MainSection>,
);

card(
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
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityControls="truncation-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        inline
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="truncation-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "Homefeed anpassen", label: "Homefeed anpassen", subtext: "Aktualisieren Sie Ihren Homefeed, um Ihre Vorlieben und Ideen besser widerzuspiegeln" }}
          />
          <Dropdown.Item
            isExternal
            href="https://help.pinterest.com/en?source=gear_menu_web"
            option={{ value: "Hilfe anfordern", label: "Hilfe anfordern" }}
          />
          <Dropdown.Item
            isExternal
            href="https://policy.pinterest.com/en/privacy-policy"
            option={{ value: "Nutzungsbedingungen und Datenschutzrichtlinien anzeigen", label: "Nutzungsbedingungen und Datenschutzrichtlinien anzeigen" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection title="Types of items" columns={2}>
      <MainSection.Card
        cardSize="md"
        title="Action"
        description="Typically a Dropdown item triggers an action, like “Hide a Pin”, or makes a selection, like “Cozy” for a layout setting."
        defaultCode={`
function ActionDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityControls="action-variant-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text={selected ? selected.label : "Display"}
        inline
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="action-variant-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Cozy", label: "Cozy" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Comfy", label: "Comfy" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}`}
      />
      <MainSection.Card
        cardSize="md"
        title="Link"
        description={`If an item navigates to a new page, an \`href\` should be provided. If the item navigates to a page outside of the current context, (either a non-Pinterest site or a different Pinterest sub-site), the \`isExternal\` prop should also be specified to display the "up-right" icon.`}
        defaultCode={`
function LinkDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="link-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="link-dropdown-example" onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            href="https://pinterest.com"
            option={{ value: "Create new board", label: "Create new board" }}
          />
          <Dropdown.Item
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: "Get help", label: "Get help" }}
          />
          <Dropdown.Item
            isExternal
            href="https://policy.pinterest.com/en/privacy-policy"
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Sections"
      description="Dropdown can also be composed of Dropdown.Section(s), which simply require a label. Use Dropdown.Section(s) to create hierarchy within a single Dropdown. Dropdown.Section and Dropdown.Items can be mixed as needed."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    if(selected.some(selectedItem => selectedItem.value === item.value )) {
      setSelected(selected => selected.filter(selectedItem => selectedItem.value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="sections-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        bgColor="lightGray"
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="sections-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
        <Dropdown.Section label="Create">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Pin", label: "Pin" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Story Pin", label: "Story Pin" }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Add">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{
              value: "Note",
              label:
                "Note",
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Section", label: "Section" }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
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
  const handleSelect = ({ item }) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
    <Button
      accessibilityControls="header-dropdown-example"
      accessibilityHaspopup
      accessibilityExpanded={ open }
      iconEnd="arrow-down"
      text="Menu"
      inline
      ref={ anchorRef }
      selected={ open }
      size="lg"
      onClick={ () => setOpen((prevVal) => !prevVal) }
    />
      {open && (
        <Dropdown
          id="header-dropdown-example"
          anchor={anchorRef.current}
          headerContent={
            <Text align="left" size="sm">
              This Pin was inspired by your <Text weight="bold" size="sm">
                <Link href="https://pinterest.com">recent activity</Link>
              </Text></Text>
          }
          onDismiss={() => {setOpen(false)}}
        >
          <Dropdown.Item
            handleSelect={() => {alert("Pin has been hidden");}}
            selected={selected}
            option={{ value: "item 1", label: "Hide Pin" }}
          />
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            selected={selected}
            option={{
              value: "item 2",
              label:
                "Report Pin",
            }}
          />
        <Dropdown.Section label="View options">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{
              value: "item 3",
              label:
                "Default",
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "item 4", label: "Compact" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{
              value: "item 5",
              label: "List",
            }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
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
  const handleSelect = ({item}) => {
    if(selected.some(selectedItem => selectedItem.value === item.value )) {
      setSelected(selected => selected.filter(selectedItem => selectedItem.value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="subtext-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="subtext-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
        <Dropdown.Section label="Accounts">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Pepper the Pupper", label: "Pepper the Pupper", subtext: "pepper@thepupper.com" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Mizu the Kitty", label: "Mizu the Kitty", subtext: "mizu@thekitty.com" }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="More options">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{
              value: "Settings",
              label:
                "Settings",
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Tune your home feed", label: "Tune your home feed" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            isExternal
            href="https://pinterest.com"
            option={{
              value: "Get help",
              label: "Get help",
            }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
  );
}
      `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Badges"
      description={`A [Badge](/Badge) can be used to indicate a new product surface or feature within the Dropdown using \`badgeText\`. Multiple badges within a Dropdown should be avoided when possible.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function BadgesDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    if(selected.some(selectedItem => selectedItem.value === item.value )) {
      setSelected(selected => selected.filter(selectedItem => selectedItem.value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="badges-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="badges-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
        <Dropdown.Section label="Create">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Pin", label: "Pin" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Story Pin", label: "Story Pin" }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Add">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{
              value: "Note",
              label:
                "Note",
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "Section", label: "Section" }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
  );
}
      `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Custom navigation context"
      description={customNavigationDescription('Dropdown')}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [onNavigationMode, setOnNavigationMode] = React.useState('provider_disabled');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const onNavigation = ({ href,target }) => {
    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <Provider onNavigation/>. Disabled link: '+href+'. Opening business.pinterest.com instead.');
      window.open('https://business.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }

  const customOnNavigation = () => {
    // eslint-disable-next-line no-alert
    alert('CUSTOM NAVIGATION set on <Dropdown.Item onClick/>. Disabled link: https://pinterest.com. Opening help.pinterest.com instead.');
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
    <Provider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation controller:</Text>
            <RadioButton
              checked={onNavigationMode === 'provider_disabled'}
              id="provider_disabled"
              label="Default navigation (disabled custom navigation set on Provider)"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_disabled')}
              value="provider_disabled"
            />
            <RadioButton
              checked={onNavigationMode === 'provider_custom'}
              id="provider_custom"
              label="Custom navigation set on Provider"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_custom')}
              value="provider_custom"
            />
            <RadioButton
              checked={onNavigationMode === 'link_custom'}
              id="link_custom"
              label="Custom navigation set on Link"
              name="navigation"
              onChange={() => setOnNavigationMode('link_custom')}
              value="link_custom"
            />
          <Divider/>
        </Flex>
        <Box display="flex" justifyContent="center">
        <Button
          accessibilityControls="basic-dropdown-example"
          accessibilityHaspopup
          accessibilityExpanded={open}
          iconEnd="arrow-down"
          text="Menu"
          inline
          ref={anchorRef}
          selected={open}
          size="lg"
          onClick={ () => setOpen((prevVal) => !prevVal) }
        />
        {open && (
          <Dropdown id="basic-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
            <Dropdown.Item
              { ...linkProps }
              isExternal
              option={{ value: 'item 3', label: 'Visit Settings page' }}
            />
          </Dropdown>
        )}
      </Box>
      </Flex>
    </Provider>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Custom item content"
      description={`
      If needed, users can supply custom content to each Dropdown.Item. This can be useful when extra functionality is needed. However, please use with caution and only when absolutely necessary.

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
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="custom-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        selected={open}
        icon="add"
        iconColor="darkGray"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
        size="lg"
      />
      {open && (
        <Dropdown
          id="custom-dropdown-example"
          anchor={anchorRef.current}
          onDismiss={() => {setOpen(false)}}
        >
          <Dropdown.Item
            isExternal
            option={{ value: "item 1", label: "Custom link 1" }}
            handleSelect={handleSelect}
            selected={selected}
          >
            <Box width="100%">
              <Text>
                <Link
                  hoverStyle="none"
                  href="https://pinterest.com"
                  target="blank"
                >
                  Custom link 1
                </Link>
              </Text>
            </Box>
          </Dropdown.Item>
          <Dropdown.Item
            isExternal
            option={{ value: "item 2", label: "Another custom link" }}
            handleSelect={handleSelect}
            selected={selected}
          >
            <Box width="100%">
              <Text>
                <Link
                  hoverStyle="none"
                  href="https://google.com"
                  target="blank"
                >
                  Another custom link
                </Link>
              </Text>
            </Box>
          </Dropdown.Item>
        </Dropdown>
      )}
    </Box>
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
**[Button](/Button), [IconButton](/IconButton)**
It is most common to anchor Dropdown to Button or IconButton.

**[ScrollBoundaryContainer](/ScrollBoundaryContainer)**
ScrollableContainer is needed for proper positioning when the Dropdown is located within a scrolling container. The use of ScrollableContainer ensures the Dropdown remains attached to its anchor when scrolling.

**[SelectList](/SelectList)**
If users need to select from a short, simple list (without needing sections, subtext details, or the ability to filter the list), use SelectList.

**[Typeahead](/Typeahead)**
If users need the ability to choose an option by typing in an input and filtering a long list of options, use Typeahead.

`}
    />
  </MainSection>,
);

export default cards;
