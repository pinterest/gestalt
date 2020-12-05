// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Dropdown"
    description="When triggered, a dropdown presents a list of options for users to choose from"
  />
);

card(
  <Example
    id="default"
    name="Default"
    defaultCode={`
function IconButtonDropdownExample() {
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
        accessibilityLabel="More Options"
        selected={open}
        icon="add"
        onClick={() => { setOpen(!open) } }
        ref={anchorRef}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 1', 'label': 'Item 1'}}/>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 2', 'label': 'Item 2 with a really really really loooooooooooooooooong name'}}/>
          <Dropdown.Item  isExternal url="https://pinterest.com" option={{'value': 'item 3', 'label': 'External Item 3 with a really really loooooooooooooooooong name'}}/>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} badgeText="New" option={{'value': 'item 4', 'label': 'Item 4'}}/>
          <Dropdown.Item isExternal badgeText="New" option={{'value': 'item 5', 'label': 'Item 5 with a really really long name'}} url="https://pinterest.com"/>
          <Dropdown.Item isExternal option={{'value': 'item 6', 'label': 'Item 6'}} url="https://pinterest.com"/>
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
                'Item 2 with a really really really loooooooooooooooooong name',
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
                'External Item 3 with a really really loooooooooooooooooong name',
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
              label: 'Item 5 with a really really long name',
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
          headerContent={<Text align="left" size="sm">This Pin was inspired by your <Text weight="bold" size="sm"><Link href="https://pinterest.com">recent activity</Link></Text></Text>}
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
        accessibilityLabel="More Options"
        selected={open}
        icon="add"
        onClick={() => { setOpen(!open) } }
        ref={anchorRef}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 1', 'label': 'Item 1', 'subtext': 'Created Dec. 2020'}}/>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 2', 'label': 'Item 2 with a really really really loooooooooooooooooong name'}}/>
          <Dropdown.Item  isExternal url="https://pinterest.com" option={{'value': 'item 3', 'label': 'external Item 3 with a really really loooooooooooooooooong name', 'subtext': 'Extra subtext details'}}/>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} badgeText="New" option={{'value': 'item 4', 'label': 'Item 4'}}/>
          <Dropdown.Item isExternal badgeText="New" option={{'value': 'item 5', 'label': 'Item 5 with a really really long name'}} url="https://pinterest.com"/>
        </Dropdown>
      )}
    </Box>
  );
}`}
  />
);

card(
  <Example
    id="withCustomItems"
    name="With Custom Items"
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
        accessibilityLabel="More Options"
        selected={open}
        icon="add"
        onClick={() => { setOpen(!open) } }
        ref={anchorRef}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
          <Dropdown.Item isExternal option={{ value: 'item 1', label: 'Hide Pin' }} handleSelect={handleSelect} selected={selected}>
            <Text>
              <Link inline href="https://pinterest.com" target="blank">Go here</Link>
            </Text>
          </Dropdown.Item>
          <Dropdown.Item option={{ value: 'item 2', label: 'Report Pin' }} handleSelect={handleSelect} selected={selected}>
            <Text>
              <Link inline href="https://google.com" target="blank">Or go there</Link>
            </Text>
          </Dropdown.Item>
        </Dropdown>
      )}
    </Box>
  );
}`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        description:
          'String that clients such as VoiceOver will read to describe the element.',
      },
    ]}
  />
);

export default cards;
