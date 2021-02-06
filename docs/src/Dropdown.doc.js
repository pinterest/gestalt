// @flow strict
import React, { type Node } from 'react';
import { Dropdown } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Dropdown"
    description={`
    A dropdown displays a list of actions or options. It is triggered when a user interacts with a button, textfield or other control.
    `}
    pilot
  />,
);

card(
  <Example
    id="default"
    name="Basic Example"
    showHeading={false}
    showCode={false}
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
              accessibilityHaspopup
              accessibilityExpanded={open}
              iconEnd="arrow-down"
              text="Menu"
              inline
              ref={anchorRef}
              selected={open}
              onClick={ () => setOpen((prevVal) => !prevVal) }
            />
            {open && (
              <Dropdown onSelect={(event, item) => {console.log("Selecting", event, item);}} anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                index={20}
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
          'Ref for the element that the Dropdown will attach to, will most likely be a Button',
        href: 'default',
      },
      {
        name: 'children',
        required: true,
        type: 'React.ChildrenArray<React.Element<typeof DropdownItem | typeof DropdownSection>>',
        description: 'Should consist of Dropdown.Item and/or Dropdown.Section components',
        href: 'default',
      },
      {
        name: 'headerContent',
        type: 'React.Node',
        description: 'Content to display at the top of the Dropdown before any items or sections',
        href: 'customHeader',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique id to identify this Dropdown',
        href: 'default',
      },
      {
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the Dropdown to open',
        defaultValue: 'down',
        href: 'default',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        description: 'Callback when the menu is closed',
        href: 'default',
      },
      {
        name: 'onSelect',
        type:
          '({ event: SyntheticInputEvent<>, item: {label: string, value: string, subtext: string} }) => void',
        description: 'Callback when you select an item',
        href: 'default',
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description: 'An object representing the zIndex value of the Dropdown menu.',
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
        description: "When supplied, will display a Badge next to the item's label.",
        href: 'default',
      },
      {
        name: 'children',
        type: 'React.Node',
        description:
          'If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link, such as supporting React Router.',
        href: 'withCustomItemContent',
      },
      {
        name: 'isExternal',
        type: 'boolean',
        description:
          'When true, adds an arrow icon to the end of the item to signal this item takes users to an external source. Do not add if the item navigates users within the app.',
        href: 'default',
      },
      {
        name: 'option',
        type: '{| label: string, value: string, subtext: string |}',
        required: true,
        description: 'Object detailing the label, value, and (optional) subtext for this item.',
        href: 'withSubtext',
      },
      {
        name: 'selected',
        type:
          '{| label: string, value: string, subtext: string |} | Array<{| label: string, value: string, subtext: string |}>',
        description:
          'Either the selected item info or an array of selected items, used to determine when the "selected" icon appears on an item',
        href: 'default',
      },
      {
        name: 'handleSelect',
        type:
          '({| event: SyntheticInputEvent<>, item: {label: string, value: string, subtext: string} |}) => void',
        required: true,
        description: 'Callback when the user selects an item',
        href: 'default',
      },
      {
        name: 'href',
        type: 'string',
        description:
          'When supplied, wraps the item in a Link, and directs users to the url when item is selected.',
        href: 'default',
      },
      {
        name: 'onNavigationOptions',
        type: '({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void',
        description: [
          'onNavigationOptions works in conjunction with a Provider. Pass custom props to onNavigation. See Provider for examples.',
          `onNavigation's type is flexible. Each key's value is a React.Node or an event handler function.`,
          'Optional with href.',
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
        href: 'withSections',
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Label for the section',
        href: 'withSections',
      },
    ]}
  />,
);

card(
  <Card
    description={`
    <b>Important</b>: remember to include the following ARIA attributes on the element used for the \`anchor\` prop:

    * \`aria-controls\`: lets the screen reader know that this element controls the Dropdown menu (should match the \`id\` property passed to Dropdown).
    * \`aria-haspopup\`: lets the screen reader know that there is a Dropdown menu linked to the trigger.
    * \`aria-expanded\`: informs the screen reader whether the Dropdown menu is currently open or closed.

    Expected keyboard interaction:

    * Hitting \`Enter\` or \`Space\` key on the Dropdown's trigger opens the menu
    * \`Escape\` key closes the menu, while moving focus back on the Dropdown's trigger
    * Arrow keys are used to navigate items within the menu
    * \`Enter\` key selects an item within the Menu
    * \`Tab\` or \` Shift + Tab\` close the menu and move focus accordingly
  `}
    name="Accessibility"
  />,
);

