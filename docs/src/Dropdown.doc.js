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
    description="A dropdown displays a list of actions or options. It is triggered when a user interacts with a button, textfield or other control."
  />
);

card(
  <Example
    id="default"
    name="Basic Example"
    showHeading={false}
    showCode={false}
    defaultCode={`
      function MenuButtonDropdownExample() {
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
              onClick={() => { setOpen(!open) } }
            />
            {open && (
              <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 1', 'label': 'Item 1'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 2', 'label': 'Item 2 with a really long, detailed, complex name'}}
                />
                <Dropdown.Item
                  isExternal
                  url="https://pinterest.com"
                  option={{'value': 'item 3', 'label': 'Item 3 with a really long, detailed, complex name'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{'value': 'item 4', 'label': 'Item 4'}}
                />
                <Dropdown.Item
                  isExternal
                  badgeText="New"
                  option={{'value': 'item 5', 'label': 'Item 5 with a really long, detailed name'}}
                  url="https://pinterest.com"
                />
                <Dropdown.Item
                  option={{'value': 'item 6', 'label': 'Item 6 navigates internally'}}
                  url="/typeahead"
                />
              </Dropdown>
            )}
          </Box>
        );
      }`}
  />
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
        description: 'Ref for the element that the Dropdown will attach to',
        href: 'default',
      },
      {
        name: 'children',
        required: true,
        type: 'React.Node',
        description:
          'Should consist of Dropdown.Item and/or Dropdown.Section components',
        href: 'default',
      },
      {
        name: 'headerContent',
        type: 'React.Node',
        description:
          'Content to display at the top of the Dropdown before any items or sections',
        href: 'customHeader',
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
        href: 'default',
      },
      {
        name: 'onSelect',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when you select an item',
        href: 'default',
      },
    ]}
  />
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
          "When supplied, will display a Badge next to the item's label.",
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
          'When true, adds an arrow icon to the end of the item to signal this item takes users to an external source. Do not add if the item navigates users within the product.',
        href: 'default',
      },
      {
        name: 'option',
        type: 'Object: {label: string, value: string, subtext: string}',
        required: true,
        description:
          'Object detailing the label, value, and (optional) subtext for this item.',
        href: 'withSubtext',
      },
      {
        name: 'selected',
        type:
          'Object: {label: string, value: string, subtext: string} || Array<{label: string, value: string, subtext: string}>',
        description:
          'Either the selected item info or an array of selected items, used to determine when the "selected" icon appears on an item',
        href: 'default',
      },
      {
        name: 'handleSelect',
        type:
          '({ event: SyntheticInputEvent<>, item: {label: string, value: string, subtext: string} }) => void',
        required: true,
        description: 'Callback when you select an item',
        href: 'default',
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description:
          'When supplied, surrounds the item in a Link, and directs users to the url when item is selected.',
        href: 'default',
      },
    ]}
  />
);

