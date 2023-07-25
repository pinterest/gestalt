// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DensityProvider,
  Dropdown,
  FixedZIndex,
  Flex,
  Module,
  SegmentedControl,
  Tag,
  TagData,
  Text,
  TextField,
} from 'gestalt';

export default function Example(): Node {
  const SegmentedControlItems = ['News', 'You', 'Messages'];
  const sizes = ['sm', 'md', 'lg'];

  const [selectedIndex, setSelectedIndex] = useState(1);
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const anchorRef = useRef(null);

  const onSelect = ({ item }) => setSelected(item);

  // eslint-disable-next-line react/no-unstable-nested-components
  function Section({ children, title }: {| children: Node, title?: string |}) {
    return (
      <Box marginTop={2} marginBottom={2}>
        <Box marginTop={2} marginBottom={2}>
          <Text weight="bold" size="200">
            {title}
          </Text>
        </Box>
        {children}
      </Box>
    );
  }

  return (
    <Box display="flex" direction="column" padding={10} height="100%" width="80%" overflow="scroll">
      <Text weight="bold" size="500">
        Gestalt Density Provider
      </Text>
      <Box marginTop={2} />
      <SegmentedControl
        items={sizes}
        selectedItemIndex={selectedIndex}
        onChange={({ activeIndex }) => {
          setSelectedIndex(activeIndex);
        }}
      />

      <Box marginTop={2} marginBottom={2} />

      <DensityProvider size={sizes[selectedIndex]}>
        <Section title="Button">
          <Button text="Submit" size="sm" />
        </Section>

        <Section title="TextField">
          <TextField id="example" onChange={() => {}} placeholder="First name" />
        </Section>

        <Section title="Segmented Control">
          <SegmentedControl items={SegmentedControlItems} />
        </Section>

        <Section title="Tag">
          <Flex gap={2}>
            <Tag text="Hello Ravi" />
            <Tag text="Hello Hector" />
            <Tag text="Hello PJ" />
          </Flex>
        </Section>

        <Section title="TagData">
          <Flex gap={2}>
            <TagData text="Hello Ravi" onRemove={() => {}} />
            <TagData text="Hello Hector" onRemove={() => {}} />
            <TagData text="Hello PJ" onRemove={() => {}} />
          </Flex>
        </Section>

        <Section title="Module">
          <Flex direction="column" gap={2}>
            <Module
              icon="lock"
              iconAccessibilityLabel="Module Locked - check permission settings"
              id="ModuleExample - header"
              title="Title"
            >
              <Text size="200">This is example content.</Text>
            </Module>
            <Module.Expandable
              accessibilityExpandLabel="Expand the module"
              accessibilityCollapseLabel="Collapse the module"
              id="ModuleExample - header expandable"
              items={[
                {
                  children: <Text size="200">Content here</Text>,
                  summary: ['summary'],
                  title: 'Title',
                },
              ]}
            />
          </Flex>
        </Section>

        <Section title="dropdown">
          <Fragment>
            <Box display="flex" justifyContent="center" width="100%" margin={2}>
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
            </Box>
            {open && (
              <Dropdown
                anchor={anchorRef.current}
                id="demo-dropdown-example"
                onDismiss={() => setOpen(false)}
                zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
              >
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: 'Download image', label: 'Download image' }}
                  selected={selected}
                />
                <Dropdown.Item
                  badge={{ text: 'New' }}
                  onSelect={onSelect}
                  option={{ value: 'Hide Pin', label: 'Hide Pin' }}
                  selected={selected}
                />
                <Dropdown.Link
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: 'Report Pin', label: 'Report Pin' }}
                  onClick={({ event }) => event.preventDefault()}
                />
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: 'Delete Pin', label: 'Delete Pin' }}
                  selected={selected}
                />
              </Dropdown>
            )}
          </Fragment>
        </Section>
      </DensityProvider>
    </Box>
  );
}
