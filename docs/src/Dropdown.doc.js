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
        bgColor="darkGray"
        icon="add"
        onClick={() => { setOpen(!open) } }
        ref={anchorRef}
      />
      {open && (
        <Dropdown anchor={anchorRef.current}>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 1', 'label': 'Item 1'}}/>
          <Dropdown.Item handleSelect={handleSelect} selected={selected} option={{'value': 'item 2', 'label': 'Item 2 with a really really really loooooooooooooooooong name'}}/>
          <Dropdown.Item handleSelect={handleSelect}  isExternal url="www.google.com" option={{'value': 'item 3', 'label': 'external Item 3 with a really really loooooooooooooooooong name'}}/>
          <Dropdown.Item badgeText="New" option={{'value': 'item 4', 'label': 'Item 4'}}/>
          <Dropdown.Item isExternal badgeText="New" option={{'value': 'item 5', 'label': 'Item 5 with a really really long name'}}/>
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
            url="www.google.com"
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
    id="short"
    name="Short"
    defaultCode={`
function IconButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  return (
    <Box display="flex" justifyContent="center">
    <Button accessibilityHaspopup ref={anchorRef} iconEnd="arrow-down" text="Menu" inline onClick={() => { setOpen(!open) } } />
      {open &&(
        <Dropdown anchor={anchorRef.current}>
          <Dropdown.Item index={0} option={{'value': 'item 1', 'label': 'Overview'}}/>
          <Dropdown.Item index={1} option={{'value': 'item 2', 'label': 'Item 2'}}/>

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
