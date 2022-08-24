// @flow strict
import { type Node } from 'react';
import Page from '../docs-components/Page.js';
import PageHeader from '../docs-components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="Dropdown POC">
      <PageHeader
        name="Dropdown"
        description="MaxHeight test"
        badge="pilot"
        defaultCode={`
      function IntroMenuButtonDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [openShort, setOpenShort] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const anchorShortRef = React.useRef(null);
        const onSelect = ({ item }) => setSelected(item);

        const fullData = new Array(100).fill(undefined).map((_, index) => ({ value: "item " + index, label: "Item " + index }));
        const shortData = new Array(15).fill(undefined).map((_, index) => ({ value: "item " + index, label: "Item " + index }));

        const fullDropdownItems = fullData.map((item) => (
          <Dropdown.Item
            key={item.value}
            onSelect={onSelect}
            option={item}
            selected={selected}
          />
        ))

        const shortDataDropdownItems = shortData.map((item) => (
          <Dropdown.Item
            key={item.value}
            onSelect={onSelect}
            option={item}
            selected={selected}
          />
        ))

        return (
          <Flex justifyContent="center" gap={4}>
            <Button
              accessibilityControls="demo-dropdown-example"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              selected={open}
              size="lg"
              text="MaxSizing Menu"
            />
            {open && (
              <Dropdown anchor={anchorRef.current} id="demo-dropdown-example" onDismiss={() => setOpen(false)} idealDirection="top">
               {fullDropdownItems}
              </Dropdown>
            )}

            <Button
              accessibilityControls="demo-dropdown-example-short"
              accessibilityExpanded={openShort}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpenShort((prevVal) => !prevVal)}
              ref={anchorShortRef}
              selected={openShort}
              size="lg"
              text="Short Menu"
            />
            {openShort && (
              <Dropdown anchor={anchorShortRef.current} id="demo-dropdown-short-example" onDismiss={() => setOpenShort(false)}>
               {shortDataDropdownItems}
              </Dropdown>
            )}
          </Flex>
        );
      }`}
      />
    </Page>
  );
}