card(
  <Example
    id="default"
    name="Basic Example"
    description={`
      A Dropdown can be attached to a [Button](/Button), [IconButton](/IconButton) or Textfield (via [Typeahead](/Typeahead)) using the \`anchor\` prop and is composed of multiple Dropdown Items.

      If an item navigates to a new page, rather than acting as a selection, an \`href\` should be provided. If the item navigates to a page outside of the app, the \`isExternal\` prop should also be specified. Additionally, each item can contain a badge by specifying \`badgeText\`.

      Dropdowns have a minimum width of \`180px\` and a maximum width of \`360px\`, after which the labels will truncate if needed. It will automatically open in the most convenient location, unless an \`idealDirection\` is specified.

    `}
    defaultCode={`
function DefaultMenuButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
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
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown id="basic-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
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
}
    `}
  />,
);

card(
  <Example
    id="sections"
    name="With Sections"
    description={`
      A Dropdown can also be composed of Dropdown Sections, which simply require a \`label\`. Dropdown Sections and Dropdown Items can be mixed as needed.
    `}
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
        icon="arrow-down"
        selected={open}
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="sections-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
        <Dropdown.Section label="Categories">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "item 1", label: "Item 1" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{
              value: "item 2",
              label:
                "Item 2 with a really long, detailed, complex name",
            }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="View options">
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            isExternal
            href="https://pinterest.com"
            option={{
              value: "item 3",
              label:
                "Item 3 with a really long, detailed, complex name",
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "item 4", label: "Item 4" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            isExternal
            href="https://pinterest.com"
            badgeText="New"
            option={{
              value: "item 5",
              label: "Item 5 with a really long name is a new item!",
            }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
  );
}
      `}
  />,
);

card(
  <Example
    id="customHeader"
    name="With a Custom Header"
    description={`
      A Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu.
    `}
    defaultCode={`
function HeaderButtonFlyoutExample() {
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
  />,
);

card(
  <Example
    id="withSubtext"
    name="With Subtext"
    description={`
      Each Dropdown Item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed.
    `}
    defaultCode={`
function SubtextIconButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        accessibilityControls="subtext-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        accessibilityLabel="More Options"
        selected={open}
        icon="add"
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
      />
      {open && (
        <Dropdown id="subtext-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "item 1", label: "Item 1", subtext: "Created Dec. 2020" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
          />
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name", subtext: "Extra subtext details" }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            badgeText="New"
            option={{ value: "item 4", label: "Item 4", subtext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }}
          />
          <Dropdown.Item
            isExternal
            badgeText="New"
            option={{ value: "item 5", label: "Item 5 with a really long name is a new item!" }}
            href="https://pinterest.com"
          />
        </Dropdown>
      )}
    </Box>
  );
}
      `}
  />,
);

card(
  <Example
    id="withCustomItemContent"
    name="With Custom Item Content"
    description={`
      If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link, such as supporting React Router. However, please use with caution and only when absolutely necessary.

      To ensure the entire width of the item is clickable, you will likely need to surround your custom content with a full-width Box.
    `}
    defaultCode={`
function CustomIconButtonFlyoutExample() {
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
        onClick={ () => setOpen((prevVal) => !prevVal) }
        ref={anchorRef}
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
  />,
);

card(
  <Card
    description={`
    Dropdowns should be used when offering users complex options to choose from.
    If an item acts as navigation, it automatically requires the use of the Dropdown component.
    Items can also be actions (like Logout or Add Account) or selections (like different display modes).

    If users need to select from a simple list of highly related options (without needing sections or subtext details), use a [SelectList](/SelectList).

    If users need the ability to choose an option by typing in an input and filtering a long list of options, use a [Typeahead](/Typeahead).
  `}
    name="Related"
  />,
);

export default cards;