card(
  <PropTable
    Component={Dropdown.Section}
    name="Dropdown.Section"
    id="Dropdown.Section"
    props={[
      {
        name: 'children',
        type: 'React.Node',
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
  />
);

card(
  <Card
    description={`
    Remember to include the following ARIA attributes on the element used for the \`anchor\` prop:

    * \`aria-haspopup\` lets the screen reader know that there is a Dropdown menu linked to the trigger.
    * \`aria-expanded\` informs the screen reader whether the Dropdown menu is currently open or closed.
  `}
    name="Accessibility"
  />
);

card(
  <Example
    id="default"
    name="Basic Example"
    description={`
      A Dropdown can be attached to a Button, IconButton, or Textfield (via [Typeahead](/Typeahead)) using the \`anchor\` prop and is composed of multiple Dropdown Items.

      If an item navigates to a new page, rather than acting as a selection, a \`url\` should be provided and the \`isExternal\` prop specified. Additionally, each item can contain a badge by specifying \`badgeText\`.

      Dropdowns have a minimum width of \`180px\` and a maximum width of \`360px\`, after which the labels will truncate if needed. It will automatically open in the most convenient location, unless an \`idealDirection\` is specified.

    `}
    defaultCode={`
      function MenuButtonDropdownExample() {
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
              onClick={() => { setOpen(!open) } }
            />
            {open && (
              <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 1', 'label': 'Item 1'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 2', 'label': 'Item 2 with a really long, detailed, complex name'}}
                />
                <Dropdown.Item
                  isExternal
                  url="https://pinterest.com"
                  option={{'value': 'item 3', 'label': 'Item 3 with a really long, detailed, complex name'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{'value': 'item 4', 'label': 'Item 4'}}
                />
                <Dropdown.Item
                  isExternal
                  badgeText="New"
                  option={{'value': 'item 5', 'label': 'Item 5 with a really long, detailed name'}}
                  url="https://pinterest.com"
                />
                <Dropdown.Item
                  isExternal
                  option={{'value': 'item 6', 'label': 'Item 6 navigates internally'}}
                  url="/typeahead"
                />
              </Dropdown>
            )}
          </Box>
        );
      }`}
  />
);

card(
  <Example
    id="sections"
    name="With Sections"
    description={`
      A Dropdown can also be composed of Dropdown Sections, which simply require a \`label\`. Dropdown Sections and Dropdown Items can be mixed as needed.
    `}
    defaultCode={`
      function IconButtonDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState([]);
        const anchorRef = React.useRef(null);
        const handleSelect = ({item}) => {
          if(selected.some(selectedItem => selectedItem.value === item.value )) {
            let updatedSelectedItems = selected.filter(selectedItem => selectedItem.value != item.value);
            setSelected(selected => updatedSelectedItems);
          } else {
            setSelected(selected => [...selected, item]);
          }
        };

        return (
          <Box display="flex" justifyContent="center">
            <IconButton
              accessibilityHaspopup
              accessibilityExpanded={open}
              accessibilityLabel="More Options"
              icon="arrow-down"
              selected={open}
              onClick={() => { setOpen(!open) } }
              ref={anchorRef}
            />
            {open && (
              <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
              <Dropdown.Section label="Sort by">
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: 'item 1', label: 'Item 1' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'item 2',
                    label:
                      'Item 2 with a really long, detailed, complex name',
                  }}
                />
              </Dropdown.Section>
              <Dropdown.Section label="View options">
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  isExternal
                  url="https://pinterest.com"
                  option={{
                    value: 'item 3',
                    label:
                      'Item 3 with a really long, detailed, complex name',
                  }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{ value: 'item 4', label: 'Item 4' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  isExternal
                  url="https://pinterest.com"
                  badgeText="New"
                  option={{
                    value: 'item 5',
                    label: 'Item 5 with a really long name is a new item!',
                  }}
                />
              </Dropdown.Section>
            </Dropdown>
            )}
          </Box>
        );
      }`}
  />
);

card(
  <Example
    id="customHeader"
    name="With a Custom Header"
    description={`
      A Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu.
    `}
    defaultCode={`
      function ButtonFlyoutExample() {
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
            onClick={() => { setOpen(!open) } }
          />
            {open && (
              <Dropdown
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
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{ value: 'item 1', label: 'Hide Pin' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'item 2',
                    label:
                      'Report Pin',
                  }}
                />
              <Dropdown.Section label="View options">
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'item 3',
                    label:
                      'Default',
                  }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{ value: 'item 4', label: 'Compact' }}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{
                    value: 'item 5',
                    label: 'List',
                  }}
                />
              </Dropdown.Section>
            </Dropdown>
            )}
          </Box>
        );
      }`}
  />
);

card(
  <Example
    id="withSubtext"
    name="With Subtext"
    description={`
      Each Dropdown Item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed.
    `}
    defaultCode={`
      function IconButtonFlyoutExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const handleSelect = ({item}) => {
          setSelected(item);
        };

        return (
          <Box display="flex" justifyContent="center">
            <IconButton
              accessibilityHaspopup
              accessibilityExpanded={open}
              accessibilityLabel="More Options"
              selected={open}
              icon="add"
              onClick={() => { setOpen(!open) } }
              ref={anchorRef}
            />
            {open && (
              <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 1', 'label': 'Item 1', 'subtext': 'Created Dec. 2020'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  option={{'value': 'item 2', 'label': 'Item 2 with a really long, detailed, complex name'}}
                />
                <Dropdown.Item
                  isExternal
                  url="https://pinterest.com"
                  option={{'value': 'item 3', 'label': 'Item 3 with a really long, detailed, complex name', 'subtext': 'Extra subtext details'}}
                />
                <Dropdown.Item
                  handleSelect={handleSelect}
                  selected={selected}
                  badgeText="New"
                  option={{'value': 'item 4', 'label': 'Item 4', 'subtext': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}}
                />
                <Dropdown.Item
                  isExternal
                  badgeText="New"
                  option={{'value': 'item 5', 'label': 'Item 5 with a really long name is a new item!'}}
                  url="https://pinterest.com"
                />
              </Dropdown>
            )}
          </Box>
        );
      }`}
  />
);

card(
  <Example
    id="withCustomItemContent"
    name="With Custom Item Content"
    description={`
      If needed, users can supply custom content to each Dropdown Item. This can be useful when extra functionality is needed beyond a basic Link, such as supporting React Router. However, please use with caution and only when absolutely necessary.

      To ensure the entire width of the item is clickable, you will likely need to surround you custom content with a full-width Box.
    `}
    defaultCode={`
      function IconButtonFlyoutExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const handleSelect = ({item}) => {
          setSelected(item);
        };

        return (
          <Box display="flex" justifyContent="center">
            <IconButton
              accessibilityHaspopup
              accessibilityExpanded={open}
              accessibilityLabel="More Options"
              selected={open}
              icon="add"
              onClick={() => { setOpen(!open) } }
              ref={anchorRef}
            />
            {open && (
              <Dropdown
                anchor={anchorRef.current}
                onDismiss={() => {setOpen(false)}}
              >
                <Dropdown.Item
                  isExternal
                  option={{ value: 'item 1', label: 'Custom link 1' }}
                  handleSelect={handleSelect}
                  selected={selected}
                >
                  <Box width={"100%"}>
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
                  option={{ value: 'item 2', label: 'Another custom link' }}
                  handleSelect={handleSelect}
                  selected={selected}
                >
                  <Box width={"100%"}>
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
      }`}
  />
);

export default cards;
